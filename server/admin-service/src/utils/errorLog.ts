import ErrorLog from '../models/errorLog.model'

const logErrorInDB = async (message: string, error: Error) => {
    await ErrorLog.create({
        message,
        errorStack: error?.stack
    })
}

export default logErrorInDB;