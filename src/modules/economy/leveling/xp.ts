import { Leveling, Users } from "@prisma/client";
import { Client, Guild, GuildMember, Interaction, Message, TextChannel, User } from "discord.js";
import { prisma } from "../../../index";
import { log } from "#utils/logger";
import LevelingType from "#types/leveling.type";

const ratelimit = 60000;
const cooldown = new Map();

export function GetGlobalXP(lvl: number): number {
  return Math.trunc((lvl - 1 + 2 * 1700 * Math.pow(2, (lvl - 1) / 8)) / 4);
}

export function GetGlobalPrestigeXP(lvl: number, prestige: number): number {
  return Math.trunc((lvl - 1 + 500 * Math.pow(2, (lvl - 1) / prestige)) / 4);
}

export async function GetUser(user: string) {
  try {
    return (await prisma.leveling.findUnique({
      where: {
        userId: user,
      },
    })) as Leveling;
  } catch (err: any) {
    return log("error", "Leveling.GetUser()", `Something went wronI'm tryingg when trying to recieve user data.\n ${err.stack}`, { timestamp: true, client: this.container.client });
  }
}

function between(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function AddXP(msg: Message, min?: number, max?: number): number {
  let random = between(10, 30);
  if (min && max) random = between(min, max);
  return Math.trunc(random + 1 + 0.1 * msg.content.length);
}

export async function GetUserXP(user: string) {
  try {
    return (await prisma.leveling.findUnique({
      where: {
        userId: user,
      },
    })) as Leveling;
  } catch (err: any) {
    return log("error", "Leveling.GetUserXP", `Something went wrong when trying to recieve user data.\n ${err.stack}`, { timestamp: true, client: this.container.client });
  }
}

// export async function GetGuildLevels(guild: Guild) {
//   try {
//     return await prisma.economyGuild.findFirst({
//       where: {
//         guildId: guild.id
//       }
//     })
//   } catch(err) {
//     return log("error", "Leveling.GetGuildLevels", `Something went wrong when trying to recieve user data.\n ${err.stack}`, { timestamp: true, client: this.container.client });
//   }
// }

export async function levelHandler(msg: Message, levels: Leveling, user: Users, client: Client, interaction?: Interaction): Promise<void> {
  // Do not gain XP on slash commands
  if(interaction && interaction.isCommand()) return;

  // Cooldowns
  if (!cooldown.has(msg.author.id)) {
    cooldown.set(msg.author.id, 0);
  }

  if (cooldown.has(msg.author.id)) {
    let messageCount = cooldown.get(msg.author.id);
    console.log(messageCount);
    if (messageCount >= 2) return;
    cooldown.set(msg.author.id, messageCount ? messageCount + 1 : 1);
  }

  setTimeout(() => {
    cooldown.set(msg.author.id, 0);
  }, ratelimit);

  // Give user XP
  if (user) {
    let currentXp = levels.currentXp;

    currentXp += AddXP(msg);
    await prisma.leveling.update({
      where: {
        userId: msg.author.id,
      },
      data: {
        currentXp: currentXp,
      },
    });
  } else {
    await prisma.leveling.update({
      where: {
        userId: msg.author.id,
      },
      data: {
        currentXp: AddXP(msg),
      },
    });
  }

  let currentLevel: number;
  let LevelUpXp = 0;
  for (let i = 2; i < levels.level + 2; i++) {
    LevelUpXp += GetGlobalXP(i);
  }

  // Level up
  if (levels.currentXp >= LevelUpXp) {
    currentLevel = levels.level + 1;
    await prisma.leveling.update({
      where: {
        userId: msg.author.id,
      },
      data: {
        level: currentLevel,
      },
    });
    // msg.channel.send({ content: `You just leveled up to ${currentLevel}!` });
  }
}
