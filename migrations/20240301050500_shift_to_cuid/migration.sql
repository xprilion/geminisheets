/*
  Warnings:

  - The primary key for the `Function` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SheetFunction` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "SheetFunction" DROP CONSTRAINT "SheetFunction_functionId_fkey";

-- AlterTable
ALTER TABLE "Function" DROP CONSTRAINT "Function_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Function_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Function_id_seq";

-- AlterTable
ALTER TABLE "SheetFunction" DROP CONSTRAINT "SheetFunction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "functionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SheetFunction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SheetFunction_id_seq";

-- AddForeignKey
ALTER TABLE "SheetFunction" ADD CONSTRAINT "SheetFunction_functionId_fkey" FOREIGN KEY ("functionId") REFERENCES "Function"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
