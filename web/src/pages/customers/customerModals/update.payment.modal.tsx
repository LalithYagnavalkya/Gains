import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Payment = any

interface UpdatePaymentModalProps {
    payment: Payment; // Assuming Payment is a type/interface you have defined
    togglePaymentModal: any,

}
const UpatePaymentModal: React.FC<UpdatePaymentModalProps> = ({ payment,togglePaymentModal }: any) => {

    return <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <Card className="w-[545px]">
            <CardHeader>
                <CardTitle>Add Customer</CardTitle>
                <CardDescription>Fill up your customer details. Click confirm when you're done.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between">
                    <Button variant="outline" onClick={() => togglePaymentModal(false)} >Cancel</Button>
                    <Button type="button">Confirm</Button>
                </div>
            </CardContent>
        </Card>
    </div>
}
export default UpatePaymentModal;