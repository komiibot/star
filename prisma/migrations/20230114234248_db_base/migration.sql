-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('NORMAL', 'PREMIUM', 'STAFF', 'DEV');

-- CreateEnum
CREATE TYPE "GuildType" AS ENUM ('NORMAL', 'PREMIUM');

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "guildType" "GuildType" NOT NULL DEFAULT 'NORMAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "userType" "UserType" NOT NULL DEFAULT 'NORMAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leveling" (
    "currentXp" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Leveling_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "items" JSONB DEFAULT '[]',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "guildId" TEXT,
    "prefix" TEXT NOT NULL DEFAULT '?',

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_id_key" ON "Guild"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_id_key" ON "Settings"("id");

-- AddForeignKey
ALTER TABLE "Leveling" ADD CONSTRAINT "Leveling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;
