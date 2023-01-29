import { ApplyOptions } from '@sapphire/decorators';
import { ChatInputCommand, Command } from '@sapphire/framework';
import { ApplicationCommandType, Guild, GuildMember } from 'discord.js';
import { v4 as uuidv4 } from 'uuid';

@ApplyOptions<Command.Options>({
	preconditions: ["developerOnly", "blacklistCheck"]
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
      },
    )
  registry.registerChatInputCommand((builder) =>
      builder.setName("premium")
      .setDescription("Set premium status for a guild, or user. (Bot developer only)")
      .addStringOption((option) =>
          option.setName("guild")
          .setDescription("The guild you want to give premium to.")
      )
      .addUserOption((option) =>
          option.setName("user")
          .setDescription("The user you want to give premium to.")
      ),
      { guildIds: ["1063684563588632577"] }
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    try {
      const getGuild = interaction.options.getString("guild", false);
      const getUser = interaction.options.getUser("user", false);

      if(getGuild) {
        const guild = (await this.container.client.guilds.fetch(getGuild)).id;
        if(!await this.container.settings.findGuild(guild as unknown as Guild)) return;

        return this.container.prisma.guild.update({
          where: {
            id: guild as string
          },
          data: {
            blacklisted: true
          }
        });
      }

      if(getUser) {
        const user = (await this.container.client.users.fetch(getUser)).id;
        if(!await this.container.settings.findUser(user as unknown as GuildMember)) return;

        return this.container.prisma.guild.update({
          where: {
            id: user as string
          },
          data: {
            blacklisted: true
          }
        });
      }

      return interaction.reply("testing");
    } catch(err) {
      this.container.log("error", "commands.dev.premium", `Something went wrong with command: premium.\n${err.stack}`, 
      { timestamp: true, client: this.container.client })
    }
  }
}