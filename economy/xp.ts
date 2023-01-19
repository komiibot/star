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

        let LevelUpXp = 0;
        for (var i = 2; i < levels.level + 2; i++) {
            console.log(`${i} hello`)
            LevelUpXp += GetGlobalXP(i);
        }

        let XpLeftLevelUp = LevelUpXp - levels.currentXp;
        let XpNeededLevelUp = GetGlobalXP(levels.level+1);
        return ctx.reply({ content: `Level ${levels.level}\nCurrentXP: ${levels.currentXp}\nNeeded XP: ${XpNeededLevelUp - XpLeftLevelUp}/${XpNeededLevelUp}` });
    },
});