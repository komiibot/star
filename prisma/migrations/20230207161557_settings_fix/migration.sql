-- DropForeignKey
ALTER TABLE "DisabledCommands" DROP CONSTRAINT "DisabledCommands_guildId_fkey";

-- AddForeignKey
ALTER TABLE "DisabledCommands" ADD CONSTRAINT "DisabledCommands_id_fkey" FOREIGN KEY ("id") REFERENCES "Settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
