import { Leveling, Users } from "@prisma/client";
import { Message } from "discord.js";
import { prisma } from "../index";
import { log } from "./index";

// const complexity = require('complexity-report');
// const complexityThreshold = 5;

const ratelimit = 60000;
const cooldown = new Map();


export function GetGlobalXP(lvl: number): number {
    return Math.trunc((lvl - 1 + 2 * 300 * Math.pow(2, (lvl - 1) / 7)) / 4);
}

export function GetGlobalPrestigeXP(lvl: number, prestige: number): number {
    return Math.trunc((lvl - 1 + 300 * Math.pow(2, (lvl - 1) / prestige)) / 4);
}

function between(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function AddXP(msg: Message, userType: string) {
    let random = between(20, 40);
    if (userType === "STAFF" || userType === "DEV") random = between(40, 180);
    return Math.trunc(random + 1 + (0.1 * msg.content.length))
}

export async function GetUserXP(user: string) {
    try {
        return await prisma.leveling.findUnique({
            where: {
                userId: user
            }
        });
    } catch (err: any) {
        return log("error", "Leveling.GetUserXP", `Something went wrong when trying to recieve user data.\n ${err.stack}`);
    }
}

export async function levelHandler(msg: Message, levels: Leveling, user: Users): Promise<void> {
    // Cooldowns
    if (!cooldown.has(msg.author.id)) {
        cooldown.set(msg.author.id, 0);
    }

    if (cooldown.has(msg.author.id)) {
        let messageCount = cooldown.get(msg.author.id);
        console.log(messageCount)
        if (messageCount >= 4) return;
        cooldown.set(msg.author.id, messageCount ? messageCount + 1 : 1);
    }

    setTimeout(() => {
        cooldown.set(msg.author.id, 0);
    }, 3000);

    // Give user XP
    if (user) {
        let currentXp = levels.currentXp;

        currentXp += AddXP(msg, user.userType)
        await prisma.leveling.update({
            where: {
                userId: msg.author.id
            },
            data: {
                currentXp: currentXp
            }
        });
    } else {
        await prisma.leveling.update({
            where: {
                userId: msg.author.id
            },
            data: {
                currentXp: AddXP(msg, user.userType)
            }
        });
    }

    let currentLevel: number;
    let LevelUpXp = 0;
    for (var i = 2; i < levels.level + 2; i++) {
        LevelUpXp += GetGlobalXP(i);
    }

    if (levels.currentXp >= LevelUpXp) {
        currentLevel = levels.level + 1;
        await prisma.leveling.update({
            where: {
                userId: msg.author.id
            },
            data: {
                level: currentLevel
            }
        });
        msg.channel.send({ content: `You just leveled up to ${currentLevel}!` });
    }

    // let currentLevel: number;
    // let LevelUpXP = GetGlobalXP(levels.level+1);
    // for (let i = 1; i < levels.level; i++) {
    //     LevelUpXP += GetGlobalXP(i);
    // }

    // if(levels.currentXp >= LevelUpXP) {
    //     currentLevel = levels.level += 1;
    //     await prisma.leveling.update({
    //         where: {
    //             userId: msg.author.id
    //         },
    //         data: {
    //             level: currentLevel
    //         }
    //     });
    //     msg.channel.send({ content: `You just leveled up to ${currentLevel}!` });
    // }

}