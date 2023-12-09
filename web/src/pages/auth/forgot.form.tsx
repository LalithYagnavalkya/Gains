"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icon"
import { useForgotPasswordMutation } from "@/features/auth/auth.slice"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const formSchema = z.object({
    email: z.string()
        .email("Not a valid email"),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const { toast } = useToast()

    const [forgotPassword, { isLoading: isForgotAPILoading }] = useForgotPasswordMutation();
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (!isForgotAPILoading) {
                setIsLoading(true)

                const result = await forgotPassword(values)

                if(result?.data.error === false){
                    toast({
                        description: result.data.message,
                    })
                }

                setTimeout(() => {
                    setIsLoading(false)
                }, 3000)
            }
        } catch (error) {
            toast({
                description: "Something went wrong!",
            })
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-between">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Enter you password"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                {...field} />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}

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
            </Form>

        </div>
    )
}
