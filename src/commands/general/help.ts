import { ChatInputCommand, Command } from '@sapphire/framework';
import { isMessageInstance } from '@sapphire/discord.js-utilities';
import { Message, EmbedBuilder, ApplicationCommandManager, ActionRowBuilder, Events, StringSelectMenuBuilder, ActionRow, ApplicationCommandType } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<Command.Options>({
	preconditions: ["blacklistCheck"]
})

export class HelpCommand extends Command {
    public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('help')
            .setDescription('Generate a list of commands')
            .addStringOption((option) =>
                option.setName("command")
                .setDescription("The command that you want to see more info on.")
                .setChoices(
                    { name: "ping", value: "ping" }
                )
            )
            .addStringOption((option) =>
                option.setName("module")
                .setDescription("The moudle that you want to see more info on.")
            )
        );
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        let categories = this.container.stores.get("commands").categories.filter(c => c !== "dev");
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
            let command = this.container.stores.get("commands").get(getCommand)
            let embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
            .setTitle(command.name)
            .setDescription(`${command.aliases.length >= 1 ? command.aliases : "There's no available aliases."}\n\nDescription: ${command.description}`)
            .setTimestamp()
            .setColor('#d9576c')
            .setFooter({
                text: 'Optional params showed in []'
            });
            console.log(command)
            return await interaction.reply({ embeds: [embed] });
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