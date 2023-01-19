import { container, SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from "discord.js";
import { PrismaClient } from "@prisma/client";
import { log, prisma as prismaLog } from "#utils/logger";
import dotenv from "dotenv";
dotenv.config();

export const prisma = new PrismaClient();

container.prisma = prisma;
container.log = log;
container.prismaLog = prismaLog;

declare module '@sapphire/pieces' {
	interface Container {
		prisma: typeof prisma;
		log: typeof log;
		prismaLog: typeof prismaLog;
	}
}

const client = new SapphireClient({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

process.on("unhandledRejection", (reason, p) => {
	log("error", "Error", `Unhandled Rejection at: Promise ${p}\nReason:${reason}`);
});
  
process.on("uncaughtException", err => {
	log("error", "Error", `Unhandled Exception: ${err}`);
});

client.login(process.env.TOKEN);