import prisma from "@/lib/prisma";

import { NextResponse, NextRequest } from 'next/server'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";

import { loadFromTemplate } from "@/lib/render_template";
import { convertToSnakeCaseUppercase } from "@/lib/utils";

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

                const sheetFunctionState = await prisma.sheetFunction.findFirst({
                    where: {
                        functionId: function_id || "",
                        sheetId: sheetData?.id || "",
                        userId: session?.userId || "",
                    },
                });
    
                const accountData = await prisma.account.findFirst({
                    where: {
                        userId: session?.userId || "",
                    },
                });

                let projectId = sheetFunctionState?.appsScriptProjectId;
    
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
    
                        if(!sheetFunctionState?.appsScriptProjectId){
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
                                projectId = res.data?.scriptId
                            }
                        }

                        const userData = await prisma.user.findFirst({
                            select: {
                                geminiKey: true
                            },
                            where: {
                                id: session?.userId
                            }
                        })

                        const function_source = loadFromTemplate("function", 
                                                                    {
                                                                        DESCRIPTION: functionData.description,
                                                                        NAME: convertToSnakeCaseUppercase(functionData.name),
                                                                    }, 
                                                                functionData)
                        
                        const initializeProjectResponse = await script.projects.updateContent({
                            requestBody: {
                                files: [
                                    {
                                        name: "appsscript",
                                        type: "JSON",
                                        source: JSON.stringify({
                                            "timeZone": "America/New_York",
                                            "dependencies": {
                                            },
                                            "exceptionLogging": "STACKDRIVER",
                                            "runtimeVersion": "V8"
                                        })
                                    },
                                    {
                                        name: "geminisheets_init",
                                        type: "SERVER_JS",
                                        source: loadFromTemplate("init", {
                                            "GEMINI_KEY": userData?.geminiKey
                                        })
                                    },
                                    {
                                        name: `geminisheets_fn_${function_id}`,
                                        type: "SERVER_JS",
                                        source: function_source
                                    },
                                ]
                            },
                            scriptId: projectId,
                        })

                        await prisma.globalSheetState.update({
                            where: {
                                googleSheetId: sheetData?.googleSheetId
                            },
                            data: {
                                initialized: true
                            }
                        })
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