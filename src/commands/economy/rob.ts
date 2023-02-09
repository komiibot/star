import { ChatInputCommand, Command } from "@sapphire/framework";
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { ApplyOptions } from "@sapphire/decorators";
import { GuildMember } from "discord.js";
import { CustomEmbed } from "#utils/embed";
import { anticheat } from "#utils/index";

@ApplyOptions<Command.Options>({
  preconditions: ["blacklistCheck"],
})
export class RobCommand extends Command {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("rob")
        .setDescription("Rob another user of their belongings or cash!")
        .addUserOption((option) => option.setName("user").setDescription("The user you are robbing.").setRequired(true))
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply();
    const getUser = interaction?.options.getUser("user");

    try {
      const commands = await this.container.prisma.disabledCommands.findFirst({
        where: {
          guildId: interaction?.guild.id,
          name: interaction.commandName,
        },
      });

      if ((commands && commands.name === "rob" && commands.channels.length === 0) || (commands && commands.name === "rob" && commands.channels.includes(interaction.channelId))) {
        return await interaction.editReply({
          embeds: [new CustomEmbed(true, `\`${interaction.commandName}\` is disabled ${commands.channels.length > 0 ? "in this channel" : "on this server"}.`)],
        });
      }

      if(getUser.bot) {
        return interaction.editReply({
          embeds: [new CustomEmbed(true, "Bots can't be robbed.")],
        });
      }

      if(interaction.user.id === getUser.id) {
        return interaction.editReply({
          embeds: [new CustomEmbed(true, "You can't rob yourself.")],
        });
      }

      const user = await this.container.prisma.users.findFirst({
        where: {
          id: getUser.id,
        },
      });

      if (!user) {
        await this.container.settings.createUser(getUser as unknown as GuildMember);
      }

      // await anticheat.run(interaction);

      return interaction.editReply("Bing bong")
    } catch (e) {}
  }
}
