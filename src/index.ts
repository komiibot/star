import { container, SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";
import Logger from "#utils/logger";
import * as utils from "#utils/index";
import { settings } from "./modules/index"
import { leveling } from "./modules/index";
import * as modules from "./modules/index";
import dotenv from "dotenv";
import { bree } from "./cron";
import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";
dotenv.config();

export const prisma = new PrismaClient();
export const redis = createClient();
export const logger = new Logger();

container.prisma = prisma;
container.redis = redis;
container.log = logger;
container.utils = utils;
container.modules = modules;
container.settings = settings;
container.leveling = leveling;
container.economy = prisma.economy;
container.cron = bree;

declare module "@sapphire/pieces" {
  interface Container {
    prisma: typeof prisma;
    redis: typeof redis;
    log: typeof logger;
    cron: typeof bree;
    utils: typeof utils;
    modules: typeof modules;
    settings: typeof settings;
    leveling: typeof leveling;
    economy: typeof prisma.economy;
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    developerOnly: never;
    blacklistCheck: never;
  }
}

export const sentryClient = Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    new RewriteFrames({
      root: global.__dirname,
    }),
  ],
});

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  loadMessageCommandListeners: true,
  defaultPrefix: ["k?", "k", "?"],
});

process.on("unhandledRejection", (err: any) => {
  logger.error("Error", `Unhandled Rejection: ${err.stack}`);
});

process.on("uncaughtException", (err) => {
  logger.error("Error", `Unhandled Exception: ${err}`);
});

client.on("error", (err) => {
  logger.error("Error", `DiscordAPIError: ${err}`);
});

client.login(process.env.TOKEN);
