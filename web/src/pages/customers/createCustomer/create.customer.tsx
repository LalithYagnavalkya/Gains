// modules
import React from "react"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";


// schema
const formSchema = z.object({
    username: z.string(),
    email: z.string()
        .email("Not a valid email"),
    phone: z.string().min(10),
    joinedOn: z.string(),
    validUpto: z.string(),
    membershipFee: z.number(),
    workoutType: z.string(),
})

const CreateCustomer: React.FC = () => {
    const [date, setDate] = React.useState<Date>()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'sm'} >Add Customer</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[545px]">
                <DialogHeader>
                    <DialogTitle>Add Dealer</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(() => { })} className="grid gap-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="whats his name?" {...field} />
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
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
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
                                            <Input placeholder="" {...field} />
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
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="workoutType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Workout Type</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                                                            format(parseInt(field.value), "PPP")
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
                                                            format(parseInt(field.value), "PPP")
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
                                            When will the membership end?
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="submit">Confirm</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )

}


export default CreateCustomer;