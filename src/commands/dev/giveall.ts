import { ApplyOptions } from '@sapphire/decorators';
import { ChatInputCommand, Command } from '@sapphire/framework';
import { ApplicationCommandType, EmbedBuilder, Guild, GuildMember } from 'discord.js';

@ApplyOptions<Command.Options>({
  preconditions: ["developerOnly"]
})

export class BlacklistCommand extends Command {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName("giveall")
        .setDescription("Give all users an item or crate. (Bot developer only)")
        .addStringOption((option) =>
          option.setName("item")
            .setDescription("The item that you want to give to all users.")
        )
        .addStringOption((option) =>
          option.setName("crate")
            .setDescription("The crate that you want to give to all users.")
            .setChoices(
                { name: "bronze crate", value: "bronze_crate" },
                { name: "diamond crate", value: "diamond_crate" },
                { name: "amethyst crate", value: "amethyst_crate" },
                { name: "emerald crate", value: "emerald_crate" },
                { name: "ruby crate", value: "ruby_crate" },
                { name: "booster crate", value: "booster_crate" },
                { name: "premium crate", value: "premium_crate" },
                { name: "sapphire crate", value: "sapphire_crate" }
            )
        ),
      { guildIds: ["1063684563588632577"] }
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const webhook = this.container.client.fetchWebhook("1067885342662869032", process.env.BLACKLIST_WEBHOOK_TOKEN as string);

    try {
      const getGuild = interaction.options.getString("guild", false);
      const getUser = interaction.options.getUser("user", false);

      if (getGuild) {
        const guild = (await this.container.client.guilds.fetch(getGuild).catch(() => null))
        if(!guild) return interaction.reply({ content: "Unknown guild", ephemeral: true })
        if (!await this.container.settings.findGuild(guild as unknown as Guild)) return;

        if(guild.id === this.container.utils.GUILD_ID) return interaction.reply({ content: "You can't blacklist that guild.", ephemeral: true })

        const embed = new EmbedBuilder()
        .setTitle('Komi Blacklist')
        .setDescription(`Guild: ${guild.name} has been blacklisted from Komi.`)
        .setImage("https://media.tenor.com/Gh9SFp64h8wAAAAC/banned-and-you-are-banned.gif")
        .setTimestamp()
        .setColor('#d9576c')
        .setFooter({ text: guild.id });

        (await webhook).send({ embeds: [embed] });

        interaction.reply({ content: "Successfully blacklisted guild.", ephemeral: true });

        return this.container.prisma.guild.update({
          where: {
            id: guild.id as string
          },
          data: {
            blacklisted: true
          }
        }).catch(() => null);
      }

      if (getUser) {
        const user = (await this.container.client.users.fetch(getUser));
        if (!user) await this.container.settings.findUser(user as unknown as GuildMember);

        if(process.env.DEVELOPERS.split(", ").includes(user.id) || user.id === this.container.client.user.id) return interaction.reply({ content: "You can't blacklist that user.", ephemeral: true })
        
        const embed = new EmbedBuilder()
        .setTitle('Komi Blacklist')
        .setDescription(`User: ${user.tag} has been blacklisted from Komi.`)
        .setImage("https://media.tenor.com/Gh9SFp64h8wAAAAC/banned-and-you-are-banned.gif")
        .setTimestamp()
        .setColor('#d9576c')
        .setFooter({ text: user.id });

        (await webhook).send({ embeds: [embed] });

        interaction.reply({ content: "Successfully blacklisted user.", ephemeral: true });

        return this.container.prisma.guild.update({
          where: {
            id: user.id as string
          },
          data: {
            blacklisted: true
          }
        }).catch(() => null);
      }
    } catch (err) {
      this.container.log("error", "commands.dev.giveAll", `Something went wrong with command: giveAll.\n${err.stack}`,
        { timestamp: true, client: this.container.client })
    }
  }
}