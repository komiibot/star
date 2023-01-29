/*
  Warnings:

  - The primary key for the `Inventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `items` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `durability` on the `Item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,item]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `item` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_pkey",
DROP COLUMN "items",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "durability" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "item" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "durability";

-- CreateIndex
CREATE INDEX "Inventory_userId_item_idx" ON "Inventory"("userId", "item");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_userId_item_key" ON "Inventory"("userId", "item");
