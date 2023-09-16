import mongoose, { Document, Model } from "mongoose";

export interface IPartner extends Document {
    partnerId: number;
    name: string;
    logo?: string;
    isActive?: boolean;
}
const partnerSchema = new mongoose.Schema(
    {
        partnerId: { type: Number, required: true, unique: true },
        name: { type: String, required: true },
        logo: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
);

const Partner: Model<IPartner> = mongoose.model<IPartner>("partner", partnerSchema);

export default Partner;