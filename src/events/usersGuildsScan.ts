import { eventModule, EventType } from "@sern/handler";
import { ChannelType, Events, Message } from "discord.js";
import { prisma } from "../index";

export default eventModule({
    type: EventType.Discord,
    plugins : [],
    name: "messageCreate",
    async execute(msg: Message): Promise<void> {
        if (msg.author.bot) return;
        if (msg.channel.type === ChannelType.DM) return;  

        const guild = await prisma.guilds.findUnique({
            where: {
                id: msg.guild.id
            }
        })

        if (!guild) {
            await prisma.guilds.create({
                data: {
                    id: msg.guild.id,
                }
            })
        }

        const user = await prisma.users.findUnique({
            where: {
                id: msg.author.id
            }
        })

        if (!user) {
            await prisma.users.create({
                data: {
                    id: msg.author.id,
                }
            })
        }
    }
  });