import { Request, Response } from "express";

//models 
import Membership from "../models/membership.model";
import Transaction from "../models/transaction.model";

//schemas

//services

export const updateMembership = async (req: Request, res: Response) => {
try {
    
    const { userId } = req.params;
    const { membershipFee, validUpto } = req.body;
    
    const userMembership = await Membership.findOne({
        userId: userId,
    })

    if(!userMembership){
        return res.status(400).json({error: true, message: 'Invalid user id'})
    }

    const previousValidUpto = new Date(userMembership.validUpto);
    const validUptoDate = new Date(validUpto);
    const diffMonths = (validUptoDate.getFullYear() - previousValidUpto.getFullYear()) * 12 + (validUptoDate.getMonth() - previousValidUpto.getMonth());
    
    userMembership.validUpto  = validUptoDate;
    userMembership.membershipFee = membershipFee;
    userMembership.membershipDuriation = diffMonths;
    
    const transaction = await Transaction.create({
        userId,
        membershipId: userMembership?._id,
        paymentAmount: membershipFee,
        paymentType: 'CASH',
    });
    
    userMembership.lastPaymentDate = transaction.createdAt;
    userMembership.lastPaymentTransactionId = transaction._id;
    userMembership.paymentStatus = 'PAID'
    userMembership.save();
    
    
    return res.status(200).json({error: false, message: 'Payment updated successfully'})
} catch (error) {
    return res.status(500).json({ error: true, message: "Couldn't update the payment" })
}
}