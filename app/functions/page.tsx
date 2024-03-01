import prisma from "@/lib/prisma";
import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import { redirect } from 'next/navigation';
import { PrivateMenu } from '@/components/private-navbar';
import Link from "next/link";
import { Button } from "@/components";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

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
        <h1 className="text-2xl font-bold mb-4 mt-8">Functions</h1>
        <div>
          <div>
            <ul>
              {allFunctions.map((func) => (
                <li key={func.id}>
                  <Link href={`/functions/${func.id}`}>{func.name}</Link> - {new Date(func.createdAt).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link href="/functions/add">
          <Button color="white" className='flex flex-row mt-4' variant="outlined" size="md" ripple={true} placeholder={"Add Function"}>
            <PlusCircleIcon className='h-4 w-4 mr-2' />
              Add Function
          </Button>
        </Link>
      </div>
    );
  }
  