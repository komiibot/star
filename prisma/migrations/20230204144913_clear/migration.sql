-- AlterTable
ALTER TABLE "Settings" ALTER COLUMN "prefix" SET DEFAULT 'k?';

-- CreateTable
CREATE TABLE "AuctionHouse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "itemAmount" INTEGER NOT NULL DEFAULT 1,
    "messageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "closed" BOOLEAN NOT NULL DEFAULT false,
    "sold" BOOLEAN NOT NULL DEFAULT false,
    "auctionChannel" TEXT,
    "economyGuildUserId" TEXT,
    "economyGuildGuildId" TEXT,

    CONSTRAINT "AuctionHouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EconomyGuild" (
    "cash" INTEGER NOT NULL DEFAULT 0,
    "bank" INTEGER NOT NULL DEFAULT 5000,
    "bankStorage" INTEGER NOT NULL DEFAULT 100,
    "networth" INTEGER NOT NULL DEFAULT 0,
    "streak" INTEGER NOT NULL,
    "lastDaily" TIMESTAMP(3),
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,

    CONSTRAINT "EconomyGuild_pkey" PRIMARY KEY ("userId","guildId")
);

-- CreateTable
CREATE TABLE "GuildLeveling" (
    "currentXp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "prestige" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,

    CONSTRAINT "GuildLeveling_pkey" PRIMARY KEY ("userId","guildId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuctionHouse_messageId_key" ON "AuctionHouse"("messageId");

-- AddForeignKey
ALTER TABLE "AuctionHouse" ADD CONSTRAINT "AuctionHouse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Economy"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionHouse" ADD CONSTRAINT "AuctionHouse_economyGuildUserId_economyGuildGuildId_fkey" FOREIGN KEY ("economyGuildUserId", "economyGuildGuildId") REFERENCES "EconomyGuild"("userId", "guildId") ON DELETE SET NULL ON UPDATE CASCADE;
