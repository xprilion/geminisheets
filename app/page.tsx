import Head from 'next/head';
import { Button } from '@/components';
import { Metadata } from 'next';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import { redirect } from 'next/navigation';
import { UserAuthBox } from '@/components/user-auth-box';

export const metadata: Metadata = {
  title: "Gemini Sheets - Gemini AI Powered Sheets Functions",
  description: "Supercharge your Google Sheets with Gemini AI powered custom fuctions",
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Gemini Sheets - Gemini AI Powered Sheets Functions</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <a className="text-blue-600" href="#">GeminiSheets!</a>
        </h1>

        <p className="mt-3 text-2xl">
          Supercharge your Google Sheets with Gemini AI.
        </p>

        { session?.user?.name ? (<>
            Hello ${session?.user?.name}
          </>
          ):(
            <div className="mt-6">
              <UserAuthBox />
            </div>
          )
        }
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          GeminiSheets <img src="/logo.png" alt="GeminiSheets Logo" className="h-4 mx-2" /> With &lt;3 from @xprilion.
        </a>
      </footer>
    </div>
  );
}
