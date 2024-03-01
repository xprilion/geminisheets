import prisma from "@/lib/prisma";

import { NextResponse, NextRequest } from 'next/server'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";

export async function POST(req: NextRequest) {
    const { gemini_key } = await req.json();

    const session = await getServerSession(authOptions);

    if (session) {
        try {
            const response = await prisma.user.update({
                where: {
                    id: session?.userId 
                },
                data: {
                    geminiKey: gemini_key || "",
                },
            });

            return NextResponse.json(response);
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