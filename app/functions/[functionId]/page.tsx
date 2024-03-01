import prisma from "@/lib/prisma";
import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import { redirect } from 'next/navigation';
import { PrivateMenu } from '@/components/private-navbar';
import Link from "next/link";
import { Button, Card, CardBody } from "@/components";
import { WrenchIcon } from "@heroicons/react/24/outline";

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
        <div className='flex flex-row items-center justify-between'>
          <h1 className="text-2xl font-bold mb-4 mt-8">{functionData?.name}</h1>
          <div className="flex gap-2">
            <Button color="green" variant="filled">
              Install to Sheets
            </Button>
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
              {functionData?.code}
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }
  