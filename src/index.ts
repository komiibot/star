import { Client, GatewayIntentBits, ThreadChannel } from 'discord.js';
import { DefaultLogging, Dependencies, Sern, single, Singleton } from '@sern/handler'
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

interface MyDependencies extends Dependencies {
    '@sern/client' : Singleton<Client>;
    '@sern/logger' : Singleton<DefaultLogging>
}

export const useContainer = Sern.makeDependencies<MyDependencies>({
    build: root => root
        .add({ '@sern/client': single(client)  }) 
        .add({ '@sern/logger': single(new DefaultLogging()) })
});

Sern.init({
	defaultPrefix: process.env.PREFIX as string,
	commands: 'build/commands',
	events: 'build/events',
	containerConfig: {
        get: useContainer
	}
});

client.login(process.env.TOKEN);