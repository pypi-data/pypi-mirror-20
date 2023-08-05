"""
The module implements the interface queue and storage over redis.
It depends on aioredis
"""

import asyncio
import time

from .core.formatter import FormattedEntity
from .storage.base import AbstractListedStorage
from .queue.base import AbstractQueue


class RedisPool(FormattedEntity):
    @property
    def pool(self):
        key_pool = self.config.get('pool', 'redis_pool')
        return self.context.app[key_pool].get()


class RedisQueue(RedisPool, AbstractQueue):
    def init(self):
        self._lock = asyncio.Lock(loop=self.loop)
        self._key = self.config.key
        return super().init()

    async def put(self, value):
        value = self.encode(value)
        async with self.pool as conn:
            return await conn.rpush(self._key, value)

    async def get(self):
        async with self._lock:
            async with self.pool as conn:
                result = await conn.blpop(self._key)
        value = self.decode(result[-1])
        return value

    async def length(self):
        async with self.pool as conn:
            return await conn.llen(self._key)

    async def list(self):
        async with self.pool as conn:
            return [
                self.decode(i)
                for i in await conn.lrange(self._key, 0, -1)]

    async def clear(self):
        async with self.pool as conn:
            return await conn.delete(self._key)


class RedisZQueue(RedisQueue):
    async def init(self):
        await super().init()
        self._timeout = self.config.timeout
        self._script = """
            local val = redis.call('zrange', KEYS[1], 0, 0)
            if val[1] then redis.call('zrem', KEYS[1], val[1]) end
            return val[1]
            """

    async def put(self, value):
        score, val = value
        val = self.encode(val)
        async with self.pool as conn:
            return await conn.zadd(self._key, score, val)

    async def get(self):
        async with self._lock:
            while True:
                async with self.pool as conn:
                    lv = await conn.eval(self._script, [self._key])
                if lv:
                    return self.decode(lv)
                await asyncio.sleep(self._timeout, loop=self.loop)

    async def length(self):
        async with self.pool as conn:
            return await conn.zcard(self._key)

    async def list(self):
        async with self.pool as conn:
            return [self.decode(i)
                    for i in await conn.zrange(self._key)]


class TimestampZQueue(RedisZQueue):
    async def init(self):
        await super().init()
        self._script = """
            local val = redis.call('ZRANGE', KEYS[1], 0, 0, 'WITHSCORES')
            if val[1] then
                if tonumber(val[2]) < tonumber(ARGV[1]) then
                    redis.call('zrem', KEYS[1], val[1])
                else
                    return nil
                end
            end
            return val[1]
            """

    async def get(self):
        async with self._lock:
            while True:
                async with self.pool as conn:
                    lv = await conn.eval(
                        self._script, [self._key], [time.time()])
                if lv:
                    return self.decode(lv)
                await asyncio.sleep(self._timeout, loop=self.loop)


class RedisStorage(RedisPool, AbstractListedStorage):
    def init(self):
        self._prefix = self.config.get('prefix')
        return super().init()

    def raw_key(self, key):
        return self._prefix + key

    async def list(self):
        async with self.pool as conn:
            l = await conn.keys(self._prefix + '*')
        p = len(self._prefix)
        return [i[p:].decode() for i in l]

    async def length(self):
        async with self.pool as conn:
            l = await conn.keys(self._prefix + '*')
        return len(l)

    async def set(self, key, value):
        raw_key = self.raw_key(key)
        is_null = value is None
        if not is_null:
            value = self.encode(value)
        async with self.pool as conn:
            if is_null:
                return await conn.delete(raw_key)
            else:
                return await conn.set(raw_key, value)

    async def get(self, key):
        raw_key = self.raw_key(key)
        async with self.pool as conn:
            value = await conn.get(raw_key)
        if value is not None:
            return self.decode(value)
