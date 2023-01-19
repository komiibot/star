import { ChatInputCommand, Command } from '@sapphire/framework';
import { isMessageInstance } from '@sapphire/discord.js-utilities';
import { Message, EmbedBuilder, ApplicationCommandManager, ActionRowBuilder, Events, StringSelectMenuBuilder, ActionRow } from 'discord.js';

export class HelpCommand extends Command {
    public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('help')
            .setDescription('Generate a list of commands')
            .addStringOption((option) =>
                option.setName("command")
                .setDescription("The command that you want to see more info on.")
            )
            .addStringOption((option) =>
                option.setName("module")
                .setDescription("The moudle that you want to see more info on.")
                // .setAutocomplete(true)
                .setChoices(...[
                    { name: "ping", value: "ping" }
                ])
            )
        );
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        let categories = this.container.stores.get("commands").categories;
        let str = '**Modules**\n';
        categories.reverse().map(c => str += `\`${c}\`, `);
        str = str.substring(0, str.length - 2);
        let embed = new EmbedBuilder()
            .setTitle('Help')
            .setDescription(str)
            .setTimestamp()
            .setColor('#89CFF0')
            .setFooter({
                text: 'test',
                iconURL: interaction.user.avatarURL()
        });

        // Get more info on a command or module
        const getCommand = interaction.options.getString("command", false);
        const getModule = interaction.options.getString("module", false);

        if(getCommand) {
            console.log(getCommand);
        }

        // Row Builder
        let options = [];
        for (var i = 0; i < categories.length; i++) {
            options.push({
                label: categories[i].charAt(0).toUpperCase() + categories[i].slice(1),
                value: categories[i]
            })
        }

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .addOptions(options)

        const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu)

        await interaction.reply({ embeds: [embed], components: [row] });
    }
}