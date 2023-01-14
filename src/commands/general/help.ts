import { commandModule, CommandType } from '@sern/handler';
import { publish } from '../../plugins/publish'
import { EmbedBuilder } from 'discord.js';
import { useContainer } from '../..';
import { ok } from 'assert';


export default commandModule({
	type: CommandType.Both,
	plugins: [publish()],
	description: 'Shows you this menu.',
	alias : [],
	execute: async (ctx) => {
        const [commands] = useContainer('@sern/store')

        const embed = new EmbedBuilder()
            .setTitle('Help Menu')
            // TODO: create a function to get current guild prefix.
            .setDescription(`Here are all the commands you can use, prefix is ?`)
            .setColor('Random')
            .setTimestamp()
            .setFooter({ text: ctx.user.username, iconURL: ctx.user.avatarURL() || undefined })
            
        for(const [name, command] of commands.BothCommands) {
            ok(CommandType.Both === command.type, 'Error: Found invalid command');

            let desc = command.description ?? 'No description';
            let nameTitle = name ?? 'No name';

            const options = command.options ?? [];
            if (options.length > 0) {
                for (const option of options) {
                    nameTitle += ` [${option.name}]`;
                }
            } 

            const alias = command.alias?.join(', ') ?? []; 
            if (alias.length > 0) desc += `\nAliases: ${alias}`;

            embed.addFields({ name: nameTitle, value: desc})
        }

        ctx.channel!.send({ embeds: [embed]})
    },
});