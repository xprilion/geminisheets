import {Session, User} from "next-auth";

declare module "next-auth" {

    interface Session {
        id: string;
        sessionToken: string;
        userId: string;
        expires: Date;
        user?: User
    }

    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        userId?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        access_token?: string;
        refresh_token?: string;
        user?: User
    }
}