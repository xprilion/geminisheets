import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import { redirect } from 'next/navigation';
import { PrivateMenu } from '@/components/private-navbar';
import { SheetAddForm } from '@/components/sheet-add-form';

export const metadata: Metadata = {
    title: "Add Sheet | Gemini Sheets",
    description: "Supercharge your Google Sheets with Gemini AI powered custom fuctions",
  };
  
  export default async function Home() {
    const session = await getServerSession(authOptions);

    if(!session?.user){
        redirect("/")
    }
  
    return (
      <div className="container mx-auto p-4">
        <PrivateMenu />
        <h1 className="text-2xl font-bold mb-4 mt-8">Add Sheet</h1>
        <SheetAddForm />
      </div>
    );
  }
  