import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components"
import {NextAuthProvider} from "@/app/session-provider";


import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <ThemeProvider>
        <html lang="en">
          <body className={inter.className}>
            <div className="mx-auto max-w-screen-xl px-2">
              <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <div className="flex-1 flex w-full">{children}</div>
                <footer className="flex flex-col items-center justify-center w-full h-24 border-t">
                    <div className="flex flex-row">
                      GeminiSheets <img src="/logo.png" alt="GeminiSheets Logo" className="h-4 mx-2" /> With ❤️ from <a className="ml-2" href="https://xprilion.com" target="_blank">@xprilion</a>.<br />
                    </div>
                    <div className="flex flex-row mx-auto">
                      <Link className="text-blue-500 hover:text-blue-700 hover:underline" target="_blank" href="/privacy">Privacy Policy</Link>&nbsp;&middot;&nbsp;<Link target="_blank" className="text-blue-500 hover:text-blue-700 hover:underline" href="/terms">Terms of Service</Link>
                    </div>
                </footer>
              </div>
            </div>
            
          </body>
        </html>
      </ThemeProvider>
    </NextAuthProvider>
  );
}
