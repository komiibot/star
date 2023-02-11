import { Games } from "@prisma/client";
import { prisma } from "../index";

export async function createGame(user: string, name: string, won: boolean, bet: number, earned?: number, xp?: number): Promise<Games> {
  return await prisma.games.create({
    data: {
      userId: user,
      name: name,
      won: won,
      bet: bet,
      earned: earned ? earned : 0,
      xp: xp ? xp : 0,
    },
  });
}

export async function fetchGame(userId: string, name: string, id: number): Promise<Games> {
  const get = prisma.games.findFirst({
    where: {
      id: id,
      userId: userId,
      name: name,
    },
  });
  if (!get) return null;
  return get;
}
