import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCustomerDetailsQuery } from "@/features/customer/customer.api";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/user.slice";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { StatusPill } from "@/components/status.pill";
import { Button } from "@/components/ui/button";
import UpdatePaymentModal from '../customerModals/update.payment.modal'
import { ProfileForm } from "./profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarNav } from "../components/sideNav";

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

    let paymentModalData = {
        _id: "",
        username: 'data.username',
        membershipFee: 0,
        validUpto: '',
        paymentStatus: ''
    };
    let userModal = {
        customerId: "",
        username: '',
        membershipFee: '',
        validUpto: '',
        paymentStatus: '',
        phone: '',
        email: '',
        workoutType: [''],
        joinedOn: '',
    }
    const [paymentModal, togglePaymentModal] = React.useState<any>(false);

    if (!isLoading && !isFetching && data) {
        paymentModalData = {
            _id: String(data._id),
            username: data.username,
            membershipFee: data.membershipDetails?.membershipFee,
            validUpto: data.membershipDetails?.validUpto,
            paymentStatus: data.membershipDetails?.paymentStatus,
        }
        userModal = {
            customerId: String(data._id),
            username: data.username,
            membershipFee: data.membershipDetails?.membershipFee,
            validUpto: data.membershipDetails?.validUpto,
            paymentStatus: data.membershipDetails?.paymentStatus,
            phone: data.phone,
            email: data.email,
            workoutType: data.workoutType,
            joinedOn: data.joinedOn,
        }
    }

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


        <div className="hidden w-full p-8 md:block container mx-auto pt-4 space-y-4">
            <div className="flex justify-between gap-x-4">
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 w-1/4">
                    <aside className="lg:w-1/2 min-w-full"> {/* Adjust the width or min-width as needed */}
                        <SidebarNav items={sidebarNavItems} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    </aside>
                    {/* The rest of your content... */}
                </div>
                {/* Userpage */}
                {currentPage === sidebarNavItems[0].title && <>
                    {!isLoading && !isFetching && <>
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle className="">
                                    <div className="flex justify-between">
                                        <div className="flex-col items-center justify-between space-y-2">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-3xl font-bold tracking-tight capitalize">
                                                    {data?.username ? data.username : <Skeleton className="h-12 w-[150px]" />}
                                                </h2>
                                                {/* <h2 className="text-2xl font-light tracking-tight capitalize">Details</h2> */}
                                            </div>

                                        </div>
                                        <div className="flex justify-center items-center">
                                            {isLoading || isFetching ? <Skeleton className="h-12 w-[150px]" /> :
                                                <StatusPill status={data?.membershipDetails.paymentStatus} />
                                            }
                                        </div>
                                    </div>
                                </CardTitle>
                                <CardDescription>Edit and update your cutomer details</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ProfileForm {...userModal} />
                            </CardContent>
                        </Card>
                    </>}
                </>
                }
                {currentPage === sidebarNavItems[1].title && <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="">
                            <div className="flex justify-between">
                                <div className="flex-col items-center justify-between space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-3xl font-bold tracking-tight capitalize">
                                            Comming Soon
                                        </h2>
                                        {/* <h2 className="text-2xl font-light tracking-tight capitalize">Details</h2> */}
                                    </div>

                                </div>
                                <div className="flex justify-center items-center">
                                    {/* {isLoading || isFetching ? <Skeleton className="h-12 w-[150px]" /> :
                                        <StatusPill status={data?.membershipDetails.paymentStatus} />
                                    } */}
                                </div>
                            </div>
                        </CardTitle>
                        <CardDescription>Will be able to track cutomers mesurments every month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* <ProfileForm {...userModal} /> */}
                    </CardContent>
                </Card>}
                {currentPage === sidebarNavItems[2].title && <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="">
                            <div className="flex justify-between">
                                <div className="flex-col items-center justify-between space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-3xl font-bold tracking-tight capitalize">
                                            Comming Soon
                                        </h2>
                                        {/* <h2 className="text-2xl font-light tracking-tight capitalize">Details</h2> */}
                                    </div>

                                </div>
                                <div className="flex justify-center items-center">
                                    {/* {isLoading || isFetching ? <Skeleton className="h-12 w-[150px]" /> :
                                        <StatusPill status={data?.membershipDetails.paymentStatus} />
                                    } */}
                                </div>
                            </div>
                        </CardTitle>
                        <CardDescription>Can track customers payment history</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* <ProfileForm {...userModal} /> */}
                    </CardContent>
                </Card>}
            </div>

        </div>


    </>
}


{/* <div className="pt-4">
                        <Button
                            variant={"outline"}
                            onClick={() => { togglePaymentModal(true) }}
                        >
                            Update Payment
                        </Button>
                        {!isLoading && !isFetching && paymentModal && <UpdatePaymentModal payment={paymentModalData} togglePaymentModal={togglePaymentModal} />}
                    </div> */}