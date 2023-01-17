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
        // console.log(LevelUpXp)

        let XpLeftLevelUp = LevelUpXp - levels.currentXp;
        // console.log(XpLeftLevelUp)
        let XpNeededLevelUp = GetGlobalXP(levels.level+1);
        return ctx.reply({ content: `Level ${levels.level}\nCurrentXP: ${levels.currentXp}\nNeeded XP: ${XpNeededLevelUp - XpLeftLevelUp}/${XpNeededLevelUp}` });

        // let neededXp = 0;
        // for (let i = 1; i < levels.level + 1; i++) {
        //     // console.log(i)
        //     neededXp += GetGlobalXP(i);
        //     console.log(neededXp);
        // }
        // ctx.reply({ content: `${neededXp}`});
        // let newXp = neededXp - levels.currentXp;
        // return ctx.reply({ content: `Level ${levels.level}\nCurrentXP: ${levels.currentXp}\nNeeded XP: ${GetGlobalXP(levels.level+1)-newXp}/${GetGlobalXP(levels.level+1)}` });
    },
});