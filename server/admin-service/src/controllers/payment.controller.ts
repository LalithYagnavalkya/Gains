import { Request, Response } from "express";

//models 
import Membership from "../models/membership.model";
import Transaction from "../models/transaction.model";

//schemas

//services

export const updateMembership = async (req: Request, res: Response) => {

    const { userId } = req.params;
    const { paymentAmount, validUpto } = req.body;

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
    userMembership.membershipFee = paymentAmount;
    userMembership.membershipDuriation = diffMonths;

    const transaction = await Transaction.create({
        userId,
        membershipId: userMembership?._id,
        paymentAmount,
        paymentType: 'CASH',
    });

    userMembership.lastPaymentDate = transaction.createdAt;
    userMembership.lastPaymentTransactionId = transaction._id;


    return res.status(200)
}