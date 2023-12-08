"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icon"
import { useNavigate } from "react-router-dom"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-5">
                    <div className="grid gap-3">
                        <h2 className="px-1 mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                            Forgot Password?
                        </h2>
                        <p className="px-1 leading-5 text-muted-foreground pb-6">
                           We will send you an email to reset your password.
                        </p>
                        {/* <Label className="pl-2" htmlFor="email">
                            Email
                        </Label> */}
                        <Input
                            id="email"
                            placeholder="Enter your email here"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                   
                    <Button className="mt-3 w-full flex justify-self-center" disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Send
                    </Button>
                </div>
            </form>
        </div>
    )
}
