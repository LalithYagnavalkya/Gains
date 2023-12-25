"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { useCheckIfUserNameOrPhoneExistsMutation } from "@/features/customer/customer.api"
import { format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Calendar } from "@/components/ui/calendar"
import { RupeeInput } from "@/components/ui/rupeeInput"

const profileFormSchema = z.object({
    username: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    phone: z.string()
        .length(10, 'Phone number must be 10 digits'),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    joinedOn: z.string().optional(),

    validUpto: z.date(),

    membershipFee: z.string(),

    workoutType: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

type props = {
    username: string,
    phone: string,
    email: string,
    workoutType: string[],
    joinedOn: string,
    validUpto: string,
    paymentStatus: string,
    membershipFee: string,
}
const wrokoutTypes = [
    { value: 'CARDIO', label: 'Cardio' },
    { value: 'STRENGTH', label: 'Strength' },
    { value: 'CALISTENICS', label: 'Calisthenics' },
    { value: 'ZUMBA', label: 'Zumba' },
    { value: 'CARDIO + STRENGTH', label: 'Cardio + Strength' },
    { value: 'CARDIO + CALISTENICS', label: 'Cardio + Calisthenics' },
    { value: 'STRENGTH + CALISTENICS', label: 'Strength + Calisthenics' },
    { value: 'CARDIO + STRENGTH + CALISTENICS + ZUMBA', label: 'All' },
]
// This can come from your database or API.

export function ProfileForm({ username, phone, email, workoutType, joinedOn, membershipFee }: props) {

    const [validUptoDate, setValidUptoDate] = useState<Date>(new Date());
    const [checkIfUserNameOrPhoneExists] = useCheckIfUserNameOrPhoneExistsMutation();

    membershipFee = String(membershipFee)
    // Remove any non-digit characters from the input (e.g., commas)
    const sanitizedValue = membershipFee?.replace(/[^0-9]/g, '');
    // Format the number with commas
    const defaultMembershipFee = sanitizedValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    let workoutTypesString = workoutType?.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' + ');

    const defaultValues: Partial<ProfileFormValues> = {
        username: username,
        phone: phone,
        email: email,
        membershipFee: defaultMembershipFee,
        workoutType: workoutTypesString,
        validUpto: new Date(),
    }
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const addMonthsInValidUptoField = (value: number) => {
        const currentDate = form.getValues('validUpto') || new Date()
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + value);
        setValidUptoDate(newDate)
    }

    function onSubmit(data: ProfileFormValues) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                <div className="flex gap-x-4 ">
                    <div className="w-3/4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input autoComplete="off" placeholder="whats his/her name?" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col justify-end items-start">
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Joined On
                        </h4>
                        <div className="text-lg font-semibold ">
                            {joinedOn ? format(new Date(joinedOn), 'MMMM do yyy') : ''}
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-4">
                    <div className="w-3/4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input autoComplete="off" placeholder="" {...field}
                                            onBlur={async (e) => {
                                                console.log(e.target.value)
                                                if (email === e.target.value) {
                                                    return
                                                }
                                                const res = await checkIfUserNameOrPhoneExists({ email: e.target.value });
                                                if (res?.error?.status === 409) {
                                                    form.setError('email', { type: 'custom', message: 'This email already exists' })
                                                } else if (res?.error?.status === 400) {
                                                    form.setError('email', { type: 'custom', message: 'Invalid email' })
                                                } else if (res.data.error === false) {
                                                    form.clearErrors('email')
                                                }
                                            }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    {/* <Input  placeholder="" {...field} /> */}
                                    <Input autoComplete="off" placeholder="" {...field} value={field.value ?? ""} onChange={field.onChange}
                                        onBlur={async (e) => {
                                            console.log(e.target.value)
                                            if (phone === e.target.value) {
                                                return
                                            }
                                            const res = await checkIfUserNameOrPhoneExists({ phone: e.target.value });
                                            if (res?.error?.status === 409) {
                                                form.setError('phone', { type: 'custom', message: 'This phone number already exists' })
                                            } else if (res?.error?.status === 400) {
                                                form.setError('phone', { type: 'custom', message: 'Phone number must be 10 digits' })
                                            } else if (res.data.error === false) {
                                                form.clearErrors('phone')
                                            }
                                        }} name={field.name} ref={field.ref} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-x-4">
                    <div className="w-1/2">
                        <FormField
                            control={form.control}
                            name="membershipFee"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fee</FormLabel>
                                    <FormControl>
                                        {/* <Input placeholder="" {...field} /> */}
                                        <RupeeInput autoComplete="off" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-1/2">
                        <FormField
                            control={form.control}
                            name="workoutType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Workout Type</FormLabel>
                                    {/* <FormControl>
                                                    <Input autoComplete="off" placeholder="" {...field} />
                                                </FormControl>
                                                <FormMessage /> */}
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {wrokoutTypes.map(w => {
                                                return <><SelectItem value={w.value}>{w.label}</SelectItem> </>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    {/* <Button variant="outline" onClick={() => closeModal()} >Cancel</Button> */}
                    <Button type="submit">Update profile</Button>
                </div>
            </form>
        </Form>
    )
}