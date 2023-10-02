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
                    <h2 className="px-1 mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                        Reset Password
                    </h2>
                    <div className="grid gap-3">
                        <Label className="pl-2" htmlFor="email">
                            Password
                        </Label>
                        <Input
                            id="email"
                            placeholder=""
                            type="password"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label className="pl-2" htmlFor="email">
                            Confirm password
                        </Label>
                        <Input
                            id="password"
                            placeholder=""
                            type="password"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <Button className="mt-3 w-fit flex justify-self-center" disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Confirm
                    </Button>
                </div>
            </form>
        </div>
    )
}
