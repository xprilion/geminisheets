import prisma from "@/lib/prisma";
import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import { redirect } from 'next/navigation';
import { PrivateMenu } from '@/components/private-navbar';
import Link from "next/link";
import { Button } from "@/components";

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
      }
    });    
  
    return (
      <div className="container mx-auto p-4">
        <PrivateMenu />
        <h1 className="text-2xl font-bold mb-4 mt-8">View Function</h1>
        {functionData?.name}
        <Link href="/functions/add">
          <Button color="white" className='flex flex-row mt-4' variant="outlined" size="md" ripple={true} placeholder={"Add Function"}>
            Install to Sheets
          </Button>
        </Link>
      </div>
    );
  }
  