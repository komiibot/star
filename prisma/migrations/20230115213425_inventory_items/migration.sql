-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('CARD', 'TOOL', 'COLLECTABLE', 'PACK');

-- CreateEnum
CREATE TYPE "Powers" AS ENUM ('FIRE', 'WATER', 'EARTH', 'WIND');

-- CreateTable
CREATE TABLE "GuildUsers" (
    "guildId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GuildUsers_pkey" PRIMARY KEY ("guildId","userId")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "limited" BOOLEAN NOT NULL,
    "type" "ItemType" NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GuildUsers" ADD CONSTRAINT "GuildUsers_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildUsers" ADD CONSTRAINT "GuildUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
