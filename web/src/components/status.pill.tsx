interface StatusPillProps {
    status: string;
}
export const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
    if (status === 'PENDING')
        return <div className="border-2 border-red-pending w-fit px-2 py-0.5 text-red-pending rounded-md ">Pending</div>
    if (status === 'PAID')
        return <div className=" border-2 border-green-paid w-fit px-1.5 py-0.5 text-green-paid rounded-md">Paid</div>
}