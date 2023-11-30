import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { RupeeInput } from "@/components/ui/rupeeInput";

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
            validUpto: new Date(),
        },
    })

    const closeModal = () => togglePaymentModal(false);

    const onSubmit = () => {

    }

    return <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <Card className="w-[545px]">
            <CardHeader>
                <CardTitle><div className="capitalize">{payment.username}</div></CardTitle>
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
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <RupeeInput autoComplete="off" placeholder="whats his/her name?" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between">
                            <Button variant="outline" onClick={closeModal} >Cancel</Button>
                            <Button type="button">Confirm</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
}
export default UpatePaymentModal;