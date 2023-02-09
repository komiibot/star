-- DropForeignKey
ALTER TABLE "DisabledCommands" DROP CONSTRAINT "DisabledCommands_guildId_fkey";

-- DropIndex
DROP INDEX "DisabledCommands_name_id_idx";

-- DropIndex
DROP INDEX "DisabledCommands_name_id_key";

-- CreateIndex
CREATE INDEX "DisabledCommands_name_guildId_idx" ON "DisabledCommands"("name", "guildId");

-- AddForeignKey
ALTER TABLE "DisabledCommands" ADD CONSTRAINT "DisabledCommands_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
