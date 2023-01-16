import { eventModule, EventType } from "@sern/handler";
import { ChannelType, Events, Message } from "discord.js";
import { prisma } from "../index";
import { findGuild, findUser, getSettings } from "../modules";
import * as leveling from "../modules/leveling";

export default eventModule({
    type: EventType.Discord,
    plugins : [],
    name: "messageCreate",
    async execute(msg: Message): Promise<void> {
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
  });