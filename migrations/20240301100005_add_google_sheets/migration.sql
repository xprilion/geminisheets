/*
  Warnings:

  - A unique constraint covering the columns `[userId,sheetId,functionId]` on the table `SheetFunction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `SheetFunction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SheetFunction_sheetId_functionId_key";

-- AlterTable
ALTER TABLE "SheetFunction" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GoogleSheet" (
    "id" TEXT NOT NULL,
    "sheetId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoogleSheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalSheetState" (
    "sheetId" TEXT NOT NULL,
    "initialized" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GlobalSheetState_pkey" PRIMARY KEY ("sheetId")
);

-- CreateIndex
CREATE INDEX "userSheetIndex" ON "GoogleSheet"("sheetId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SheetFunction_userId_sheetId_functionId_key" ON "SheetFunction"("userId", "sheetId", "functionId");

-- AddForeignKey
ALTER TABLE "SheetFunction" ADD CONSTRAINT "SheetFunction_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "GoogleSheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoogleSheet" ADD CONSTRAINT "GoogleSheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
