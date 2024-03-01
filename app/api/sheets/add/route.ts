import prisma from "@/lib/prisma";

import { NextResponse, NextRequest } from 'next/server'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";

export async function POST(req: NextRequest) {
    const { google_sheet_id, name } = await req.json();

    const session = await getServerSession(authOptions);

    if (session) {
        try {
            const result = await prisma.$transaction(async (prisma) => {
                let globalSheetState = await prisma.globalSheetState.findUnique({
                  where: { googleSheetId: google_sheet_id },
                });
            
                if (!globalSheetState) {
                  globalSheetState = await prisma.globalSheetState.create({
                    data: {
                      googleSheetId: google_sheet_id,
                      initialized: false,
                    },
                  });
                }
            
                const sheet = await prisma.sheet.create({
                    data: {
                        name: name || "Untitled Sheet",
                        userId: session?.userId || "",
                        googleSheetId: google_sheet_id || "",
                    },
                });
                return sheet;
            });
            return NextResponse.json(result);
        }
        catch (error) {
            console.log("error", error);
            return NextResponse.json(error)
        }
    }
    else {
        console.log("Forbidden");
        return NextResponse.json({"message": "Forbidden"})
    }
}