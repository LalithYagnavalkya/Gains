import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCustomerDetailsQuery } from "@/features/customer/customer.api";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/user.slice";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { StatusPill } from "@/components/status.pill";
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
    const dispatch = useDispatch();
    const { data, isLoading, isFetching, error } = useGetCustomerDetailsQuery({ id: customerId })
    const [currentPage, setCurrentPage] = useState('Profile')
    console.log(data)
    if (error) {
        if (error.status === 401) {
            dispatch(logout())
        }
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
        <div className=" space-y-4 p-8 pt-6">
            <div className="flex justify-between ">
                <div className="flex-col items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight capitalize">
                            {data?.username ? data.username : <Skeleton className="h-12 w-[150px]" />}
                        </h2>
                    </div>
                    <div>
                        {isLoading || isFetching ? <Skeleton className="h-12 w-[150px]" /> :
                            <>
                                <div className="tracking-tight font-light">{data?.membershipDetails?.lastPaymentDate ? format(new Date(data.membershipDetails.lastPaymentDate), 'mmmm dd yyy') : format(new Date(data?.joinedOn), 'MMMM do yyy')}</div>
                                <div className="text-left text-sm font-bold text-muted-foreground leading-none">{data?.membershipDetails?.lastPaymentDate ? "Last Paid" : "Joined On"} </div>
                            </>
                        }
                    </div>
                </div>
                <div className="">
                    {isLoading || isFetching ? <Skeleton className="h-12 w-[150px]" /> :
                        <StatusPill status={data?.membershipDetails.paymentStatus} />
                    }
                </div>
            </div>
            <div>
                
            </div>
        </div>
    </>
}