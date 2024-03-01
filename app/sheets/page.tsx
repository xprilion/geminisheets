import prisma from "@/lib/prisma";
import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import { redirect } from 'next/navigation';
import { PrivateMenu } from '@/components/private-navbar';
import { Button } from "@/components";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { SheetCard } from "@/components/sheet-card";

export const metadata: Metadata = {
    title: "Sheets | Gemini Sheets",
    description: "Supercharge your Google Sheets with Gemini AI powered custom fuctions",
  };
  
  export default async function Home() {
    const session = await getServerSession(authOptions);

    if(!session?.user){
        redirect("/")
    }

    const allSheets = await prisma.sheet.findMany({
      where: {
        userId: session.userId,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });    
  
    return (
      <div className="container mx-auto p-4">
        <PrivateMenu />
        <div className='flex flex-row items-center justify-between'>
          <h1 className="text-2xl font-bold mb-4 mt-8">Sheets</h1>
          <Button color="blue" icon={<PlusCircleIcon className='h-4 w-4 mr-2' />} href="/sheets/add">
            Add Sheet
          </Button>
        </div>
        <div>
          <div className='flex gap-4'>
              {allSheets.map((sheet) => (
                <SheetCard
                  key={sheet.id}
                  title={sheet.name}
                  content={
                    <div>
                      <small>{new Date(sheet.createdAt).toLocaleDateString()}</small>
                    </div>
                  }
                  viewLink={`/sheets/${sheet.id}`}
                  viewExternalLink={`https://docs.google.com/spreadsheets/d/${sheet.googleSheetId}`}
                  />
              ))}
            </div>
        </div>
      </div>
    );
  }
  