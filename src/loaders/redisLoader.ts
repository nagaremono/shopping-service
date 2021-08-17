import Redis from 'ioredis';
import { CONFIG } from '../config/config';

export const redisLoader = (): Redis.Redis => new Redis(CONFIG.REDIS_URL);
