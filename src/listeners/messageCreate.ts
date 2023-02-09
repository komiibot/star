import { Events, Listener } from "@sapphire/framework";
import { ChannelType, Message, MessageFlags } from "discord.js";
import { prisma } from "../index";
import { CustomEmbed } from "#utils/embed";
import { sendCaptcha } from "#utils/captcha";

export class ReadyListener extends Listener<typeof Events.MessageCreate> {
  async run(msg: Message): Promise<void | unknown> {
    if (msg.author.bot || msg.author.id === msg.client.user!.id || msg.channel.type === ChannelType.DM) return;

    await this.container.settings.findUser(msg.member!);
    await this.container.settings.findGuild(msg.guild!);
    await this.container.settings.getSettings(msg.guild!);

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

    const requiresCaptcha = await this.container.redis.get(`${msg.member.id}:locked`);

    if(requiresCaptcha === "1") {
      await this.container.utils.sendCaptcha(msg);
    }

    if (settings.leveling === true) {
      return await this.container.leveling.levelHandler(msg, levels, user, this.container.client);
    }
  }
}
