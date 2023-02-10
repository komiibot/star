import { Games } from "@prisma/client";
import { GuildMember } from "discord.js";
import { prisma } from "../index";

export async function createGame(user: string, name: string, won: boolean, bet?: number, earned?: number, xp?: number): Promise<Games> {
    const game = await fetchGame(user, name);
    if(!game) return await prisma.games.create({
        data: {
            userId: user,
            name: name,
            won: won,
            bet: bet,
            earned: earned,
            xp: xp
        }
    });
}

export async function fetchGame(id: string, name: string): Promise<Games> {
    return await prisma.games.findFirstOrThrow({
        where: {
            userId: id,
            name: name
        }
    });
}