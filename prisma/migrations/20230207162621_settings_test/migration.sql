/*
  Warnings:

  - A unique constraint covering the columns `[name,id]` on the table `DisabledCommands` will be added. If there are existing duplicate values, this will fail.
  - Made the column `guildId` on table `Settings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DisabledCommands" DROP CONSTRAINT "DisabledCommands_id_fkey";

-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_guildId_fkey";

-- DropIndex
DROP INDEX "DisabledCommands_name_guildId_idx";

-- DropIndex
DROP INDEX "DisabledCommands_name_guildId_key";

-- AlterTable
ALTER TABLE "Settings" ALTER COLUMN "guildId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "DisabledCommands_name_id_idx" ON "DisabledCommands"("name", "id");

-- CreateIndex
CREATE UNIQUE INDEX "DisabledCommands_name_id_key" ON "DisabledCommands"("name", "id");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabledCommands" ADD CONSTRAINT "DisabledCommands_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
