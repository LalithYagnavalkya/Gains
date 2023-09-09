import mongoose, { Document, Model } from "mongoose";

export interface IBodyMetrics extends Document {
    userId: mongoose.Types.ObjectId;
    date: Date;
    weight?: number;
    height?: number;
    chest?: number;
    bicep?: number;
    forearms?: number;
    thighs?: number;
    calfs?: number;
    glutes?: number;
}

const bodyMetricSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        date: { type: Date, required: true },
        height: { type: Number },
        weight: { type: Number },
        chest: {type: Number},
        bicep: {type: Number},
        forearms : {type: Number},
        thighs: {type: Number},
        calfs: {type: Number},
        glutes : {type: Number},

    },
    { timestamps: true },
);

const BodyMetrics: Model<IBodyMetrics> = mongoose.model<IBodyMetrics>("user", bodyMetricSchema);

export default BodyMetrics;
