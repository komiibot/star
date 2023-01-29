import { CustomEmbed } from "#utils/embed";
import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener, ListenerOptions } from "@sapphire/framework";
import { BaseInteraction, ChannelType, GuildMember, Interaction, Message, MessageComponent, MessageComponentInteraction } from "discord.js";

@ApplyOptions<ListenerOptions>({ event: Events.InteractionCreate })
export default class InteractionListener extends Listener<typeof Events.InteractionCreate>
{
    public async run(interaction: Interaction)
    {
        await this.container.settings.findUser(interaction.member!);
        await this.container.settings.findGuild(interaction.guild!);
        await this.container.settings.getSettings(interaction.guild!);

        if (interaction.isStringSelectMenu() && interaction.customId === 'select')
        {
            const text = "Use /help <command> to get more detail on a command."
            switch(interaction.values[0]) {
                case "general": {
                    const commands = this.container.stores.get("commands").filter(c => c.category === "general").map(c => `\`${c.name}\` `);
                    await interaction.update({ embeds: [new CustomEmbed().setDescription(`${commands.join(" ")}`).setFooter({ text: text })] });
                    break;
                }
                case "economy": {
                    const commands = this.container.stores.get("commands").filter(c => c.category === "economy").map(c => `\`${c.name}\``);
                    await interaction.update({ embeds: [new CustomEmbed().setDescription(`${commands.join(" ")}`).setFooter({ text: text })] });
                    break;
                }
            }
        }
    }
}