"use client"

import * as React from "react"

import { Button } from "@/components"
import {signOut} from "next-auth/react";


export function LogoutButton() {

    return (
        <Button color="white" variant="outlined" size="md" ripple={true} placeholder={"Logout"}  onClick={() => signOut()}>
            Logout
        </Button>
    )
}
