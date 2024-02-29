import type { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import {PrismaAdapter} from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import {Adapter} from "next-auth/adapters";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
        console.log("Profile created in nextauth")
          console.log(account, profile)
          return true // Do different verification for other providers that don't have `email_verified`
        },
        async session({ session, token, user }) {
            console.log("Session set in nextauth")
            // Implement additional session handling logic here if needed
            return session;
          },
      }
};
