import { Router } from "express";
import dotenv from "dotenv";

// middlewares
// import upload from '../middleware/multer.middleware'

// controllers
import { uploadCustomers } from "../controllers/customer.controller";


const router = Router();
dotenv.config({ path: "./src/config/config.env" });
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('inside storage')
        console.log(req.body)
        return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)

    }
})

const upload = multer({ storage: storage })

router.post('/uploadCustomers', upload.single('csvdata'), uploadCustomers)

router.post('/', (req, res)=> {
    res.send('hello')
} )

export default router;