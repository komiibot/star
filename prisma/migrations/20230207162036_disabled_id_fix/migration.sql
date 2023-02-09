/*
  Warnings:

  - A unique constraint covering the columns `[name,guildId]` on the table `DisabledCommands` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "DisabledCommands_name_guildId_idx" ON "DisabledCommands"("name", "guildId");

-- CreateIndex
CREATE UNIQUE INDEX "DisabledCommands_name_guildId_key" ON "DisabledCommands"("name", "guildId");
