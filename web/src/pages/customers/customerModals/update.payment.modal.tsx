import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useDispatch } from "react-redux";

type Payment = any

interface UpdatePaymentModalProps {
    payment: Payment; // Assuming Payment is a type/interface you have defined
}
const UpatePaymentModal: React.FC<UpdatePaymentModalProps> = ({ payment }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState<Boolean>(false);
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        // form.reset();
        setModalOpen(false);
    };
    return <div onClick={openModal}>
        Update Payment
        {isModalOpen && (<div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <Card className="w-[545px]">
                <CardHeader>
                    <CardTitle>Add Customer</CardTitle>
                    <CardDescription>Fill up your customer details. Click confirm when you're done.</CardDescription>
                </CardHeader>
                <CardContent>
                   
                </CardContent>
            </Card>
        </div>)}
    </div>
}
export default UpatePaymentModal;