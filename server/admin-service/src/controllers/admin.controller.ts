import { Request, Response } from "express";
import fs from 'fs'
import csv from 'csv-parser'
import log from "../utils/logger";

// models

// schemas

// services
import { insertIntoDB } from "../services/admin.service";

export const uploadCustomers = async (req: Request, res: Response) => {
    try {
        let users: any = [];
        if (String(req?.file?.path)) {

            fs.createReadStream(String(req?.file?.path))
                .pipe(csv({}))
                .on('data', (data: any) => users.push(data))
                .on('end', async () => {
                    // log.info(users)
                    console.log(users)
                    await insertIntoDB(users, req, res)

                })

        } else {
            log.error('Error in upload Customers')
            return res.status(500).json({ error: true, message: "Something went wrong in findEMailsInDb" })
        }

    } catch (error: any) {
        log.error('Error in upload Customers')
        return res.status(500).json({ error: true, message: "Something went wrong in findEMailsInDb" })
    }
}  

export const addCustomer = async (req: Request, res: Response) => {
    
}

export const editCustomer = async (req: Request, res: Response) => {

    // add or edit
    // email
    // phone
    // workouttype
    // joinedOn
    // validUpto
    // username
    
    const operationType = req.body.operationType;

    switch (operationType) {

        case 'email':
            
            break;

        case 'username':
            
            break;

        case 'phone':
            
            break;

        case 'workoutType':
            
            break;

        case 'joinedOn':
            
            break;

        case 'validUpto':
            
            break;
    
        default:
            break;
    }

}
