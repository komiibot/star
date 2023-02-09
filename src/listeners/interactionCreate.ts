import { CustomEmbed } from "#utils/embed";
import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener, ListenerOptions } from "@sapphire/framework";
import { BaseInteraction, ChannelType, GuildMember, Interaction, Message, MessageComponent, MessageComponentInteraction } from "discord.js";

@ApplyOptions<ListenerOptions>({ event: Events.InteractionCreate })
export default class InteractionListener extends Listener<typeof Events.InteractionCreate> {
  public async run(interaction: Interaction) {
    await this.container.settings.findUser(interaction.member!);
    await this.container.settings.findGuild(interaction.guild!);
    await this.container.settings.getSettings(interaction.guild!);

    // TOOD: get this shitty thing to work
    // if (interaction.isCommand()) {
    //   const commands = await this.container.prisma.disabledCommands.findFirst({
    //     where: {
    //       guildId: interaction?.guild.id,
    //       name: interaction.commandName
    //     },
    //   });

    //   if ((commands && commands.name === interaction.commandName) || (commands && commands.name === interaction.commandName && commands.channels.includes(interaction.channelId))) {
    //     if(!interaction.replied) {
    //       await interaction.deferReply();
    //       return interaction.followUp({
    //         embeds: [new CustomEmbed(true, `\`${interaction.commandName}\` is disabled on this server. Ask a server administrator for help.`)],
    //       })
    //     }
    //     if(interaction.deferred && !interaction.replied) {
    //       return interaction.editReply({
    //         embeds: [new CustomEmbed(true, `\`${interaction.commandName}\` is disabled on this server. Ask a server administrator for help.`)],
    //       })
    //     }
    //     if(!interaction.deferred && !interaction.replied) {
    //       await interaction.deferReply();
    //       return interaction.editReply({
    //         embeds: [new CustomEmbed(true, `\`${interaction.commandName}\` is disabled on this server. Ask a server administrator for help.`)],
    //       })
    //     }
    //     return interaction.reply({
    //       embeds: [new CustomEmbed(true, `\`${interaction.commandName}\` is disabled on this server. Ask a server administrator for help.`)],
    //     })
    //   }
    // }
    
    if (interaction.isStringSelectMenu() && interaction.customId === "select" && interaction.message.interaction.user.id === interaction.user.id) {
      const text = "Use /help <command> to get more detail on a command.";
      switch (interaction.values[0]) {
        case "general": {
          const commands = this.container.stores
            .get("commands")
            .filter((c) => c.category === "general")
            .map((c) => `\`${c.name}\` `);
          await interaction.update({ embeds: [new CustomEmbed().setDescription(`${commands.join(" ")}`).setFooter({ text: text })] });
          break;
        }
        case "economy": {
          const commands = this.container.stores
            .get("commands")
            .filter((c) => c.category === "economy")
            .map((c) => `\`${c.name}\``);
          await interaction.update({ embeds: [new CustomEmbed().setDescription(`${commands.join(" ")}`).setFooter({ text: text })] });
          break;
        }
      }
    }
  }
}
