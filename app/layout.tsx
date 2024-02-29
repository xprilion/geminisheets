import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components"
import {NextAuthProvider} from "@/app/session-provider";


import "./globals.css";

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
            <div className="mx-auto max-w-screen-xl px-6 py-3">
              {children}
            </div>
          </body>
        </html>
      </ThemeProvider>
    </NextAuthProvider>
  );
}
