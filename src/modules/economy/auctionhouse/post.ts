import { Command } from "@sapphire/framework";
import { TextChannel } from "discord.js";

export async function postToChannel(interaction: Command.ChatInputCommandInteraction, channel: TextChannel, time: number, emoji: string, itemName: string, amount: number, price: number) {
    const hook = await channel.send({
        embeds: [
          new this.container.utils.CustomEmbed()
            .setFooter({ text: "Auction House" })
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(`Item listed since: <t:${time}:R>\n\n**${amount}** ${emoji}${itemName}${amount > 1 ? "s" : ""} for **$${this.container.utils.taxItem(price, 4)}**`)
            .setColor("Random"),
        ],
      });
  
      return interaction.editReply({
        embeds: [
          new this.container.utils.CustomEmbed()
            .setDescription(`Successfully listed your [auction](https://discord.com/channels/1063684563588632577/1070423672227115069/${hook.id}).`)
            .setColor(),
        ],
      });
}