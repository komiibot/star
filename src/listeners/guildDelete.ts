import { CustomEmbed } from "#utils/embed";
import { Events, Listener } from "@sapphire/framework";
import { Guild } from "discord.js";

export class GuildListener extends Listener<typeof Events.GuildDelete> {
  public async run(guild: Guild) {
    await this.container.log("info", "Events.GuildDelete", `Left guild ${guild.name} with ID: ${guild.id}`);

    (await this.container.client.fetchWebhook("1069260276953796628", process.env.GUILD_WEBHOOK_TOKEN)).send({
      embeds: [new CustomEmbed(true, `Name: ${guild.name}\nID: (\`${guild.id}\`)`, "Left guild")],
    });
  }
}
