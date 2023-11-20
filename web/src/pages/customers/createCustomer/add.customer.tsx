import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { format } from "date-fns"

import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, PlusIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { RupeeInput } from "@/components/ui/rupeeInput";
import { useAddCustomerMutation, useCheckIfUserNameOrPhoneExistsMutation, useGetCustomersQuery } from "@/features/customer/customer.slice";
import { useToast } from "@/components/ui/use-toast";
import { logout } from "@/features/auth/user.slice";
import { useDispatch } from "react-redux";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// schema
const formSchema = z.object({
    username: z.string().nonempty("Username is required."),
    email: z.string()
        .email("Not a valid email"),
    phone: z.string().nullable().refine(data => data === null || data.length === 10, {
        message: "Phone number must be at least 10 characters long when provided",
    }),
    joinedOn: z.date({
        required_error: "Joined Date is required.",
    }),
    validUpto: z.date({
        required_error: "Valid upto date is required.",
    }),
    membershipFee: z.string(),
    workoutType: z.string().optional(),
})

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

const AddCustomer: React.FC = () => {
    const [addNewCustomer, { isLoading, isError, isSuccess }] = useAddCustomerMutation()
    const [checkIfUserNameOrPhoneExists] = useCheckIfUserNameOrPhoneExistsMutation();
    const { data: users, refetch } = useGetCustomersQuery({ type: 'recentlyJoined', page: 1, limit: 10 });
    const { toast } = useToast()
    const dispatch = useDispatch();

    const [isModalOpen, setModalOpen] = useState<Boolean>(false);
    const [validUptoDate, setValidUptoDate] = useState<Date>(new Date());

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            phone: '',
            joinedOn: new Date(),
            workoutType: 'Cardio'

        },
    })

    const addMonthsInValidUptoField = (value: number) => {
        const currentDate = form.getValues('validUpto') || new Date()
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + value);
        console.log(newDate)
        setValidUptoDate(newDate)
        console.log(form.getValues('validUpto'))
    }

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!isLoading) {
            // convert membership fee from string (1,200) to number 1200
            let memberShipFeeInNumber: number = parseFloat(values.membershipFee.replace(/,/g, ''));

            // converting workouttypes to array
            let workoutTypes: string[] = values.workoutType?.split('+').map(v => v.trim()) || []


            const result = await addNewCustomer({
                ...values, membershipFee: memberShipFeeInNumber, workoutType: workoutTypes
            })
            // console.log(values)
            if (result.status === 401) {
                dispatch(logout())
            }
            if (isSuccess) {
                refetch();
            }
            if (result.error?.data?.error) {
                console.log(result.error.data.message)
                toast({
                    title: "Please Provide new Phone number",
                    description: result.error.data.message,
                })
                return;
            } else {
                closeModal()
            }
        }
    }

    return <>

        <Button size={'sm'} onClick={openModal}>
            Add Customer
        </Button>
        {isModalOpen && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <Card className="w-[545px]">
                    <CardHeader>
                        <CardTitle>Add Customer</CardTitle>
                        <CardDescription>Fill up your customer details. Click confirm when you're done.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input autoComplete="off" placeholder="whats his name?" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                                                                const res = await checkIfUserNameOrPhoneExists({ email: e.target.value });
                                                                if (res?.error?.status === 409) {
                                                                    form.setError('email', { type: 'custom', message: 'This email already exists' })
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
                                                            const res = await checkIfUserNameOrPhoneExists({ phone: e.target.value });
                                                            if (res?.error?.status === 409) {
                                                                form.setError('phone', { type: 'custom', message: 'This phone number already exists' })
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
                                <div className="flex">
                                    <FormField
                                        control={form.control}
                                        name="joinedOn"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Joined On</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[240px] pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date: any) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormDescription>
                                                    Joined on Date is used for payment scheduler.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="validUpto"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Valid Upto</FormLabel>
                                                <div className="flex gap-x-1">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[190px] pl-3 text-left font-normal",
                                                                        !validUptoDate && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {validUptoDate ? (
                                                                        format(validUptoDate, "PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={validUptoDate}
                                                                onSelect={(x: Date | undefined) => {
                                                                    if (x) {
                                                                        setValidUptoDate(new Date(x))
                                                                    }
                                                                    console.log(x)
                                                                }}
                                                                disabled={(date) =>
                                                                    date < new Date(new Date().setMonth(new Date().getMonth() + 1))
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="outline" size={'icon'}><PlusIcon /></Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className="w-56">
                                                            <DropdownMenuGroup>
                                                                <DropdownMenuItem onClick={() => addMonthsInValidUptoField(1)}>
                                                                    <PlusIcon />&nbsp; 1 Month
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => addMonthsInValidUptoField(3)}>
                                                                    <PlusIcon />&nbsp; 3 Month
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => addMonthsInValidUptoField(6)}>
                                                                    <PlusIcon />&nbsp; 6 Month
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => addMonthsInValidUptoField(12)}>
                                                                    <PlusIcon />&nbsp; 1 Year
                                                                </DropdownMenuItem>
                                                            </DropdownMenuGroup>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>

                                                <FormDescription>
                                                    When will the membership end?
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => closeModal()} >Cancel</Button>
                                    <Button type="button" onClick={form.handleSubmit(onSubmit)}>Confirm</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        )}
    </>
}

export default AddCustomer;