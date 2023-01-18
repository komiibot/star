import { prisma } from "../index";

export async function addCooldown(
    id: string,
    commandName: string,
    time: number
) {
    await prisma.cooldowns.create({
        data: {
            id,
            commandName,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + time)
        }
    })
}