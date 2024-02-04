import { Link, animateScroll as scroll } from 'react-scroll';

import { Button } from "@/components/ui/button";
import Navbar from "./navbar";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ContactForm from "./contact.form";
import InsideLook from "./inside.look";

const aboutPoints = [
    { heading: 'Seamless Member Management', description: 'Add, edit, and track members effortlessly' },
    { heading: 'Real-Time Reporting', description: ' Gain valuable insights into gym usage and member performance' },
    { heading: 'Customizable Dashboards', description: 'Stay on top of key metrics with personalized dashboards' }
]

const Landing: React.FC = () => {
    
    return <>
        <div className="flex-col md:flex w-[100%]">
            <Navbar />
            <div className="flex-1 mx-auto pt-4">
                <div className="container flex-col justify-center items-center md:pt-10 md:flex lg:flex-row lg:h-[85vh] lg:justify-between lg:pt-0">
                    <div className="pt-10 flex flex-col space-y-4 md:w-[80%] lg:w-[40%] lg:pt-0">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-[#D8E9A8] leading-tight">Organize your customers in a simple way</h1>
                        <p className="text-base text-[#D8E9A8] text-opacity-95"> Our solution automates routine tasks, allowing you to focus on growing your business rather than getting bogged down by administrative work.</p>
                        <div className="pt-4">
                            <Link to="contact-form" smooth={true} duration={500}>
                                <Button className="bg-[#4E9F3D]">Join Now</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="pt-10 lg:pt-0"><img src="/dashboard-img.svg" alt="" /></div>
                </div>
                {/* About */}
                <div className="container pt-10 flex flex-col justify-between items-start md:w-[90%] md:pt-10 lg:pt-0">
                    <h2 id='why-gains' className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Why Gains?</h2>
                    <p className="text-xl text-muted-foreground mt-6">
                        Gains is a cutting-edge gym management solution designed to streamline and enhance the way you handle your fitness center. Whether you run a small boutique gym or a large fitness facility,
                        our platform is tailored to meet your needs.
                    </p>
                    <div className="flex-col pt-6 justify-between lg:flex lg:flex-row">
                        <div className="flex flex-col w-[100%] gap-y-2 lg:w-[40%]">
                            <span className="scroll-m-20 text-xl font-semibold tracking-tight">
                                Saves Time and Resources
                            </span>
                            <span className="text-xl text-muted-foreground">
                                Our solution automates routine tasks, allowing you to focus on growing your business rather than getting bogged down by administrative work.
                            </span>
                        </div>
                        <div className="flex flex-col w-[100%] gap-y-2  pt-6 lg:w-[40%] lg:pt-0">
                            <span className="scroll-m-20 text-xl font-semibold tracking-tight">
                                Flexible and Scalable
                            </span>
                            <span className="text-xl text-muted-foreground">
                                Whether you're a startup or an established gym, Gains scales with your business, adapting to your evolving needs.
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col w-[100%] gap-y-2 self-center pt-6 lg:w-[40%] lg:pt-0">
                        <span className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Enhanced Customer Experience:
                        </span>
                        <span className="text-xl text-muted-foreground">
                            Whether you're a startup or an established gym, Gains scales with your business, adapting to your evolving needs.
                        </span>
                    </div>
                </div>
                <div className="hidden pt-8 container md:flex flex-col justify-center items-center text-center text-[#09090B]">
                    <>
                        <div className="flex justify-center items-center pt-4 w-[50%]">
                            <Carousel
                                plugins={[
                                    Autoplay({
                                        delay: 2000,
                                    }),
                                ]}>
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
                <InsideLook />
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

                <div id="contact-form" className="container scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-8">Get in touch</div>

                <ContactForm />
            </div>
        </div>
    </>
}

export default Landing;