"use client"

import * as React from "react"

import { Button } from "@/components"
import {useState} from "react";
import {signIn} from "next-auth/react";

interface UserAuthBoxProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthBox({ className, ...props }: UserAuthBoxProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    return (
        <div {...props}>
            <Button color="blue" variant="filled" size="md" ripple={true} placeholder={"Get Started"}  disabled={isLoading} onClick={() => signIn("google")}>
                Get Started
            </Button>
        </div>
    )
}
