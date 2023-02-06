import { wrapCodeBlock } from "#utils/codeblock";
import { CustomEmbed } from "#utils/embed";
import { Events, Listener } from "@sapphire/framework";
import { Guild } from "discord.js";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(RelativeTime);
dayjs.extend(LocalizedFormat);

export class GuildListener extends Listener<typeof Events.GuildDelete> {
  public async run(guild: Guild) {
    await this.container.log(
      "info",
      "Events.GuildDelete",
      `Left guild ${guild.name} with ID: ${guild.id}. Owner: ${(await guild.fetchOwner()).user.tag} ID: ${(await guild.fetchOwner()).user.id}`
    );

    (await this.container.client.fetchWebhook("1069260276953796628", process.env.GUILD_WEBHOOK_TOKEN)).send({
      embeds: [
        new CustomEmbed()
          .setTitle("Left guild")
          .setDescription(
            wrapCodeBlock(
              `Name: ${guild.name} | ID: ${guild.id}\nMembers: ${guild.memberCount}\nCreated: ${dayjs(guild.createdTimestamp).format("LL")} (${dayjs(
                guild.createdTimestamp
              ).fromNow()})`
            )
          )
          .setFooter({ text: `Owner: ${(await guild.fetchOwner()).user.tag}`, iconURL: (await guild.fetchOwner()).avatarURL() })
          .setColor("#a8324a"),
      ],
    });
  }
}
