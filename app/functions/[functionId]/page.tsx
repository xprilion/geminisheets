import prisma from "@/lib/prisma";
import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import { redirect } from 'next/navigation';
import { PrivateMenu } from '@/components/private-navbar';
import Link from "next/link";
import { Button, Card, CardBody } from "@/components";
import { WrenchIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { FunctionCard } from "@/components/function-card";
// import { InstallButton } from "@/components/function-install-btn";

export const metadata: Metadata = {
    title: "X Function | Gemini Sheets",
    description: "Supercharge your Google Sheets with Gemini AI powered custom fuctions",
  };
  
  export default async function Home({ params }: { params: { functionId: string } }) {
    const session = await getServerSession(authOptions);

    if(!session?.user){
        redirect("/")
    }

    const functionId = params.functionId;

    const functionData = await prisma.function.findFirst({
      where: {
        id: functionId,
        userId: session?.userId
      },
      include: {
        sheetFunctions: {
          include: {
            sheet: true
          }
        }, 
      },
    });   
      
    return (
      <div className="container mx-auto p-4">
        <PrivateMenu />
        <div className='flex flex-row items-center justify-between'>
          <h1 className="text-2xl font-bold mb-4 mt-8">{functionData?.name}</h1>
          <div className="flex gap-2">
            <Button color="green" icon={<SparklesIcon className='h-4 w-4 mr-2' />} href={`/functions/${functionId}/install`}>
              Install to Sheet
            </Button>
            {/* <InstallButton functionId={functionData?.id || ""} /> */}
            <Button color="blue" icon={<WrenchIcon className='h-4 w-4 mr-2' />} href="/functions/add">
              Manage
            </Button>
          </div>

        </div>
        <p>{functionData?.description}</p>
        <Card placeholder={"function code card"} className="mt-4">
          <CardBody placeholder={"whut"}>
            <p className="font-bold">Function prompt: </p>
            <p>
              {functionData?.prompt}
            </p>
          </CardBody>
        </Card>
        <h2 className="text-large font-bold mt-4">Installed on Sheets</h2>
        {functionData?.sheetFunctions.map((sheetFunction) => (
          <FunctionCard
            key={sheetFunction.sheet.id}
            title={sheetFunction.sheet.name}
            content={
              <div>
                <small>{new Date(sheetFunction.sheet.createdAt).toLocaleDateString()}</small>
              </div>
            }
            viewLink={`/sheets/${sheetFunction.sheet.id}`}
            projectLink={`https://script.google.com/home/projects/${sheetFunction.appsScriptProjectId}`}
            />
        ))}
      </div>
    );
  }
  