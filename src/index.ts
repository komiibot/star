import { container, SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";
import { log, prisma as prismaLog } from "#utils/logger";
import * as utils from "#utils/index";
import { settings } from "./modules/index"
import { leveling } from "./modules/index";
import * as modules from "./modules/index";
import dotenv from "dotenv";
import { bree } from "./cron";
import runJobs from "./cron/bree";
dotenv.config();

export const prisma = new PrismaClient();
export const redis = createClient();

container.prisma = prisma;
container.redis = redis;
container.log = log;
container.prismaLog = prismaLog;
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
    log: typeof log;
    prismaLog: typeof prismaLog;
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

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  loadMessageCommandListeners: true,
  defaultPrefix: ["k?", "k"],
});

process.on("unhandledRejection", (err: any) => {
  log("error", "Error", `Unhandled Rejection: ${err.stack}`, { timestamp: true, client: client });
});

process.on("uncaughtException", (err) => {
  log("error", "Error", `Unhandled Exception: ${err}`, { timestamp: true, client: client });
});

client.on("error", (err) => {
  log("error", "Error", `DiscordAPIError: ${err}`, { timestamp: true, client: client }); 
});

client.login(process.env.TOKEN);
