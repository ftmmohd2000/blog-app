import Redis from "ioredis";

export const redis = new Redis(
  (process.env.REDIS_PORT as unknown) as number,
  process.env.REDIS_HOST as string
);
