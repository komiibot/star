/*
  Warnings:

  - The values [DEV] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `channel` to the `Leveling` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('NORMAL', 'PREMIUM', 'STAFF', 'DEVELOPER', 'OWNER');
ALTER TABLE "Users" ALTER COLUMN "userType" DROP DEFAULT;
ALTER TABLE "Users" ALTER COLUMN "userType" TYPE "UserType_new" USING ("userType"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
ALTER TABLE "Users" ALTER COLUMN "userType" SET DEFAULT 'NORMAL';
COMMIT;

-- AlterTable
ALTER TABLE "Leveling" ADD COLUMN     "channel" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "ignoredChannels" TEXT[];

-- CreateTable
CREATE TABLE "EconomySettings" (
    "id" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,

    CONSTRAINT "EconomySettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisabledCommands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,

    CONSTRAINT "DisabledCommands_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EconomySettings" ADD CONSTRAINT "EconomySettings_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabledCommands" ADD CONSTRAINT "DisabledCommands_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
