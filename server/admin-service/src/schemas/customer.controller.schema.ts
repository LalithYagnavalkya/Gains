import { Document, Schema } from "mongoose";
import { IUser } from "../models/user.model";
import { IMembership } from "../models/membership.model";

// in future look at how to extend both classes at once
// here we are extending User and Membership
export interface IUserInfo extends IUser {
    userId?: Schema.Types.ObjectId;
    lastPaymentTransactionId?: Schema.Types.ObjectId;
    paymentStatus?: String,
    membershipFee?: number,
    membershipDuriation?: number,
    validUpto?: Date,
} 
