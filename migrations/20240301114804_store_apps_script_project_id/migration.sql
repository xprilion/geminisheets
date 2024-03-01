/*
  Warnings:

  - Added the required column `appsScriptProjectId` to the `SheetFunction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SheetFunction" ADD COLUMN     "appsScriptProjectId" TEXT NOT NULL;
