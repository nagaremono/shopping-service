declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_PORT: string;
    DB_HOST: string;
    REDIS_URL: string;
    SESSION_SECRET: string;
  }
}