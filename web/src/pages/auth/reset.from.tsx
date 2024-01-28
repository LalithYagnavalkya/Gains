"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icon"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { EyeIcon } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { EyeClosedIcon } from "@radix-ui/react-icons"
import { useResetPasswordMutation } from "@/features/auth/auth.slice"
import { useToast } from "@/components/ui/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const formSchema = z.object({
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(20, { message: 'Password must not exceed 20 characters' })
        .refine((password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password), {
            message: 'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
        }),
    confirmPassword: z.string(),
})
    .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const { toast } = useToast()
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const token = queryParams.get('token');

    const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [password1View, setPassword1View] = React.useState<boolean>(false)
    const [password2View, setPassword2View] = React.useState<boolean>(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (!isResetLoading) {
                setIsLoading(true)

                const result = await resetPassword({ ...values, token })

                if (result?.data?.error === false) {
                    toast({
                        description: result.data.message,
                    })
                    navigate('/login');
                }

                setTimeout(() => {
                    setIsLoading(false)
                }, 1500)
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
                        <h2 className="px-1 mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                            Reset Password
                        </h2>
                        <div className="grid gap-3 ">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center justify-end">
                                                <div className="w-full">
                                                    <Input
                                                        type={password1View ? 'text' : 'password'}
                                                        autoCapitalize="none"
                                                        autoCorrect="off"
                                                        {...field}
                                                    />
                                                </div>
                                                <div className="absolute pr-2 cursor-pointer">
                                                    {password1View ? (
                                                        <EyeClosedIcon onClick={() => setPassword1View(!password1View)} />
                                                    ) : (
                                                        <EyeIcon className="text-muted" onClick={() => setPassword1View(!password1View)} />
                                                    )}
                                                </div>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center justify-end">
                                                <div className="w-full">
                                                    <Input
                                                        type={password2View ? 'text' : 'password'}
                                                        autoCapitalize="none"
                                                        autoCorrect="off"
                                                        {...field}
                                                    />
                                                </div>
                                                <div className="absolute pr-2 cursor-pointer">
                                                    {password2View ? (
                                                        <EyeClosedIcon onClick={() => setPassword2View(!password2View)} />
                                                    ) : (
                                                        <EyeIcon onClick={() => setPassword2View(!password2View)} className="text-muted" />
                                                    )}
                                                </div>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
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
            </Form>
        </div>
    )
}
