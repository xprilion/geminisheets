import prisma from "@/lib/prisma";
import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import { redirect } from 'next/navigation';
import { PrivateMenu } from '@/components/private-navbar';
import { Button, Card, CardBody } from "@/components";
import { WrenchIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { FunctionCard } from "@/components/function-card";

export const metadata: Metadata = {
    title: "X Function | Gemini Sheets",
    description: "Supercharge your Google Sheets with Gemini AI powered custom fuctions",
  };
  
  export default async function Home({ params }: { params: { sheetId: string } }) {
    const session = await getServerSession(authOptions);

    if(!session?.user){
        redirect("/")
    }

    const sheetId = params.sheetId;

    const sheetData = await prisma.sheet.findFirst({
      where: {
        id: sheetId,
        userId: session?.userId
      },
      include: {
        sheetFunctions: {
          include: {
            function: true
          }
        }, 
      },
    });    
  
    return (
      <div className="container mx-auto p-4">
        <PrivateMenu />
        <div className='flex flex-row items-center justify-between'>
          <h1 className="text-2xl font-bold mb-4 mt-8">{sheetData?.name}</h1>
          <div className="flex gap-2">
            <Button color="blue" icon={<WrenchIcon className='h-4 w-4 mr-2' />} href="/functions/add">
              Manage
            </Button>
          </div>
        </div>
        <h2 className="text-large font-bold mt-4">Installed Functions</h2>
        {sheetData?.sheetFunctions.map((sheetFunction) => (
          <FunctionCard
            key={sheetFunction.function.id}
            title={sheetFunction.function.name}
            content={
              <div>
                <small>{new Date(sheetFunction.function.createdAt).toLocaleDateString()}</small>
              </div>
            }
            viewLink={`/functions/${sheetFunction.function.id}`}
            />
        ))}
      </div>
    );
  }
  