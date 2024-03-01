/*
  Warnings:

  - The primary key for the `GlobalSheetState` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sheetId` on the `GlobalSheetState` table. All the data in the column will be lost.
  - Added the required column `googleSheetId` to the `GlobalSheetState` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GlobalSheetState" DROP CONSTRAINT "GlobalSheetState_sheetId_fkey";

-- AlterTable
ALTER TABLE "GlobalSheetState" DROP CONSTRAINT "GlobalSheetState_pkey",
DROP COLUMN "sheetId",
ADD COLUMN     "googleSheetId" TEXT NOT NULL,
ADD CONSTRAINT "GlobalSheetState_pkey" PRIMARY KEY ("googleSheetId");
