import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { DataTableDemo } from "./table/table"
import { useGetCustomersQuery } from "@/features/customer/customer.api"
import AddCustomer from "./customerModals/add.customer"
import UpdatePaymentModal from '../customers/customerModals/update.payment.modal'
import { useDispatch } from "react-redux"
import { logout } from "@/features/auth/user.slice"
import { useDebounce } from "@/hooks/use-debounce"
import { PaginationState } from "@tanstack/react-table"
// import DemoPage from "./customerTable/customer.page"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export const Customer: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('')
  const debounceValue = useDebounce(value, 500)
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 1,
      pageSize: 8,
    })

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  }

  const { data, isLoading, isFetching, error } = useGetCustomersQuery({ type: 'recentlyJoined', page: fetchDataOptions.pageIndex, limit: fetchDataOptions.pageSize, usernameOrPhone: debounceValue });
  
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )
  if (error) {
    if (error.status === 401) {
      dispatch(logout())
    }
  }

  const [paymentModal, togglePaymentModal] = React.useState<any>(false);
  const [paymentModalData, SetPaymentModalData] = React.useState<any>({})


  return <div className="p-4 ">
    <div className="mx-auto container flex justify-between items-center">
      <div className="items-center w-1/3"><Input type="email" placeholder="Search with names" onChange={(event) => setValue(event.target.value)} /></div>
      <AddCustomer />
      {paymentModal && <UpdatePaymentModal payment={paymentModalData} togglePaymentModal={togglePaymentModal} />}
    </div>
    <div className="mx-auto container">
      {isLoading || isFetching ? (
        <div className="flex h-[80vh] w-full justify-center items-center">
          {/* rounded-ful add this later */}
          <div className="animate-spin l h-8 w-8 border-t-4 border-primary border-solid"></div>
        </div>
      ) :
        <DataTableDemo
          paymentModal={paymentModal}
          togglePaymentModal={togglePaymentModal}
          SetPaymentModalData={SetPaymentModalData}
          data={data}
          pagination={pagination}
          handlePagination={setPagination}
        />
      }

    </div>
  </div >
}
