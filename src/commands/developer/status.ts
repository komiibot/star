import { commandModule, CommandType,  } from '@sern/handler';
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { publish } from '../../plugins/publish'
import ms = require('ms'); 

export default commandModule({
	type: CommandType.Both,
	plugins: [publish()],
	description: 'get the bot status',
    alias: ['ping', 'pong', 'runningtime', 'uptime'],
	execute: async (ctx, args) => { 
        const { client } = ctx;
        const embed = new EmbedBuilder()
            .setDescription(`**Bot Status**\n\n**Ping:** ${client.ws.ping}ms\n**Uptime:** ${ms(client.uptime! || 0, { long: true })}`)
            .setColor('Random')
            .setTimestamp()
            .setFooter({ text: ctx.user.username, iconURL: ctx.user.avatarURL() || undefined})

        ctx.channel!.send({ embeds: [embed]});
    },
});