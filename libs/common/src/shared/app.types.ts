import { RedisClusterOptions, RedisSingleOptions } from "@nestjs-modules/ioredis";

import { AccountConfig } from "@meta-1/authub-account";

export type DatabaseConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize?: boolean;
  logging?: boolean;
};

export type RedisConfig = RedisSingleOptions | RedisClusterOptions;

export type AppConfig = {
  systemApp: string;
};

export type ServerConfig = {
  database: DatabaseConfig;
  redis: RedisConfig;
  account: AccountConfig;
  app: AppConfig;
};
