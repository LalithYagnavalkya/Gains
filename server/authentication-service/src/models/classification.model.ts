import mongoose, { Document, Model } from "mongoose";

export interface IClassification extends Document {
    type: string, 
    key: string;
    value: string;
    label?: string;
    order?: number;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const classificationModel = new mongoose.Schema(
    {
        type: { type: String },
        key: { type: String },
        value: { type: String },
        label: { type: String },
        order: { type: Number },
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true },
);

const Classification: Model<IClassification> = mongoose.model<IClassification>("classification", classificationModel);

export default Classification;
