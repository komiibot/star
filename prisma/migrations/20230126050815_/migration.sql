-- CreateEnum
CREATE TYPE "GuildType" AS ENUM ('NORMAL', 'PREMIUM');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('NORMAL', 'PREMIUM', 'STAFF', 'DEV');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('CARD', 'ITEM', 'TOOL', 'COLLECTABLE', 'PACK');

-- CreateEnum
CREATE TYPE "Powers" AS ENUM ('FIRE', 'WATER', 'EARTH', 'WIND');

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "guildType" "GuildType" NOT NULL DEFAULT 'NORMAL',
    "blacklisted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildUsers" (
    "guildId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GuildUsers_pkey" PRIMARY KEY ("guildId","userId")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "guildId" TEXT,
    "prefix" TEXT NOT NULL DEFAULT '?',
    "leveling" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "userType" "UserType" NOT NULL DEFAULT 'NORMAL',
    "blacklisted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "canDm" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Leveling" (
    "currentXp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "prestige" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Leveling_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Economy" (
    "cash" INTEGER NOT NULL DEFAULT 0,
    "bank" INTEGER NOT NULL DEFAULT 5000,
    "bankStorage" INTEGER NOT NULL DEFAULT 100,
    "networth" INTEGER NOT NULL DEFAULT 0,
    "streak" INTEGER NOT NULL,
    "lastDaily" TIMESTAMP(3),
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Economy_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "description" TEXT,
    "aliases" TEXT[],
    "shortDescription" TEXT,
    "stackable" BOOLEAN,
    "maxQuanity" INTEGER,
    "limited" BOOLEAN NOT NULL DEFAULT false,
    "rarity" INTEGER NOT NULL DEFAULT 0,
    "durability" INTEGER NOT NULL DEFAULT 100,
    "type" "ItemType" NOT NULL,
    "price" INTEGER NOT NULL,
    "sellPrice" INTEGER,
    "lootBox" BOOLEAN NOT NULL,
    "crafting" JSONB,
    "inventoryUserId" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_id_key" ON "Guild"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- AddForeignKey
ALTER TABLE "GuildUsers" ADD CONSTRAINT "GuildUsers_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildUsers" ADD CONSTRAINT "GuildUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leveling" ADD CONSTRAINT "Leveling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Economy" ADD CONSTRAINT "Economy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_inventoryUserId_fkey" FOREIGN KEY ("inventoryUserId") REFERENCES "Inventory"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
