import { eventModule, EventType } from "@sern/handler";
import { prisma } from "../index";

export default eventModule({
    type: EventType.Discord,
    plugins : [],
    name: "ready",
    async execute() {
        async function check() {
            const now = new Date();
            const cooldowns = await prisma.cooldowns.findMany({
                where: {
                    expiresAt: {
                        lte: now
                    }
                }
            });
            
            for (const cooldown of cooldowns) {
                await prisma.cooldowns.delete({
                    where: {
                        id: cooldown.id
                    }
                });
            }
        }

        // Check every 5 seconds
        setInterval(check, 5000);
    }
  });