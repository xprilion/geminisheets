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
            },
            profile(profile) {
                return {
                  id: profile.sub,
                  name: profile.name,
                  email: profile.email,
                  image: profile.picture,
                }
            }
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.userId = token.sub || "";
            return Promise.resolve(session);
          },
      }
};
