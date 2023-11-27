import React, { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { DataTableDemo } from "./table/table"
import { useGetCustomersQuery } from "@/features/customer/customer.api"
import AddCustomer from "./customerModals/add.customer"
import UpdatePaymentModal from '../customers/customerModals/update.payment.modal'
import { useDispatch } from "react-redux"
import { logout } from "@/features/auth/user.slice"
// import DemoPage from "./customerTable/customer.page"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export const Customer: React.FC = () => {
  const dispatch = useDispatch();

  const { isLoading, error } = useGetCustomersQuery({ type: 'recentlyJoined', page: 1, limit: 8 });
  if (error) {
    if (error.status === 401) {
      dispatch(logout())
    }
  }

  const [paymentModal, togglePaymentModal] = React.useState<any>(false);
  const [paymentModalData, SetPaymentModalData] = React.useState<any>({})



  return <div className="p-4 ">
    <div className="mx-auto container flex justify-between items-center">
      <div className="items-center w-1/3"><Input type="email" placeholder="Search with names" /></div>
      <AddCustomer />
      {paymentModal && <UpdatePaymentModal payment={paymentModalData} togglePaymentModal={togglePaymentModal} />}
    </div>
    <div className="mx-auto container">
      {isLoading ? "loading" :
        <DataTableDemo paymentModal={paymentModal} togglePaymentModal={togglePaymentModal} SetPaymentModalData={SetPaymentModalData} />
      }

    </div>
  </div >
}
