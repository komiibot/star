/*
  Warnings:

  - You are about to drop the column `itemId` on the `Inventory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_itemId_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "itemId";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "inventoryUserId" TEXT;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_inventoryUserId_fkey" FOREIGN KEY ("inventoryUserId") REFERENCES "Inventory"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
