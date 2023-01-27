/*
  Warnings:

  - You are about to drop the column `inventoryUserId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_inventoryUserId_fkey";

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "items" TEXT[];

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "inventoryUserId";
