"use client"

// modules
import * as React from "react"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icon"

// reducers
import { useLoginMutation } from "../../features/auth/auth.slice";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const formSchema = z.object({
    email: z.string()
        .email("Not a valid email"),
    password: z.string().min(6)
})
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const navigate = useNavigate();
    const [login, { data, isLoading, isError }] = useLoginMutation();
    const [isPasswordWrong, setIsPasswordWrong] = React.useState(false)

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        try {
            const resData = await login(values).unwrap()
            if (!resData.error && !isError) {
                navigate('/app/home');
            } else {
            }
        } catch (error: any) {
            if (error.status === 401)
                setIsPasswordWrong(true);
        }
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    return (
        <div >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="gains@email.com" autoComplete="email"{...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex justify-between">
                                    <div>
                                        Password
                                    </div>
                                    <Link to='/forgotpassword'>
                                        <p className="text-sm font-mediuml text-muted-foreground hover:text-primary hover:cursor-pointer">
                                            Forgot Password?
                                        </p>
                                    </Link>
                                </FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter you password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {isPasswordWrong && <p className="leading-5 text-muted-foreground pb-6 text-center">
                        Sorry, your credentials were incorrect. Please double-check your credentials.
                    </p>}
                    <Button type="submit" className="mt-3 w-fit flex justify-self-center" disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Login</Button>
                </form>
            </Form>

        </div>
    )
}
