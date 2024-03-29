import { ItemsInterface } from "#types/economy.type";
import { prisma } from "../../index";
import { APIInteractionGuildMember, GuildMember } from "discord.js";
import fs from "fs";
import path from "path";
import { createUser, findUser, getSettings } from "../settings";
import { logger } from "../../index";

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

export function listItems() {
  const data = getItems();

  let items = [];

  for (let item in data) {
    items.push({ name: data[item].id, value: data[item].id });
  }

  return items;
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

  if (getItems().filter((x: ItemsInterface) => x.id === itemId).length === 0) {
    console.trace();
    return logger.error("modules.economy.inventory.addItemToInventory()", `An invalid item ${itemId} was almost given to: ${member.user?.id}`);
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

export async function getItem(member: string, itemId: string) {
  if (getItems().filter((x: ItemsInterface) => x.id === itemId).length === 0) {
    return await logger.error("modules.economy.inventory.getitem()", `Item ${itemId} does not exist.`);
  }

  const items = await prisma.inventory.findMany({
    where: {
      userId: member,
    },
  });

  return items.some((x) => x.item === itemId);
}

export async function hasItem(member: string, itemId: string, amount?: number): Promise<Boolean | null> {
  if (getItems().filter((x: ItemsInterface) => x.id === itemId).length === 0) {
    await logger.error("modules.economy.inventory.hasItem()", `Item ${itemId} does not exist.`);
    return null;
  }

  const items = await prisma.inventory.findMany({
    where: {
      userId: member,
    },
  });

  if(!items) return null;

  // set item to any so we can get types from x
  if (amount !== undefined && (items as any).some((x: ItemsInterface) => x.id === itemId).amount >= amount) {
    return true;
  }
  
  // set item to any so we can get types from x
  if ((items as any).some((x: ItemsInterface) => x.id === itemId).amount > 0) {
    return true;
  }

  return false;
}

export async function setItemAmount(member: GuildMember | APIInteractionGuildMember, itemId: string, amount: number) {
  await findUser(member);

  if (getItems().filter((x: ItemsInterface) => x.id === itemId).length === 0) {
    console.trace();
    return await logger.error("modules.economy.inventory.setItemAmount()", `An invalid item ${itemId} was almost given to: ${member.user?.id}`);
  }

  if (!amount || amount <= 1) {
    console.trace();
    return await logger.error("modules.economy.inventory.setItemAmount()", `Invalid item amount was almost given to: ${member.user?.id}`);
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

export async function setItemDurability(member: GuildMember | APIInteractionGuildMember, itemId: string, durability: number) {
  if (getItems().filter((x: ItemsInterface) => x.id === itemId).length === 0) {
    return await logger.error("modules.economy.inventory.hasItem", `Item ${itemId} does not exist.`);
  }

  const items = await prisma.inventory.findMany({
    where: {
      userId: member.user.id,
    },
  });

  const has = items.some((x) => x.item === itemId);

  if (!durability || durability <= 1) {
    return await logger.error("modules.economy.inventory.setItemDurability()", `Invalid item durability almost set for ${itemId}:${member.user.id}`);
  }

  if (has) {
    const items = await prisma.inventory.update({
      where: {
        userId_item: { userId: member.user.id, item: itemId },
      },
      data: {
        durability: durability,
      },
    });
  }
}
