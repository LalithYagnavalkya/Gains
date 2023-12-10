import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect } from "react";


export function RecentSales(props: any) {
    const [state, setState] = React.useState([])
    useEffect(() => { setState(props.transactions) }, [props])


    const formatNumber = (num : number) => {
        let temp = String(num)
        // Remove any non-digit characters from the input (e.g., commas)
        const sanitizedValue = temp?.replace(/[^0-9]/g, '');
        // Format the number with commas
        return  sanitizedValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <div className="h-[350px] overflow-y-auto">
            <div className="space-y-8">
                {state.map((t: any) => {
                    return <div key={t._id} className="flex items-center pr-4">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>{(t.userId.username.substring(0, 2)).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{t.userId.username}</p>
                            <p className="text-sm text-muted-foreground">
                                {t.userId.email}
                            </p>
                        </div>
                        <div className="ml-auto font-medium">+₹{formatNumber(t.paymentAmount)}</div>
                    </div>
                })}
                {/* <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Olivia Martin</p>
                    <p className="text-sm text-muted-foreground">
                        olivia.martin@email.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Jackson Lee</p>
                    <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                    <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                    <p className="text-sm text-muted-foreground">
                        isabella.nguyen@email.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$299.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                    <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">William Kim</p>
                    <p className="text-sm text-muted-foreground">will@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$99.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/05.png" alt="Avatar" />
                    <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Sofia Davis</p>
                    <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
            </div> */}
            </div>
        </div>
    )
}