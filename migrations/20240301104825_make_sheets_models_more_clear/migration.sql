/*
  Warnings:

  - You are about to drop the `GoogleSheet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GoogleSheet" DROP CONSTRAINT "GoogleSheet_userId_fkey";

-- DropForeignKey
ALTER TABLE "SheetFunction" DROP CONSTRAINT "SheetFunction_sheetId_fkey";

-- DropTable
DROP TABLE "GoogleSheet";

-- CreateTable
CREATE TABLE "Sheet" (
    "id" TEXT NOT NULL,
    "googleSheetId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "userSheetIndex" ON "Sheet"("googleSheetId", "userId");

-- AddForeignKey
ALTER TABLE "SheetFunction" ADD CONSTRAINT "SheetFunction_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sheet" ADD CONSTRAINT "Sheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
