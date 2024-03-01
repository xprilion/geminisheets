import prisma from "@/lib/prisma";

import { NextResponse, NextRequest } from 'next/server'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";

export async function POST(req: NextRequest) {
    const { name, description, inputs, prompt } = await req.json();

    const session = await getServerSession(authOptions);

    if (session) {
        try {
            const response = await prisma.function.create({
                data: {
                    name: name || "Untitled Function",
                    description: description || "No description",
                    userId: session?.userId || "",
                    code: prompt || ""
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