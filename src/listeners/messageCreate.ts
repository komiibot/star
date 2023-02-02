import { Events, Listener } from "@sapphire/framework";
import { ChannelType, Message } from "discord.js";
import { prisma } from "../index";
import { findGuild, findUser, getSettings } from "../modules";
import * as leveling from "../modules/economy/leveling";
import * as inventory from "../modules/economy/inventory";
import { CustomEmbed } from "#utils/embed";

export class ReadyListener extends Listener<typeof Events.MessageCreate> {
  async run(msg: Message): Promise<void | unknown> {
    if (msg.author.bot || msg.author.id === msg.client.user!.id || msg.channel.type === ChannelType.DM) return;

    await findUser(msg.member!);
    await findGuild(msg.guild!);
    await getSettings(msg.guild!);

    const settings = await prisma.settings.findFirst({
      where: {
        guildId: msg?.guild.id,
      },
    });

    const levels = await prisma.leveling.findFirst({
      where: {
        userId: msg?.author.id,
      },
    });

    const user = await prisma.users.findFirst({
      where: {
        id: msg?.author.id,
      },
    });

    if (settings.leveling === true) {
      return await leveling.levelHandler(msg, levels, user);
    }
  }
}
