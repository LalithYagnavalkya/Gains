import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import Navbar from "./navbar";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const aboutPoints = [
    { heading: 'Seamless Member Management', description: 'Add, edit, and track members effortlessly' },
    { heading: 'Real-Time Reporting', description: ' Gain valuable insights into gym usage and member performance' },
    { heading: 'Customizable Dashboards', description: 'Stay on top of key metrics with personalized dashboards' }
]

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

const Landing: React.FC = () => {
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
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        fetch("https://formspree.io/f/xayreojw", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response =>{  console.log(response); return response.json()})
            .then(data => {
                toast({
                    description: "🎉 Hurray!, new Customer!!",
                })
                form.reset();
            })
            .catch(error => {
                toast({
                    title: "Oops! Something went wrong! 👀",
                })
            });
    }
    return <>
        <div className="md:hidden">
            <img
                src="/examples/dashboard-light.png"
                width={1280}
                height={866}
                alt="Dashboard"
                className="block dark:hidden"
            />
            <img
                src="/examples/dashboard-dark.png"
                width={1280}
                height={866}
                alt="Dashboard"
                className="hidden dark:block"
            />
        </div>
        <div className="hidden flex-col md:flex w-[100%]">
            <Navbar />
            <div className="flex-1 mx-auto pt-4">
                <div className="container h-[85vh] flex justify-between items-center">
                    <div className="w-[40%] flex flex-col space-y-4">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-[#D8E9A8] leading-tight">Organize your customers in a simple way</h1>
                        <p className="text-base text-[#D8E9A8] text-opacity-95"> Our solution automates routine tasks, allowing you to focus on growing your business rather than getting bogged down by administrative work.</p>
                        <div className="pt-4">
                            <Button className="bg-[#4E9F3D]">Join Now</Button>
                        </div>
                    </div>
                    <><img src="/dashboard-img.svg" alt="" /></>
                </div>
                {/* About */}
                <div className="container flex flex-col justify-between items-start">
                    <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Why Gains?</h2>
                    <p className="text-xl text-muted-foreground mt-6">
                        Gains is a cutting-edge gym management solution designed to streamline and enhance the way you handle your fitness center. Whether you run a small boutique gym or a large fitness facility,
                        our platform is tailored to meet your needs.
                    </p>
                    <div className="flex pt-6 justify-between">
                        <div className="flex flex-col w-[40%] gap-y-2">
                            <span className="scroll-m-20 text-xl font-semibold tracking-tight">
                                Saves Time and Resources
                            </span>
                            <span className="text-xl text-muted-foreground">
                                Our solution automates routine tasks, allowing you to focus on growing your business rather than getting bogged down by administrative work.
                            </span>
                        </div>
                        <div className="flex flex-col w-[40%] gap-y-2">
                            <span className="scroll-m-20 text-xl font-semibold tracking-tight">
                                Flexible and Scalable
                            </span>
                            <span className="text-xl text-muted-foreground">
                                Whether you're a startup or an established gym, Gains scales with your business, adapting to your evolving needs.
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col w-[40%] gap-y-2 self-center pt-6">
                        <span className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Enhanced Customer Experience:
                        </span>
                        <span className="text-xl text-muted-foreground">
                            Whether you're a startup or an established gym, Gains scales with your business, adapting to your evolving needs.
                        </span>
                    </div>
                </div>
                <div className=" pt-8 container flex flex-col justify-center items-center text-center text-[#09090B]">
                    <>
                        {/* <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-[#D8E9A8]">
                            Customer Managment Web Application
                        </h2> */}
                        <div className="w-[50%]">
                            <p className="leading-7 font-normal [&:not(:first-child)]:mt-6">
                                Gains is a cutting-edge gym management solution designed to streamline and enhance the way you handle your fitness center. Whether you run a small boutique gym or a large fitness facility,
                                our platform is tailored to meet your needs.
                            </p>
                        </div>
                        <div className="flex justify-center items-center pt-4 w-[50%]">
                            <Carousel>
                                <CarouselContent>
                                    {aboutPoints.map(item => {
                                        return <CarouselItem className="md:basis-1/2">
                                            <Card className="">
                                                <CardContent className="flex flex-col aspect-square items-center justify-center p-6 space-y-4">
                                                    <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0 text-[#D8E9A8]">{item.heading}</h2>
                                                    <p className="text-xl text-muted-foreground">{item.description}</p>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    })}



                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </>

                </div>
                <div>
                </div>
                {/* Contact */}
                <div className="flex flex-col justify-center items-center mt-32 gap-y-6">
                    <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0" >Meet the Team</h1>

                    <Avatar className="w-[250px] h-[250px]">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/69410566?s=400&u=7a08115bd489482690d00e33c4d494c6faffdede&v=4" alt="@LalithYagnavalkya" />
                        <AvatarFallback>LT</AvatarFallback>
                    </Avatar>

                    <>
                        <h2 className="text-xl text-muted-foreground">Lalith Yagnavalkya Tirunagari</h2>
                        <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold mt-[-1.1rem]">Founder</span>
                        <div className="flex justify-between items-center gap-x-5">
                            <a target="_blank" href='https://github.com/LalithYagnavalkya'>
                                <img className="h-[26px] hover:cursor-pointer" src="/github-mark-white.svg" alt="sdaf" />
                            </a>
                            <a target="_blank" href='https://www.linkedin.com/in/lalithyagnavalkya/'>
                                <img src="/In-White-26.png" className="hover:cursor-pointer" alt="sdaf" />
                            </a>
                        </div>
                    </>
                </div>

                <div className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-8">Get in touch</div>

                <div className="mt-8 pb-28">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex justify-between items-center gap-x-4">
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

            </div>
        </div>
    </>
}

export default Landing;