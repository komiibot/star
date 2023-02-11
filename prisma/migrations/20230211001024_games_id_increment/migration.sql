/*
  Warnings:

  - The primary key for the `Games` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Games" DROP CONSTRAINT "Games_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Games_pkey" PRIMARY KEY ("userId", "name", "id");
