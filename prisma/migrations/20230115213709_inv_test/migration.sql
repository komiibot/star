/*
  Warnings:

  - You are about to drop the column `items` on the `Inventory` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "items",
ADD COLUMN     "itemId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
