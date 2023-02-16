import { Economy, Leveling, Settings, Users } from "@prisma/client";
import { APIInteractionGuildMember, Guild, GuildMember, User } from "discord.js";
import { prisma, logger } from "../index";

export async function createGuild(guild: Guild): Promise<unknown> {
  const has = await prisma.guild.findFirst({
    where: {
      id: guild.id,
    },
  });

  if (has) return;

  await logger.prisma("prisma:createGuild", `Creating new guild entry: Name: ${guild.name} ID: ${guild.id} Owner: ${(await guild.fetchOwner()).user.tag}`);
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

  await logger.prisma("prisma:guildDelete", `Deleting entry for guild ID: ${guild.id}`);
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

  await logger.prisma("prisma:createUser", `Creating new user entry: ${user.user.username}#${user.user.discriminator} (${user.user.id})`);
  await prisma.users.create({
    data: {
      id: user.user.id,
    },
  });
  await prisma.leveling.create({
    data: {
      userId: user.user.id as string
    }
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

export async function getSettings(guild: Guild): Promise<Settings> {
  const find = await prisma.settings.findFirst({
    where: {
      guildId: guild.id as string,
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

export async function getSettingsById(guild: string): Promise<unknown> {
  const find = await prisma.settings.findFirst({
    where: {
      guildId: guild,
    },
  });

  if (!find)
    await prisma.settings.create({
      data: {
        guildId: guild,
      },
    });

  return find!;
}

export async function getEconomyUser(member: GuildMember): Promise<Economy> {
  const find = await prisma.economy.findFirst({
    where: {
      userId: member.id as string,
    },
  });

  if (!find) return;

  return find!;
}