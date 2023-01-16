-- CreateTable
CREATE TABLE "Economy" (
    "cash" INTEGER NOT NULL DEFAULT 200,
    "bank" INTEGER NOT NULL DEFAULT 0,
    "networth" INTEGER NOT NULL DEFAULT 200,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Economy_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Economy" ADD CONSTRAINT "Economy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
