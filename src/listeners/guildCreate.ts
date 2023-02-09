import { wrapCodeBlock } from "#utils/codeblock";
import { CustomEmbed } from "#utils/embed";
import { Events, Listener } from "@sapphire/framework";
import { Guild } from "discord.js";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(RelativeTime);
dayjs.extend(LocalizedFormat);

export class GuildListener extends Listener<typeof Events.GuildCreate> {
  public async run(guild: Guild) {
    await this.container.settings.findGuild(guild);

    const gld = await guild.members.fetch();
    const bots = gld.filter(m => m.user.bot).size;
    const humans = gld.filter(m => !m.user.bot).size;

    const humancount = humans - bots;

    // I don't leave the guild instantly, just incase a false positive arises
    if(bots > humancount) {
      await this.container.log(
        "info",
        "Events.GuildCreate",
        `[BOT LIST GUILD] Left guild ${guild.name} with ID: ${guild.id}. Owner: ${(await guild.fetchOwner()).user.tag} ID: ${(await guild.fetchOwner()).user.id}`
      );
      return (await this.container.client.fetchWebhook("1069260276953796628", process.env.GUILD_WEBHOOK_TOKEN)).send({
        embeds: [
          new CustomEmbed()
            .setTitle("Joined guild [BOT LIST GUILD]")
            .setDescription(
              wrapCodeBlock(
                `Name: ${guild.name} | ID: ${guild.id}\nMembers: ${humans}\nBots: ${bots}\nCreated: ${dayjs(guild.createdTimestamp).format("LL")} (${dayjs(
                  guild.createdTimestamp
                ).fromNow()})`
              )
            )
            .setFooter({ text: `Owner: ${(await guild.fetchOwner()).user.tag}`, iconURL: (await guild.fetchOwner()).displayAvatarURL() })
            .setColor(),
        ],
        // content: "<@&1063700152784793663>"
        content: "<@583925649807245322>"
      });
    }

    const g = await this.container.prisma.guild.findFirst({
      where: {
        id: guild.id,
      },
    });

    if (g && g.blacklisted === true) {
      await this.container.log(
        "info",
        "Events.GuildCreate",
        `[BLACKLISTED] Left guild ${guild.name} with ID: ${guild.id}. Owner: ${(await guild.fetchOwner()).user.tag} ID: ${(await guild.fetchOwner()).user.id}`
      );
      (await this.container.client.users.fetch(guild.ownerId)).send(
        "Your guild has been blacklisted from Komi. If you think you have been wrongfully blacklisted, please join our support server: https://discord.gg/komibot"
      ).catch(() => null);
      setTimeout(() => guild.leave(), 500);
      return (await this.container.client.fetchWebhook("1069260276953796628", process.env.GUILD_WEBHOOK_TOKEN)).send({
        embeds: [
          new CustomEmbed()
            .setTitle("Joined guild [BLACKLISTED]")
            .setDescription(
              wrapCodeBlock(
                `Name: ${guild.name} | ID: ${guild.id}\nMembers: ${guild.memberCount}\nCreated: ${dayjs(guild.createdTimestamp).format("LL")} (${dayjs(
                  guild.createdTimestamp
                ).fromNow()})`
              )
            )
            .setFooter({ text: `Owner: ${(await guild.fetchOwner()).user.tag}`, iconURL: (await guild.fetchOwner()).displayAvatarURL() })
            .setColor(),
        ],
      });
    }

    await this.container.log(
      "info",
      "Events.GuildCreate",
      `Joined guild ${guild.name} with ID: ${guild.id}. Owner: ${(await guild.fetchOwner()).user.tag} ID: ${(await guild.fetchOwner()).user.id}`
    );

    return (await this.container.client.fetchWebhook("1069260276953796628", process.env.GUILD_WEBHOOK_TOKEN)).send({
      embeds: [
        new CustomEmbed()
          .setTitle("Joined guild")
          .setDescription(
            wrapCodeBlock(
              `Name: ${guild.name} | ID: ${guild.id}\nMembers: ${guild.memberCount}\nCreated: ${dayjs(guild.createdTimestamp).format("LL")} (${dayjs(
                guild.createdTimestamp
              ).fromNow()})`
            )
          )
          .setFooter({ text: `Owner: ${(await guild.fetchOwner()).user.tag}`, iconURL: (await guild.fetchOwner()).displayAvatarURL() })
          .setColor(),
      ],
    });
  }
}
