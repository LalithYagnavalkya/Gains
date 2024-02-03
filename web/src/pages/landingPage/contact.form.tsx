import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    phone: z.string().nullable().refine(data => data === null || data.length === 10, {
        message: "Phone number must be at least 10 characters long when provided",
    }),
    email: z.string()
        .email("Not a valid email"),
    message: z.string().optional()
})
const ContactForm: React.FC = () => {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            phone: "",
            email: "",
            message: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        fetch("https://formspree.io/f/xayreojw", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => { return response.json() })
            .then(data => {
                toast({
                    description: "Message sent ✅",
                })
                form.reset();
            })
            .catch(error => {
                toast({
                    title: "Oops! Something went wrong! 👀",
                })
            });
    }
    return <div className="mt-8 pb-28 container">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* flex justify-between items-center gap-x-4 */}
                <div className="flex-col justify-between items-center gap-x-4 space-y-4 lg:flex lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} value={field.value ?? ""} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Please ask any questions you may have about Gains"  {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Send Message</Button>
            </form>
        </Form>
    </div>
}

export default ContactForm;