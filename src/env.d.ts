declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENVIRONMENT: string;
      TOKEN: string;
      BOT_OWNER: string;
      DEVELOPERS: string;
      DEBUG: string;
      DATABASE_URL: string;
      MONGO_URL: string;
      REDIS_IP: string;
      WEBHOOK_TOKEN: string;
      WEBHOOK_BLACKLIST_TOKEN: string;
      WEBHOOK_GUILD_TOKEN: string;
      WEBHOOK_ANTICHEAT_TOKEN: string;
    }
  }
}

export {}
