"use client"

import * as React from "react"

import { Button } from "@/components"
import {signOut} from "next-auth/react";


export function LogoutButton() {

    return (
        <Button size="md" color="red" variant="gradient" onClick={() => signOut()}>
            Logout
        </Button>
    )
}
