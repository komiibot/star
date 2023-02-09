import { ChatInputCommand, Command } from "@sapphire/framework";
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { ApplyOptions } from "@sapphire/decorators";
import { GuildMember } from "discord.js";
import { CustomEmbed } from "#utils/embed";

@ApplyOptions<Command.Options>({
  preconditions: ["blacklistCheck"],
})
export class XpCommand extends Command {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName("xp")
        .setDescription("Check how much XP you have, or another user has globally.")
        .addUserOption((option) => option.setName("user").setDescription("The user.").setRequired(false))
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply();
    const getUser = interaction?.options.getUser("user");

    try {
      const levels = await this.container.prisma.leveling.findFirst({
        where: {
          userId: getUser ? getUser.id : interaction.user.id,
        },
      });

      if (!levels) {
        await this.container.settings.createUser(getUser as unknown as GuildMember);
        return interaction.editReply({
          embeds: [new CustomEmbed(true, "I could not find that user.")],
        });
      }
      
      let LevelUpXp = 0;
      for (let i = 2; i < levels.level + 2; i++) {
        LevelUpXp += this.container.modules.leveling.GetGlobalXP(i);
      }

      let XpLeftLevelUp = LevelUpXp - levels.currentXp;
      let XpNeededLevelUp = this.container.modules.leveling.GetGlobalXP(levels.level + 1);
      const description = `Level ${levels.level}\nCurrentXP: ${levels.currentXp}\nNeeded XP: ${XpNeededLevelUp - XpLeftLevelUp}/${XpNeededLevelUp}`;

      if (getUser && getUser.bot) {
        return interaction.editReply({
          embeds: [new CustomEmbed(true, "Bots don't have XP.")],
        });
      }

      return interaction.editReply({
        embeds: [
            new CustomEmbed().setDescription(description).setColor()
        ],
      });
    } catch (e) {
        return interaction.editReply({
            embeds: [
                new CustomEmbed(true, "Something went wrong trying to run the command.")
            ],
          });
    }
  }
}
