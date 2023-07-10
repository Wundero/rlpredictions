import { Redis } from "@upstash/redis";
import { parse, stringify } from "superjson";
import type { Cache } from "./types";

const kv = Redis.fromEnv();

export class RedisCache implements Cache {
  constructor(private redis: typeof kv) {}

  async get<T>(
    key: string,
    revive: (input: string) => T = parse<T>
  ): Promise<T | null> {
    const value = await this.redis.get<string>(key);
    if (value === null) {
      return null;
    }
    const output = revive(value);
    return output;
  }

  async set<T>(
    key: string,
    value: T,
    ttl?: number,
    serialize: (input: T) => string = stringify
  ): Promise<void> {
    const serial = serialize(value);
    if (ttl) {
      await this.redis.set(key, serial, {
        ex: ttl,
      });
    } else {
      await this.redis.set(key, serial);
    }
  }

  async cache<T>(
    key: string,
    getter: () => T | Promise<T>,
    ttl?: number,
    revive: (input: string) => T = parse<T>,
    serialize: (input: T) => string = stringify
  ): Promise<T> {
    const value = await this.get<T>(key, revive);
    if (value) {
      return value;
    }
    const output = await getter();
    await this.set(key, output, ttl, serialize);
    return output;
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async clear(): Promise<void> {
    await this.redis.flushall();
  }
}

export const cache = new RedisCache(kv);
export const redis = kv;
