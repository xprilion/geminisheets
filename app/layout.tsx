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
          <body className={inter.className}>{children}</body>
        </html>
      </ThemeProvider>
    </NextAuthProvider>
  );
}
