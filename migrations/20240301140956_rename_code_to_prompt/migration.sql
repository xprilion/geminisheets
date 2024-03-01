/*
  Warnings:

  - You are about to drop the column `code` on the `Function` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Function" DROP COLUMN "code",
ADD COLUMN     "prompt" TEXT NOT NULL DEFAULT '';
