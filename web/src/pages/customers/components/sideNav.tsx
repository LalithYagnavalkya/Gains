"use client"


import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        title: string
    }[],
    setCurrentPage?: (arg: string) => void
}

export function SidebarNav({ className, items, setCurrentPage, ...props }: SidebarNavProps) {
    const pathname = ''

    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <div
                    key={item.title}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        // pathname === item.href
                        //     ? "bg-muted hover:bg-muted"
                        //     : "hover:bg-transparent hover:underline",
                        "justify-start",
                        "cursor-pointer"
                    )}
                    // onClick={() => setCurrentPage(item.title)}
                >
                    {item.title}
                </div>
            ))}
        </nav>
    )
}