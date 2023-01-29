import { CustomEmbed } from "#utils/embed";
import { Events, Listener } from "@sapphire/framework";
import { Guild } from "discord.js";


export class GuildListener extends Listener<typeof Events.GuildCreate> {
  public async run(guild: Guild) {
    await this.container.settings.findGuild(guild);
    await this.container.log("info", "Events.GuildCreate", `Added to new guild ${guild.name} with ID: ${guild.id}. Server owner: ${(await guild.fetchOwner()).user.tag}`);

    (await this.container.client.fetchWebhook("1069260276953796628", process.env.GUILD_WEBHOOK_TOKEN)).send({
        embeds: [new CustomEmbed()
        .setTitle("<:success:1067965647969058830> Joined guild")
        .setDescription(`Name: ${guild.name}\nID: (\`${guild.id}\`)`)
        .setFooter({ text: `Owner: ${(await guild.fetchOwner()).user.tag}` })
        .setColor()]
    })
  }
}