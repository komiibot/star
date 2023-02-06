import { Events, Listener } from "@sapphire/framework";
import { ChannelType, Message } from "discord.js";
import { prisma } from "../index";
import { findGuild, findUser, getSettings } from "../modules";
import * as leveling from "../modules/economy/leveling";
import * as inventory from "../modules/economy/inventory";
import { CustomEmbed } from "#utils/embed";
import { sendCaptcha } from "#utils/captcha";

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

    const g = await this.container.prisma.guild.findFirst({
      where: {
        id: msg?.guild.id,
      },
    });

    if (g && g.blacklisted === true) {
      await this.container.log(
        "info",
        "Events.GuildCreate",
        `[BLACKLISTED] Left guild ${msg.guild.name} with ID: ${msg.guild.id}. Owner: ${(await msg.guild.fetchOwner()).user.tag} ID: ${(await msg.guild.fetchOwner()).user.id}`
      );
      (await this.container.client.users.fetch(msg.guild.ownerId)).send(
        "Your guild has been blacklisted from Komi. If you think you have been wrongfully blacklisted, please join our support server: https://discord.gg/komibot"
      );
      setTimeout(() => msg.guild.leave(), 500);
    }

    if (settings.leveling === true) {
      return await leveling.levelHandler(msg, levels, user);
    }
  }
}
