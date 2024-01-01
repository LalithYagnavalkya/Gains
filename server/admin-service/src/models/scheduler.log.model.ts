import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISchedulerLog extends Document {
    type: string,
    startDate: Date,
    endDate?: Date,
    status: string,
    error?: Schema.Types.Mixed,
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
        error: {
            type: Schema.Types.Mixed
        },
        startTime: { type: String, required: true },
        endTime: { type: String },
        timeTaken: { type: String }
    },
    { timestamps: true },
);

const schedulerLog: Model<ISchedulerLog> = mongoose.model<ISchedulerLog>("SchedulerLog", schedulerLogSchema);

export default schedulerLog;

