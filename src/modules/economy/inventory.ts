import { ItemsInterface } from "#types/economy.type";
import { prisma } from "../../index";
import { APIInteractionGuildMember, GuildMember } from "discord.js";
import fs from "fs";
import path from "path";
import { createUser, findUser, getSettings } from "#modules/settings";
import { log } from "#utils/logger";

let items: ItemsInterface;

const isWin = process.platform === "win32";

// why are paths so weird on windows
let dir = `${__dirname + "../../../data/items.json"}`;

export function getItems() {
  if (!items) {
    return JSON.parse(fs.readFileSync(isWin ? dir : `${path.join(__dirname, "../../data/items.json")}`, "utf-8"));
  }

  return items as ItemsInterface;
}

export async function syncItems(): Promise<any> {
  await prisma.item.deleteMany({});
  return await prisma.item.createMany({
    data: getItems(),
    skipDuplicates: true,
  });
}

export async function getInventory(member: GuildMember | APIInteractionGuildMember) {
  const user = await prisma.inventory.findMany({
    where: {
      userId: member.user.id,
    },
  });

  if (!user) await createUser(member);

  return user;
}

export async function addItemToInventory(member: GuildMember | APIInteractionGuildMember, itemId: string, amount?: number) {
  await findUser(member);

  if (getItems().filter((x) => x.id === itemId).length === 0) {
    console.trace();
    return log("error", "modules.economy.inventory.addItemToInventory()", `An invalid item ${itemId} was almost given to: ${member.user?.id}`);
  }

  await prisma.inventory.create({
    data: {
      item: itemId,
      amount: amount ?? 1,
      user: {
        connect: {
          id: member.user.id,
        },
      },
    },
    select: {
      userId: true,
      item: true,
      amount: true,
      durability: true,
      user: true,
    },
  });
}

export async function setItemAmount(member: GuildMember | APIInteractionGuildMember, itemId: string, amount: number) {
  await findUser(member);

  if (getItems().filter((x) => x.id === itemId).length === 0) {
    console.trace();
    return log("error", "modules.economy.inventory.setItemAmount()", `An invalid item ${itemId} was almost given to: ${member.user?.id}`);
  }

  if (!amount || amount <= 1) {
    console.trace();
    return log("error", "modules.economy.inventory.setItemAmount()", `Invalid item amount was almost given to: ${member.user?.id}`);
  }

  await prisma.inventory.update({
    where: {
      userId_item: { userId: member.user.id, item: itemId },
    },
    data: {
      item: itemId,
      amount: amount ?? 1,
    },
  });
}
