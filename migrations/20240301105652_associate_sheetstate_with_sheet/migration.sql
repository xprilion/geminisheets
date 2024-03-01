-- AddForeignKey
ALTER TABLE "GlobalSheetState" ADD CONSTRAINT "GlobalSheetState_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
