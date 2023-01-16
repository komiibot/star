import { commandModule, CommandType } from "@sern/handler";
import { publish } from "../../plugins/publish";
import { prisma } from "../../index";

export default commandModule({
    type: CommandType.Both,
    plugins: [publish()],
    description: "Bet some cash, or items against the bot, or a real player in some RPS.",
    alias : [],
    execute: async (ctx, args) => {
        const economy = await prisma.economy.findFirst({
            where: {
                userId: ctx?.message.author.id,
            },
        });

        if(!economy) return ctx.reply("I was unable to find that user.");

        await ctx.reply({ content: `Cash: ${economy.cash}\nBank: ${economy.bank}\nNetworth: ${economy.networth}` });
    },
});