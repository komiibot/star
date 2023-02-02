import { Users } from "@prisma/client";
import { APIInteractionGuildMember, Guild, GuildMember } from "discord.js";
import { prisma } from "../index";
import { prisma as Logger } from "#utils/logger";

export async function createGuild(guild: Guild): Promise<unknown> {
  const has = await prisma.guild.findFirst({
    where: {
      id: guild.id,
    },
  });

  if (has) return;

  Logger("prisma:createGuild", `Creating new guild with ID: ${guild.id}`);
  await prisma.guild.create({
    data: {
      id: guild.id,
    },
  });
}

export async function deleteGuild(guild: Guild): Promise<unknown> {
  const has = await prisma.guild.findFirst({
    where: {
      id: guild.id,
    },
  });

  if (!has) return;

  Logger("prisma:guildDelete", `Deleting entry for guild ID: ${guild.id}`);
  await prisma.guild.delete({
    where: {
      id: guild.id,
    },
  });
}

export async function findGuild(guild: Guild): Promise<unknown> {
  const g = await prisma.guild.findFirst({
    where: {
      id: guild.id,
    },
  });

  if (!g) return createGuild(guild);

  return g;
}

export async function createUser(user: GuildMember | APIInteractionGuildMember): Promise<unknown> {
  const has = await prisma.users.findFirst({
    where: {
      id: user.user.id,
    },
  });

  if (has) return;

  Logger("prisma:createUser", `Creating new user with ID: ${user.user.id}`);
  await prisma.users.create({
    data: {
      id: user.user.id,
    },
  });
  await prisma.leveling.create({
    data: {
      userId: user.user.id,
    },
  });
}

export async function findUser(user: GuildMember | APIInteractionGuildMember): Promise<unknown> {
  const mem = (await prisma.users.findFirst({
    where: {
      id: user.user.id,
    },
  })) as Users;

  if (!mem) return createUser(user);

  return mem as Users;
}

export async function getSettings(guild: Guild): Promise<unknown> {
  const find = await prisma.settings.findFirst({
    where: {
      guildId: guild.id,
    },
  });

  if (!find)
    await prisma.settings.create({
      data: {
        guildId: guild.id as string,
      },
    });

  return find!;
}
