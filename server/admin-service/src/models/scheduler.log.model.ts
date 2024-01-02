import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISchedulerLog extends Document {
    type: string,
    startDate: Date,
    endDate?: Date,
    status: string,
    errorMessage: string,
    errorStack?: Schema.Types.Mixed,
    createdAt: Date,
    updatedAt: Date
}

const schedulerLogSchema = new mongoose.Schema(
    {
        type: {
            type: String, required: true
        },
        startDate: { type: Date, required: true },
        status: { type: String },
        endDate: { type: Date },
        errorStack: {
            type: Schema.Types.Mixed
        },
        errorMessage: {type: String},
        startTime: { type: String, required: true },
        endTime: { type: String },
        timeTaken: { type: String }
    },
    { timestamps: true },
);

const schedulerLog: Model<ISchedulerLog> = mongoose.model<ISchedulerLog>("SchedulerLog", schedulerLogSchema);

export default schedulerLog;

