"use client"


import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        title: string
    }[],
    setCurrentPage?: (arg: string) => void
    currentPage: string
}

export function SidebarNav({ className, items, setCurrentPage, currentPage, }: SidebarNavProps) {
    return (
        <nav
            className={cn(
                "flex space-x-2 md:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
        >
            {items.map((item) => (
                <div
                    key={item.title}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        currentPage === item.title
                            ? "bg-muted hover:bg-muted"
                            : "",
                        "justify-start",
                        "cursor-pointer"
                    )}
                    onClick={() => {
                        (setCurrentPage || (() => { }))(item.title)
                    }}
                >
                    {item.title}
                </div>
            ))}
        </nav>
    )
}