import { CustomEmbed } from "#utils/embed";
import { ApplyOptions } from "@sapphire/decorators";
import { ChatInputCommand, Command } from "@sapphire/framework";
import { ApplicationCommandType, Guild, GuildMember } from "discord.js";
import { v4 as uuidv4 } from "uuid";

@ApplyOptions<Command.Options>({
  preconditions: ["developerOnly", "blacklistCheck"],
})

// TODO: add sub commands add, remove, generate (type: guild, user)
export class PremiumCommand extends Command {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand(
      {
        name: "premium",
        description: "Set premium status for a guild, or user. (Bot developer only)",
        type: ApplicationCommandType.ChatInput,
      },
      {
        guildIds: ["1063684563588632577"],
      }
    );
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName("premium")
          .setDescription("Set premium status for a guild, or user. (Bot developer only)")
          .addUserOption((option) => option.setName("user").setDescription("The user you want to give premium to.").setRequired(true)),
      { guildIds: ["1063684563588632577"] }
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    try {
      const getUser = interaction.options.getUser("user");

      if (getUser) {
        console.log(getUser);
        await this.container.prisma.users
          .update({
            where: {
              id: getUser.id,
            },
            data: {
              userType: "PREMIUM",
            },
          })
          .catch(() => null);

        return interaction.reply({
          embeds: [new CustomEmbed().setTitle("<:success:1067965647969058830>").setDescription("Premium status granted.")],
        });
      }
    } catch (err) {
      this.container.log("error", "commands.dev.premium", `Something went wrong with command: **premium**.\n${err.stack}`, { timestamp: true, client: this.container.client });
    }
  }
}
