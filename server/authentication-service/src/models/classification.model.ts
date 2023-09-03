import mongoose, { Document, Model } from "mongoose";

export interface IClassification extends Document {
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
        key: { type: String },
        value: {type: String},
        label: {type: String},
        order: {type: Number},
        isActive: {type: Boolean}
    },
    { timestamps: true },
);

const Classification: Model<IClassification> = mongoose.model<IClassification>("classificationModel", classificationModel);

export default Classification;
