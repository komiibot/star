import { ActivityType, Client, GatewayIntentBits, ThreadChannel } from 'discord.js';
import { DefaultLogging, Dependencies, Sern, single, Singleton } from '@sern/handler'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
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
	defaultPrefix: '%', // Prefix 
	commands: 'dist/commands',
	events: 'dist/events',
	containerConfig: {
        get: useContainer
}
});


client.on('ready', async (client) => {
	console.log(`Logged in as ${client.user.tag}!`);
})

client.login(process.env.TOKEN);