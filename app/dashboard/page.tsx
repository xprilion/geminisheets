import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from 'next/navigation';
import { PrivateMenu } from '@/components/private-navbar';
import { Button } from '@/components';
import Link from 'next/link';

import {
  PlusCircleIcon
} from "@heroicons/react/24/solid";
import { FunctionCard } from '@/components/function-card';


export const metadata: Metadata = {
    title: "Dashboard | Gemini Sheets",
    description: "Supercharge your Google Sheets with Gemini AI powered custom fuctions",
  };
  
  export default async function Home() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        redirect("/login")
    }

    const totalFunctions = await prisma.function.count({
      where: {
        userId: session.userId as string,
      },
    });
  
    const recentFunctions = await prisma.function.findMany({
      where: {
        userId: session.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    });

  
    return (
      <div className="container mx-auto p-4">
        <PrivateMenu />
        <div className='flex flex-row items-center justify-between'>
          <h1 className="text-2xl font-bold mb-4 mt-8">Dashboard</h1>
          <Button color="blue" icon={<PlusCircleIcon className='h-4 w-4 mr-2' />} href="/functions/add">
            Add Function
          </Button>
        </div>
        <div>
          <h2 className="text-xl">Total Functions: {totalFunctions}</h2>
          <div>
            <h3 className="text-lg">Recent Functions:</h3>
            <div className='flex gap-4'>
              {recentFunctions.map((func) => (
                <FunctionCard
                  key={func.id}
                  title={func.name}
                  content={
                    <div>
                      <p>{func.description}</p>
                      <small>{new Date(func.createdAt).toLocaleDateString()}</small>
                    </div>
                  }
                  viewLink={`/functions/${func.id}`}
                  />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  