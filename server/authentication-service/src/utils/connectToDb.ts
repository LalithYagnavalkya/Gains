import mongoose from 'mongoose'
import { config } from 'dotenv';
config({
    path: './src/config/config.env'
})
const dbString: string = process.env.MONGO_CONNECTION_STRING;
const connectToDb = async () => {
    try {
        await mongoose.connect(dbString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        return Promise.resolve();
    } catch (error:any) {
        console.error('Error connecting to the database:', error.message);
        return Promise.reject();
    }
};

export default connectToDb;


