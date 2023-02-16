import { CustomEmbed } from "#utils/embed";
import { ApplyOptions } from "@sapphire/decorators";
import { ChatInputCommand, Command } from "@sapphire/framework";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { ApplicationCommandType, Guild, GuildMember } from "discord.js";
import { v4 as uuidv4 } from "uuid";

@ApplyOptions<Command.Options>({
  preconditions: ["developerOnly"],
})

// TODO: add sub commands add, remove, generate (type: guild, user)
export class PremiumCommand extends Subcommand {
  public constructor(context: Subcommand.Context, options: Subcommand.Options) {
    super(context, {
      ...options,
      name: "blacklist",
      subcommands: [
        {
          name: "add",
          chatInputRun: "blacklistAdd",
        },
        {
          name: "remove",
          chatInputRun: "blacklistRemove",
        },
      ],
    });
  }

  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName("blacklist")
          .setDescription("Add, or remove a guild from the blacklist. (Bot developer only)")
          .addSubcommand((command) =>
            command
              .setName("add")
              .setDescription("Blacklist a user or guild.")
              .addStringOption((option) => option.setName("guild").setDescription("The guild you are blacklisting.").setRequired(false))
              .addUserOption((option) => option.setName("user").setDescription("The guild you are blacklisting.").setRequired(false))
              .addStringOption((option) => option.setName("reason").setDescription("The reason you are blacklisting the guild.").setRequired(false))
          )
          .addSubcommand((command) =>
            command
              .setName("remove")
              .setDescription("Remove blacklist from a user or guild.")
              .addStringOption((option) => option.setName("guild").setDescription("The guild you removing from blacklist.").setRequired(false))
              .addUserOption((option) => option.setName("user").setDescription("The guild you removing from blacklist.").setRequired(false))
          ),
      {
        guildIds: ["1063684563588632577"],
      }
    );
  }

  public async blacklistAdd(interaction: Command.ChatInputCommandInteraction) {
    try {
      const getGuild = interaction.options.getString("guild");
      const getUser = interaction.options.getUser("user");

      if (getUser) {
        const user = await this.container.prisma.users.findFirst({
          where: {
            id: getUser.id,
          },
        });

        if (process.env.DEVELOPERS.split(", ").includes(getUser.id) || getUser.id === this.container.client.user.id) {
          return interaction.reply({
            embeds: [new CustomEmbed().setTitle("<:failed:1067965647335731290>").setDescription("That user can't be blacklisted.").setColor("Red")],
          });
        }

        if (user && user.blacklisted === true) {
          return interaction.reply({
            embeds: [new CustomEmbed().setTitle("<:failed:1067965647335731290>").setDescription("User is already blacklisted.").setColor("Red")],
          });
        }

        await this.container.prisma.users
        .update({
          where: {
            id: getUser.id,
          },
          data: {
            blacklisted: true,
          },
        })
        .catch(() => null);

        return interaction.reply({
          embeds: [new CustomEmbed().setTitle("<:success:1067965647969058830>").setDescription("User blacklisted.").setColor("Green")],
        });
      }

      if (getGuild) {
        const guild = await this.container.prisma.guild.findFirst({
          where: {
            id: getGuild,
          },
        });

        if (guild && guild.blacklisted === true) {
          return interaction.reply({
            embeds: [new CustomEmbed().setTitle("<:failed:1067965647335731290>").setDescription("Guild is already blacklisted.").setColor("Red")],
          });
        }

        if (getGuild === "1063684563588632577") {
          return interaction.reply({
            embeds: [new CustomEmbed().setTitle("<:failed:1067965647335731290>").setDescription("That guild can't be blacklisted.").setColor("Red")],
          });
        }

        await this.container.prisma.guild
          .update({
            where: {
              id: getGuild,
            },
            data: {
              blacklisted: true,
            },
          })
          .catch(() => null);

        return interaction.reply({
          embeds: [new CustomEmbed().setTitle("<:success:1067965647969058830>").setDescription("Guild blacklisted.").setColor("Green")],
        });
      }
    } catch (err) {
      this.container.log.error("commands.dev.blacklist", `Something went wrong with command: **blacklist**.\n${err.stack}`);
    }
  }

  public async blacklistRemove(interaction: Command.ChatInputCommandInteraction) {
    try {
      const getGuild = interaction.options.getString("guild");
      const getUser = interaction.options.getUser("user");

      if(getUser) {
        const user = await this.container.prisma.users.findFirst({
          where: {
            id: getUser.id,
          },
        });

        if(user && user.blacklisted === false) {
          return interaction.reply({
            embeds: [new CustomEmbed().setTitle("<:failed:1067965647335731290>").setDescription("User is not blacklisted.").setColor("Red")],
          });
        }

        await this.container.prisma.users
        .update({
          where: {
            id: getUser.id,
          },
          data: {
            blacklisted: false,
          },
        })
        .catch(() => null);

        return interaction.reply({
          embeds: [new CustomEmbed().setTitle("<:success:1067965647969058830>").setDescription("User removed from blacklist.").setColor("Green")],
        });
      }

      if (getGuild) {
        const guild = await this.container.prisma.guild.findFirst({
          where: {
            id: getGuild,
          },
        });

        if (guild && guild.blacklisted === false) {
          return interaction.reply({
            embeds: [new CustomEmbed().setTitle("<:failed:1067965647335731290>").setDescription("Guild is not blacklisted.").setColor("Red")],
          });
        }

        await this.container.prisma.guild
          .update({
            where: {
              id: getGuild,
            },
            data: {
              blacklisted: true,
            },
          })
          .catch(() => null);

        return interaction.reply({
          embeds: [new CustomEmbed().setTitle("<:success:1067965647969058830>").setDescription("Guild removed from blacklist.").setColor("Green")],
        });
      }
    } catch (err) {
      this.container.log.error("commands.dev.blacklist", `Something went wrong with command: **blacklist**.\n${err.stack}`);
    }
  }
}
