import { format } from 'date-fns'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { StatusPill } from '@/components/status.pill'
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}


export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "username",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("username")}</div>
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => {
            return (

                <>Phone</>


            )
        },
        cell: ({ row }) => <div className="lowercase text-left">{row.getValue("phone")}</div>,
    },
    {
        accessorKey: "paymentStatus",
        header: "Status",
        cell: ({ row }) => <div className="">
            <StatusPill status={row.getValue("paymentStatus")} />
        </div>,
    },
    {
        accessorKey: "validUpto",
        header: "Due Date",
        cell: ({ row }) => <div className="">{format(new Date(row.getValue("validUpto")), 'MMM dd yyy')}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actiosns</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
