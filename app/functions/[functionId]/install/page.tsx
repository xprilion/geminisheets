import prisma from "@/lib/prisma";
import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import { redirect } from 'next/navigation';
import { PrivateMenu } from '@/components/private-navbar';
import { Button, Card, CardBody } from "@/components";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { FunctionInstallPage } from "@/components/function-install-form";

export const metadata: Metadata = {
    title: "Install Function | Gemini Sheets",
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
      }
    });    

    const allSheets = await prisma.sheet.findMany({
        where: {
          userId: session.userId,
        }
    });    
  
    return (
      <div className="container mx-auto p-4">
        <PrivateMenu />
        <div className='flex flex-row items-center justify-between'>
          <h1 className="text-2xl font-bold mb-4 mt-8">{functionData?.name} - Install</h1>
          <div className="flex gap-2">
            <Button href={`/functions/${functionId}`} icon={<ArrowLeftCircleIcon className='h-4 w-4 mr-2' />}>
              Back
            </Button>
          </div>
        </div>
        <FunctionInstallPage functionId={functionId} sheets={allSheets} />
      </div>
    );
  }
  