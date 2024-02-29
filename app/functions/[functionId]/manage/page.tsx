import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Manage Function | Gemini Sheets",
    description: "Supercharge your Google Sheets with Gemini AI powered custom fuctions",
  };
  
  export default async function Home() {
    const session = await getServerSession(authOptions);

    if(!session?.user){
        redirect("/")
    }
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
      </div>
    );
  }
  