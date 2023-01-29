import { ItemsInterface } from "#types/economy.type";
import { prisma } from "../../index";
import { GuildMember } from "discord.js";
import fs from "fs";
import path from "path";
import { findUser } from "#modules/settings";
import { log } from "#utils/logger";

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

export async function addItemToInventory(member: GuildMember, itemId: string, amount?: number) {
    await findUser(member);

    if(getItems().filter(x => x.id === itemId).length === 0) {
        console.trace();
        return log("error", "modules.economy.inventory.addItemToInventory()", `An invalid item ${itemId} was almost given to: ${member.user.tag}`);
    }

    await prisma.inventory.create({
        data: {
            item: itemId,
            amount: amount ?? 1,
            user: {
                connect: {
                    id: member.id
                }
            }
        },
        select: {
            userId: true,
            item: true,
            amount: true,
            durability: true,
            user: true
        }
    })
}

export async function setItemAmount(member: GuildMember, itemId: string, amount: number) {
    await findUser(member);

    if(getItems().filter(x => x.id === itemId).length === 0) {
        console.trace();
        return log("error", "modules.economy.inventory.setItemAmount()", `An invalid item ${itemId} was almost given to: ${member.user.tag}`);
    }

    if(!amount || amount <= 1) {
        console.trace();
        return log("error", "modules.economy.inventory.setItemAmount()", `Invalid item amount was almost given to: ${member.user.tag}`);
    }

    await prisma.inventory.update({
        where: {
            userId_item: { userId: member.id, item: itemId }
        },
        data: {
            item: itemId,
            amount: amount ?? 1,
        }
    })
}