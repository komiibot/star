import { CustomEmbed } from "#utils/embed";
import { ApplyOptions } from "@sapphire/decorators";
import { ChatInputCommand, Command } from "@sapphire/framework";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { ApplicationCommandType, Guild, GuildMember } from "discord.js";
import { v4 as uuidv4 } from "uuid";

@ApplyOptions<Command.Options>({
  preconditions: ["developerOnly", "blacklistCheck"],
})

// TODO: add sub commands add, remove, generate (type: guild, user)
export class PremiumCommand extends Subcommand {
  public constructor(context: Subcommand.Context, options: Subcommand.Options) {
    super(context, {
      ...options,
      name: "premium",
      subcommands: [
        {
          name: "add",
          chatInputRun: "premiumAdd",
        },
        {
          name: "remove",
          chatInputRun: "premiumRemove",
        },
      ],
    });
  }

  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName("premium")
          .setDescription("Set premium status for a guild, or user. (Bot developer only)")
          .addSubcommand((command) =>
            command
              .setName("add")
              .setDescription("Give premium status to a user or guild.")
              .addUserOption((option) => option.setName("user").setDescription("The user or guild you want to give premium to.").setRequired(false))
          )
          .addSubcommand((command) =>
            command
              .setName("remove")
              .setDescription("Remove premium status from a user or guild.")
              .addUserOption((option) => option.setName("user").setDescription("The user or guild you want to remove premium from..").setRequired(false))
          ),
      {
        guildIds: ["1063684563588632577"],
      }
    );
  }

  public async premiumAdd(interaction: Command.ChatInputCommandInteraction) {
    try {
      const getUser = interaction.options.getUser("user");
      const getGuild = interaction.options.getString("guild");

      if(getUser.bot) {
        return interaction.reply({
          embeds: [new CustomEmbed().setDescription("You can't do that to bots.").setColor("Yellow")],
        });
      }

      if (getUser) {
        const user = await this.container.prisma.users.findFirst({
          where: {
            id: getUser.id
          }
        });

        if(user && user.userType === "PREMIUM") {
          return interaction.reply({
            embeds: [new CustomEmbed().setTitle("<:failed:1067965647335731290>").setDescription("User already has premium status.").setColor("Red")],
          });
        }

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
          embeds: [new CustomEmbed().setTitle("<:success:1067965647969058830>").setDescription("Premium status granted.").setColor("Green")],
        });
      }
    } catch (err) {
      this.container.log.error("commands.dev.premium", `Something went wrong with command: **premium**.\n${err.stack}`);
    }
  }

  public async premiumRemove(interaction: Command.ChatInputCommandInteraction) {
    try {
      const getUser = interaction.options.getUser("user");
      const getGuild = interaction.options.getString("guild");

      if(getUser.bot) {
        return interaction.reply({
          embeds: [new CustomEmbed().setDescription("You can't do that to bots.").setColor("Yellow")],
        });
      }

      if (getUser) {
        const user = await this.container.prisma.users.findFirst({
          where: {
            id: getUser.id
          }
        });

        if(user && user.userType === "NORMAL") {
          return interaction.reply({
            embeds: [new CustomEmbed().setTitle("<:failed:1067965647335731290>").setDescription("User doesn't have premium status.").setColor("Red")],
          });
        }

        await this.container.prisma.users
          .update({
            where: {
              id: getUser.id,
            },
            data: {
              userType: "NORMAL",
            },
          })
          .catch(() => null);

        return interaction.reply({
          embeds: [new CustomEmbed().setTitle("<:failed:1067965647335731290>").setDescription("Premium status revoked.").setColor("Red")],
        });
      }
    } catch (err) {
      this.container.log.error("commands.dev.premium", `Something went wrong with command: **premium**.\n${err.stack}`);
    }
  }
}
