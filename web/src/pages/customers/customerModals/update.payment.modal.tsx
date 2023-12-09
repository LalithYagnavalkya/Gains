import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { RupeeInput } from "@/components/ui/rupeeInput";
import { useUpdateMembershipMutation } from "@/features/customer/customer.api";
import { CalendarIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Toggle } from "@/components/ui/toggle";
import { StatusPill } from '@/components/status.pill'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Payment = any

interface UpdatePaymentModalProps {
    payment: Payment; // Assuming Payment is a type/interface you have defined
    togglePaymentModal: any,

}

const formSchema = z.object({
    membershipFee: z.string(),
    validUpto: z.date(),
})
const UpatePaymentModal: React.FC<UpdatePaymentModalProps> = ({ payment, togglePaymentModal }: any) => {

    const [updateMembership, { isLoading, isError, isSuccess }] = useUpdateMembershipMutation();
    const [isAmountDisabled, toggleAmount] = React.useState<boolean>(true);
    const [validUptoDate, setValidUptoDate] = React.useState<Date>(new Date(payment.validUpto));
    const { toast } = useToast()


    let { membershipFee } = payment;
    membershipFee = String(membershipFee)
    // Remove any non-digit characters from the input (e.g., commas)
    const sanitizedValue = membershipFee.replace(/[^0-9]/g, '');
    // Format the number with commas
    const defaultMembershipFee = sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            membershipFee: defaultMembershipFee,
            validUpto: new Date(payment.validUpto),
        },
    })

    const closeModal = () => togglePaymentModal(false);

    const addMonthsInValidUptoField = (value: number) => {
        const currentDate = form.getValues('validUpto') || new Date()
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + value);
        console.log(newDate)
        setValidUptoDate(newDate)
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!isLoading) {

            // convert membership fee from string (1,200) to number 1200
            let memberShipFeeInNumber: number = parseFloat(values.membershipFee.replace(/,/g, ''));


            const result = await updateMembership({
                ...values, _id: payment._id,
                validUpto: validUptoDate,
                membershipFee: memberShipFeeInNumber,
            })
            if (result.data.error === false) {
                toast({
                    description: "Payment updated",
                })
                closeModal()
            }
        }
    }

    console.log(payment)

    return <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <Card className="w-[545px]">
            <CardHeader>
                <div className="flex  justify-between">
                    <CardTitle className="h-auto">
                        <div className="capitalize">{payment.username}</div>
                    </CardTitle>
                    <StatusPill status={payment.paymentStatus} />
                </div>
                <CardDescription>Extend Due date or update payment status.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                        <FormField
                            control={form.control}
                            name="membershipFee"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-2">
                                            <div className="w-full">
                                                <RupeeInput disabled={isAmountDisabled} autoComplete="off" placeholder="whats his/her name?" {...field} />
                                            </div>
                                            <Toggle variant="outline" aria-label="Toggle italic" onClick={() => toggleAmount(!isAmountDisabled)}>
                                                <Pencil1Icon className="h-4 w-4" />
                                            </Toggle>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="validUpto"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Membership ends on</FormLabel>
                                    <div className="flex gap-x-1">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
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
                                                            field.value = validUptoDate
                                                        }
                                                        console.log(x)
                                                    }}
                                                    // disabled={(date) =>
                                                    //     date < new Date(new Date().setMonth(new Date().getMonth() + 1))
                                                    // }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline">
                                                    <div className="flex gap-2 items-center">
                                                        <p className="font-normal">Extend</p>
                                                        <div className="h-4 w-4 flex items-center">
                                                            <ChevronDown />
                                                        </div>
                                                    </div>
                                                </Button>
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
                        <div className="flex justify-between">
                            <Button variant="outline" onClick={closeModal} >Cancel</Button>
                            <Button type="submit" className=" hover:bg-green-paid hover:text-white">Update Payment</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
}
export default UpatePaymentModal;