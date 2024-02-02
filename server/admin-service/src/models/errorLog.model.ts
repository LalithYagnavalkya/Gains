import mongoose, { Document, Model, Schema } from "mongoose";

export interface IErrorLog extends Document {
    statusCode?: number;
    message: string;
    route: string;
    method?: string;
    requestBody?: Schema.Types.Mixed,
    errorStack?: Schema.Types.Mixed
}


const errorLogSchema = new Schema({
    statusCode: {
        type: Number
    },
    message: {
        type: Schema.Types.Mixed,
        required: [true, 'A message is required to log the errors']
    },
    route: {
        type: String
    },
    method: {
        type: String
    },
    errorStack: {
        type: Schema.Types.Mixed
    }
},
    {
        timestamps: true
    });

const errorLog: Model<IErrorLog> = mongoose.model<IErrorLog>("ErrorLog", errorLogSchema);

export default errorLog;