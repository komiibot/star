import { container, SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";
import { log, prisma as prismaLog } from "#utils/logger";
import * as utils from "#utils/index";
import * as settings from "#modules/settings";
import * as leveling from "#modules/economy/leveling";
import * as modules from "#modules/index";
import dotenv from "dotenv";
dotenv.config();

export const prisma = new PrismaClient();
export const redis = new Redis();

container.prisma = prisma;
container.redis = redis;
container.log = log;
container.prismaLog = prismaLog;
container.utils = utils;
container.modules = modules;
container.settings = settings;
container.leveling = leveling;

declare module "@sapphire/pieces" {
  interface Container {
    prisma: typeof prisma;
    redis: typeof redis;
    log: typeof log;
    prismaLog: typeof prismaLog;
    utils: typeof utils;
    modules: typeof modules;
    settings: typeof settings;
    leveling: typeof leveling;
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    developerOnly: never;
    blacklistCheck: never;
  }
}

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  loadMessageCommandListeners: true,
  defaultPrefix: "k?",
});

process.on("unhandledRejection", (err: any) => {
  log("error", "Error", `Unhandled Rejection: ${err.stack}`, { timestamp: true, client: client });
});

process.on("uncaughtException", (err) => {
  log("error", "Error", `Unhandled Exception: ${err}`, { timestamp: true, client: client });
});

client.login(process.env.TOKEN);
