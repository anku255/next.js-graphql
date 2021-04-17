import Redis from "ioredis";
import { RedisClient } from "../@types";

let client: RedisClient = null;

export const redisConnection = () => {
  if (client?.status === 'ready') return client;

  client = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    family: 4,
    password: process.env.REDIS_PASSWORD,
    db: 0,
  } as any);

  client.on("connect", () => console.log("Redis client connected"));
  client.on("end", () => console.log("Redis client disconnected"));

  client.on("error", (err) =>
    console.error(`Something went wrong with redis: ${err}`)
  );

  return client;
};

const withRedisClient = (callback: (redisClient: RedisClient) => any) =>
  callback(redisConnection());

export const redisHelpers = {
  get: async ({ key }: { key: string }) =>
    withRedisClient(async (redisClient: RedisClient) => {
      const cache = await redisClient.get(key);
      return cache ? JSON.parse(cache) : cache;
    }),
  set: async ({ key, value }: { key: string; value: any }) =>
    withRedisClient(async (redisClient: RedisClient) => {
      return redisClient.set(key, JSON.stringify(value));
    }),
  setex: async ({
    key,
    value,
    expiry,
  }: {
    key: string;
    value: any;
    expiry: number;
  }) =>
    withRedisClient(async (redisClient: RedisClient) => {
      return redisClient.setex(key, expiry, JSON.stringify(value));
    }),
  disconnect: async () =>
    withRedisClient(async (redisClient: RedisClient) => {
      return redisClient.disconnect();
    }),
};

export async function fetchFromCacheOrDB({ key, expiry, fetchFromDB }) {
  const cache = await redisHelpers.get({ key });
  if (cache) {
    await redisHelpers.disconnect();
    return cache;
  }
  const data = await fetchFromDB();
  await redisHelpers.setex({ key, value: data, expiry });
  await redisHelpers.disconnect();
  return data;
}
