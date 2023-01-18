import { commandModule, CommandType } from '@sern/handler';
import { publish } from '../../plugins/publish'
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { prisma } from '../../index';

export default commandModule({
	type: CommandType.Both,
	plugins: [publish()],
	description: 'blacklist a user from using the bot.',
	alias : [],
    options: [
        {
            name: 'add',
            description: 'Add a user to the blacklist',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'The user',
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
            ]
        },
        {
            name: 'remove',
            description: 'Remove a user from the blacklist',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'The user to remove from the blacklist',
                    type: ApplicationCommandOptionType.User,
                    required: true,
                }
            ]
        }
    ],
	execute: async (ctx, args) => {
        if (!['434008547139911681', '583925649807245322', '199801459469058048', '1048860807842234469'].includes(ctx.user.id)) {
            return ctx.reply('You are not a developer of this bot.')
        }

        let subcom
        let user 
        if (args[0] === 'text') {
            subcom = args[1][0]
            user = await ctx.message.mentions.members.first()
        } else {
            subcom = args[1].getSubcommand()
            user = args[1].getUser('user')
        }

        if (subcom === 'add') {

            // Add more if else statements for the if user is already blacklisted n shit
            await prisma.users.update({
                where: {
                    id: user.id
                },
                data: {
                    blacklisted: true
                }
            })
        } else if (subcom === 'remove') {

            // read line 56 lol
            await prisma.users.update({
                where: {
                    id: user.id
                },
                data: {
                    blacklisted: false
                }
            })
        }
    },
});