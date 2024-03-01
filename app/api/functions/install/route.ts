import prisma from "@/lib/prisma";

import { NextResponse, NextRequest } from 'next/server'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";

const {google} = require('googleapis');
const script = google.script('v1');

export async function POST(req: NextRequest) {
    const { function_id, sheet_id } = await req.json();

    const session = await getServerSession(authOptions);

    if (session) {
        try {
            let message: any = "";

                const functionData = await prisma.function.findFirst({
                    where: {
                        userId: session?.userId || "",
                        id: function_id
                    },
                });
    
                const sheetData = await prisma.sheet.findFirst({
                    where: {
                        userId: session?.userId || "",
                        id: sheet_id
                    },
                });
    
                const sheetState = await prisma.globalSheetState.findFirst({
                    where: {
                        googleSheetId: sheetData?.googleSheetId
                    }
                })
    
                const accountData = await prisma.account.findFirst({
                    where: {
                        userId: session?.userId || "",
                    },
                });
    
                if(functionData && sheetData && sheetState && accountData){
                    try {
                        const oauth2Client = new google.auth.OAuth2(
                            process.env.GOOGLE_ID, 
                            process.env.GOOGLE_SECRET
                        );
    
                        oauth2Client.setCredentials({
                            access_token: accountData?.access_token,
                            refresh_token: accountData?.refresh_token
                        });
    
                        google.options({auth: oauth2Client});
    
                        const res = await script.projects.create({
                            requestBody: {
                                "parentId": sheetState?.googleSheetId,
                                "title": `geminisheets_project_${functionData.id}`
                            }
                        });

                        message = res.data;

                        if (res.data?.scriptId){
                            await prisma.sheetFunction.create({
                                data: {
                                    appsScriptProjectId: res.data?.scriptId || "",
                                    functionId: function_id || "",
                                    sheetId: sheetData?.id || "",
                                    userId: session?.userId || "",
                                },
                            });

                            await prisma.globalSheetState.update({
                                where: {
                                    googleSheetId: sheetData?.googleSheetId
                                },
                                data: {
                                    initialized: true
                                }
                            })
                        }
                    }
                    catch (error){
                        console.log("error", error);
                        message = {
                            "message": "Unable to create scripts."
                        }
                    }
                } else {
                    message = {
                        "message": "Unable to process scripts."
                    }
                }
            return NextResponse.json(message);
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