import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from 'next/navigation';
import { PrivateMenu } from '@/components/private-navbar';

type Function = {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
};

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
        userId: session.userId as string, // Ensure this matches how you're storing the user ID in your session
      },
    });
  
    const recentFunctions = await prisma.function.findMany({
      where: {
        userId: session.userId, // Ensure this matches how you're storing the user ID in your session
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    });

  
    return (
      <div className="container mx-auto p-4">
        <PrivateMenu />
        <h1 className="text-2xl font-bold mb-4 mt-8">Dashboard</h1>
        <div>
          <h2 className="text-xl">Total Functions: {totalFunctions}</h2>
          <div>
            <h3 className="text-lg">Recent Functions:</h3>
            <ul>
              {recentFunctions.map((func) => (
                <li key={func.id}>
                  {func.name} - {new Date(func.createdAt).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  