import { ItemsInterface } from "#types/economy.type";
import { prisma } from "../../index";
import { GuildMember } from "discord.js";
import fs from "fs";
import path from "path";

let items: ItemsInterface;

const isWin = process.platform === "win32";

let dir = `${__dirname + "../../../data.items.json"}`;

export function getItems() {
    if (!items) {
        return JSON.parse(fs.readFileSync(isWin ? dir : `${path.join(__dirname, "../../data/items.json")}`, "utf-8"));
    }

    return items;
}

export async function syncItems(): Promise<any> {
    await prisma.item.deleteMany({});
    return await prisma.item.createMany({
        data: getItems(),
        skipDuplicates: true
    });
}

// export async function addItemToInventory(member: GuildMember, itemId: string, amount?: number) {
//     await findUser(member);

//     return await prisma.inventory.update({
//         where: {
//             userId: member.id
//         },
//         data: {
//             items: {
//                 connect: [
//                     {
//                         id: itemId
//                     }
//                 ]
//             }
//         },
//         // select: {
//         //     userId: true,
//         //     items: true
//         // }
//     })
// }