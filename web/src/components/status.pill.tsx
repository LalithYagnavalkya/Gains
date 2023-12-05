interface StatusPillProps {
    status: string;
}
export const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
    if (status === 'PENDING')
        return <div className="bg-red-pending w-fit px-2 py-0.5 text-pill-text rounded-md ">Pending</div>
    if (status === 'PAID')
        return <div className="bg-green-paid w-fit px-1.5 py-0.5 text-white rounded-md">Paid</div>
}