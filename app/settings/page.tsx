import prisma from "@/lib/prisma";
import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import { redirect } from 'next/navigation';
import { PrivateMenu } from '@/components/private-navbar';
import { Card, CardBody, Input } from "@/components";
import { GeminiKeyForm } from "@/components/account-gemini-key-form";

export const metadata: Metadata = {
    title: "Settings | Gemini Sheets",
    description: "Supercharge your Google Sheets with Gemini AI powered custom fuctions",
  };
  
  export default async function Home() {
    const session = await getServerSession(authOptions);

    if(!session?.user){
        redirect("/")
    }

    const userData = await prisma.user.findFirst({
      where: {
        id: session.userId,
      }
    });
  
    return (
      <div className="container mx-auto p-4">
        <PrivateMenu />
        <h1 className="text-2xl font-bold mb-4 mt-8">Settings</h1>
        <Card placeholder={"placeholder"}>
          <CardBody placeholder={"placeholder"} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">User Settings</h2>
            <p><strong>Name:</strong> {userData?.name}</p>
            <p><strong>Email:</strong> {userData?.email}</p>
            <p><strong>Gemini Key:</strong></p>
            <GeminiKeyForm geminiKey={userData?.geminiKey} />
          </CardBody>
        </Card>
      </div>
    );
  }
  