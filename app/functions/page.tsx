import prisma from "@/lib/prisma";
import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import { redirect } from 'next/navigation';
import { PrivateMenu } from '@/components/private-navbar';
import Link from "next/link";
import { Button } from "@/components";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { FunctionCard } from "@/components/function-card";

export const metadata: Metadata = {
    title: "Functions | Gemini Sheets",
    description: "Supercharge your Google Sheets with Gemini AI powered custom fuctions",
  };
  
  export default async function Home() {
    const session = await getServerSession(authOptions);

    if(!session?.user){
        redirect("/")
    }

    const allFunctions = await prisma.function.findMany({
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
          <h1 className="text-2xl font-bold mb-4 mt-8">Functions</h1>
          <Button color="blue" icon={<PlusCircleIcon className='h-4 w-4 mr-2' />} href="/functions/add">
            Add Function
          </Button>
        </div>
        <div>
          <div className='flex gap-4'>
              {allFunctions.map((func) => (
                <FunctionCard
                  key={func.id}
                  title={func.name}
                  content={
                    <div>
                      <p>{func.description}</p>
                      <small>{new Date(func.createdAt).toLocaleDateString()}</small>
                    </div>
                  }
                  buttonText={"View"}
                  buttonLink={`/functions/${func.id}`}
                  />
              ))}
            </div>
        </div>
      </div>
    );
  }
  