import { commandModule, CommandType, SlashOptions } from "@sern/handler";
import { publish } from "../../plugins/publish";
import { prisma } from "../../index";
import { ApplicationCommandOptionType, User } from "discord.js";

export default commandModule({
    type: CommandType.Slash,
    plugins: [publish()],
    description: "Check your, or someone elses balance.",
    options: [
        {
			name: "user",
			type: ApplicationCommandOptionType.User,
			description: "User you want to trade with.",
			required: true,
		},
        {
			name: "cash",
			type: ApplicationCommandOptionType.Number,
			description: "The amount of cash you want to trade.",
			required: true,
		}
    ],

    async execute(ctx, [, options]) {
        const user = (options as SlashOptions).getUser("user", true) as User;
        const cash = (options as SlashOptions).getNumber("cash", true) as number;

        const economy = await prisma.economy.findFirst({
            where: {
                userId: user.id,
            },
        });

        const self = await prisma.economy.findFirst({
            where: {
                userId: ctx.message.author.id,
            },
        });

        if(!self) return;
        
        if(!economy) return ctx.reply("I was unable to find that user.");
        
        if(self.cash <= cash) console.log("Unable to do that action due to insufficient funds.");
    },
});