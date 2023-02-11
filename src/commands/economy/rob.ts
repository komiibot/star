import { ChatInputCommand, Command } from "@sapphire/framework";
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { ApplyOptions } from "@sapphire/decorators";
import { GuildMember } from "discord.js";
import { CustomEmbed } from "#utils/embed";
import { anticheat, percentageChance } from "#utils/index";
import dayjs from "dayjs";
import { createGame } from "#utils/games";

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
    const getMember = await interaction.guild.members.fetch({ user: getUser }).catch(() => null);
    if (!getMember)
      return interaction.editReply({
        embeds: [new CustomEmbed(true, "I could not find that user in this server.")],
      });

    try {
      const commands = await this.container.prisma.disabledCommands.findFirst({
        where: {
          guildId: interaction?.guild.id,
          name: interaction.commandName,
        },
      });

      // if ((commands && commands.name === "rob" && commands.channels.length === 0) || (commands && commands.name === "rob" && commands.channels.includes(interaction.channelId))) {
      //   return await interaction.editReply({
      //     embeds: [new CustomEmbed(true, `\`${interaction.commandName}\` is disabled ${commands.channels.length > 0 ? "in this channel" : "on this server"}.`)],
      //   });
      // }

      if (getUser.bot) {
        return interaction.editReply({
          embeds: [new CustomEmbed(true, "Bots can't be robbed.")],
        });
      }

      if (interaction.user.id === getUser.id) {
        return interaction.editReply({
          embeds: [new CustomEmbed(true, "You can't rob yourself.")],
        });
      }

      const user = await this.container.prisma.economy.findFirst({
        where: {
          userId: getUser.id,
        },
      });

      const self = await this.container.prisma.economy.findFirst({
        where: {
          userId: interaction.user.id,
        },
      });

      if (!user) {
        return interaction.editReply("I could not find that user.");
      }

      if (!self) {
        return null;
      }

      const timeSince = interaction.user.createdTimestamp;
      const time = dayjs(Date.now()).diff(timeSince, "w");

      if (time <= 0) {
        return interaction.editReply({
          embeds: [new CustomEmbed(true, "Your account must be a week old to use this command.")],
        });
      }

      if (user.cash <= 600) {
        return interaction.editReply({
          embeds: [new CustomEmbed(true, "Unable to rob that user due to them having insufficent funds.")],
        });
      }

      if (self.cash <= 600) {
        return interaction.editReply({
          embeds: [new CustomEmbed(true, "You need at least $600 <:money:1073712865606897754>.")],
        });
      }

      let outcome: string;

      const chance = percentageChance([true, false], ["35", "45"]);

      let amount = user.cash;

      if (chance === true) {
        outcome = `You failed to rob ${getUser.username}, and now have paid the price of ${amount}`;
      }

      await createGame(interaction.user.id, "rob", chance, 0).catch(() => null);

      await anticheat.run(interaction);

      return interaction.editReply("Bing bong");
    } catch (e) {}
  }
}
