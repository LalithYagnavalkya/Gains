import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import { SidebarNav } from "../components/sideNav";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { AvatarIcon } from "@radix-ui/react-icons";
import { useGetCustomerDetailsQuery } from "@/features/customer/customer.api";
const sidebarNavItems = [
    {
        title: "Profile",
    },
    {
        title: "Body Metrics",
    },
    {
        title: "Payments",
    },

]
export default function SingleCustomerPage() {
    const { customerId } = useParams();
    const {data} = useGetCustomerDetailsQuery({id: customerId})
    const [currentPage, setCurrentPage] = useState('Profile')
    
    console.log(data)
    return <div className="mx-auto container">

        {/* hero section */}
        <div className="bg-slate-900 py-4">
            <AvatarIcon className="h-[60px] w-[60px]" />
            
                {/* <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar> */}
        </div>
        {/* <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs> */}
    </div>
    // return (
    //     <div className="space-y-6">
    //         <div>
    //             <h3 className="text-lg font-medium">Profile</h3>
    //             <p className="text-sm text-muted-foreground">
    //                 This is how others will see you on the site.
    //             </p>
    //         </div>
    //         <Separator />
    //         <ProfileForm />
    //     </div>
    // )
}