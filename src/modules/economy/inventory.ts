import { ItemsInterface } from "#types/economy.type";
import { prisma } from "../../index";
import { GuildMember } from "discord.js";
import fs from "fs";
import { findUser } from "..";

let items: ItemsInterface;

export function getItems() {
    if (!items) {
        return JSON.parse(fs.readFileSync(__dirname + "../../../data/items.json", "utf-8"));
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