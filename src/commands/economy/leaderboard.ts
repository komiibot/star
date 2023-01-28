import { ChatInputCommand } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { Subcommand } from '@sapphire/plugin-subcommands'
import { ButtonStyle, EmbedBuilder } from 'discord.js';
import { isNullish } from '@sapphire/utilities';

@ApplyOptions<Subcommand.Options>({
  preconditions: ["blacklistCheck"]
})

export class TopCommand extends Subcommand {
  public constructor(context: Subcommand.Context, options: Subcommand.Options) {
    super(context, {
      ...options,
      name: 'leaderboard',
      subcommands: [
        {
          name: 'top',
          chatInputRun: 'getLeaderboards'
        },
        {
          name: 'level',
          chatInputRun: 'getLevels'
        }
      ]
    });
  }

  private getMedal(index: number) {
    switch (index) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `:small_blue_diamond:`;
    }
  }

  registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('leaderboard')
        .setDescription('leaderboard command') // Needed even though base command isn't displayed to end user
        .addSubcommand((command) => command
          .setName('top')
          .setDescription('Get the top leaderboard results.'))
        .addSubcommand((command) => command
          .setName('level')
          .setDescription('Get global leaderboard results by level.')
        )
    );
  }

  public async getLeaderboards(interaction: Subcommand.ChatInputCommandInteraction) {
    await interaction.deferReply();

    return interaction.reply({ content: "TODO" })
  }

  public async getLevels(interaction: Subcommand.ChatInputCommandInteraction) {
    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setTitle(`Global Level Leaderboards`)
      .setColor("#d5e4eb")

    // prisma: get all of the users that have a level under "leveling schema".
    const users = (
      await this.container.prisma.leveling.findMany({
        include: {
          user: true
        },
        where: {
          level: {
            gte: 1
          }
        },
        skip: 0,
        take: 20
      })
    ).sort((a, b) => b.level + b.prestige - (a.level - a.prestige))

    let result = users.map(async (level, index) => {
      const userId = level.userId;
      const total = level.level;
      const member = await this.container.client.users.fetch(userId);
      
      let userPosition: number | null = null;

      if(userId.toString() === interaction.user.id) {
        userPosition ??= index + 1;
      }

      return `${this.getMedal(index + 1)} \`${total.toLocaleString()}\` • ${member.username}`;
    })

    await Promise.all(result).then((value) => {
      embed.setDescription(value.join("\n"))
    })

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    return interaction.editReply({ embeds: [embed] });
  }
}