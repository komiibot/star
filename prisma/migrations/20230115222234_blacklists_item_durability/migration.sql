/*
  Warnings:

  - Added the required column `durability` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "durability" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserBlacklist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserBlacklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildBlacklist" (
    "id" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,

    CONSTRAINT "GuildBlacklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserBlacklist_id_key" ON "UserBlacklist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GuildBlacklist_id_key" ON "GuildBlacklist"("id");

-- AddForeignKey
ALTER TABLE "UserBlacklist" ADD CONSTRAINT "UserBlacklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildBlacklist" ADD CONSTRAINT "GuildBlacklist_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
