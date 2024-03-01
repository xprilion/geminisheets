import Head from 'next/head';
import { Button } from '@/components';
import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import { UserAuthBox } from '@/components/user-auth-box';
import { LogoutButton } from '@/components/logout-button';
import Link from 'next/link';
import { PublicMenu } from '@/components/public-navbar';

export const metadata: Metadata = {
  title: "Gemini Sheets - Gemini AI Powered Sheets Functions",
  description: "Supercharge your Google Sheets with Gemini AI powered custom fuctions",
  icons: "/favicon.png"
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
      <main className="flex flex-1 flex-col flex-grow items-center justify-center w-full p-4 lg:px-20 text-center">
        <PublicMenu />
        <div className='flex-1 flex flex-col items-center justify-center'>
          <h1 className="text-3xl lg:text-6xl font-bold">
            Welcome to <span className="text-blue-600">GeminiSheets!</span>
          </h1>

          <p className="mt-3 mb-16 lg:text-2xl">
            Supercharge your Google Sheets with Gemini AI.
          </p>

          { session?.user?.name ? (<>
              <p className='text-xl'>Hello, {session?.user?.name}</p>
              <div className="mt-6">
                  <Button href="/dashboard" className='mr-2' color="blue" variant="gradient" size="md" ripple={true}>
                      Dashboard
                  </Button>
                <LogoutButton />
              </div>
            </>
            ):(
              <div className="mt-6">
                <UserAuthBox />
              </div>
            )
          }
        </div>
      </main>
  );
}
