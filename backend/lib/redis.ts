import Redis from "ioredis";

export const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

export async function rateLimit(key: string, limit = 5, windowSec = 60) {
  if (!redis) return true;
  const now = Math.floor(Date.now() / 1000);
  const bucket = `rl:${key}:${Math.floor(now / windowSec)}`;
  const cnt = await redis.incr(bucket);
  if (cnt === 1) await redis.expire(bucket, windowSec);
  return cnt <= limit;
}

