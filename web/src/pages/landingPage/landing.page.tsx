import Navbar from "./navbar";

const Landing: React.FC = () => {
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
        <div className="hidden flex-col md:flex">
            <Navbar />
            <div className="flex-1 container mx-auto pt-4">
                <div className="h-[83vh] flex justify-between items-center">
                    <div className="w-[40%]">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-[#D8E9A8] leading-tight">Organize your customers in a simple way</h1>
                    </div>
                    <><img src="/dashboard-img.svg" alt="" /></>
                </div>
                <div>
                    about section
                </div>
                <div>
                    contact section
                </div>
            </div>
        </div>
    </>
}

export default Landing;