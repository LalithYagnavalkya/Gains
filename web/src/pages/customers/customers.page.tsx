import { Input } from "@/components/ui/input"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableDemo } from "./table/table"
import { useGetCustomersQuery } from "@/features/customer/customer.slice"
import { DataTableFacetedFilter } from "./components/status.filter"
import CreateCustomer from "./createCustomer/create.customer"
// import DemoPage from "./customerTable/customer.page"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export const Customer = () => {
  const { data: users, isLoading,
    isSuccess,
    isError,
    error } = useGetCustomersQuery({ type: 'recentlyJoined', page: 1, limit: 5 });

  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const [query, setQuery] = React.useState({
    query: "",
    status: [],
    type: "",
  })
  console.log(users)

  return <div className="p-4 ">
    <div className="mx-auto container flex justify-between items-center">
      <div className="items-center w-1/3"><Input type="email" placeholder="Search with names" /></div>
      {/* <div className="items-start w-1/2">
        <DataTableFacetedFilter
        title="status"
          options={[
            {
              label: 'Pending',
              value: 'PENDING'
            },
            {
              label: 'Paid',
              value: 'PAID'
            },
            {
              label: 'Upcoming',
              value: 'UPCOMING'
            },
          ]}
        /></div> */}
      {/* <div> <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8 lg:flex"
          >
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="sm">
          <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu></div> */}
      <CreateCustomer />
    </div>
    <div className="mx-auto container">
      {isLoading ? "loading" :
        <DataTableDemo users={users} />
      }

    </div>
  </div >
}
