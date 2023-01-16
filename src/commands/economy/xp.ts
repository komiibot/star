import { commandModule, CommandType } from "@sern/handler";
import { publish } from "../../plugins/publish";
import { GetGlobalXP } from "../../modules";
import fs from "fs";
import { prisma } from "../../index";

export default commandModule({
    type: CommandType.Both,
    plugins: [publish()],
    description: "Check your current XP.",
    alias : [],
    execute: async (ctx, args) => {        
        const levels = await prisma.leveling.findFirst({
            where: {
                userId: ctx?.message.author.id,
            },
        });
        
        let neededxp = 0;
        for (let i = 0; i < levels.level + 1; i++) {
            neededxp += GetGlobalXP(i)
        }
        let newXp = levels.currentXp - neededxp;
        return ctx.reply({ content: `Level ${levels.level}\nCurrentXP: ${levels.currentXp}\nNeeded XP: ${GetGlobalXP(levels.level+1)-newXp}/${GetGlobalXP(levels.level+1)}` });
    },
});