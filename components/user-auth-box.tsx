"use client"

import * as React from "react"

import { Button } from "@/components"
import {signIn} from "next-auth/react";

interface UserAuthBoxProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthBox({ className, ...props }: UserAuthBoxProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    return (
        <div {...props}>
            <Button color="blue" variant="filled" size="md"  disabled={isLoading} onClick={() => signIn("google")}>
                Get Started
            </Button>
        </div>
    )
}
