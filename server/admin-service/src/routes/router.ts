import { Router } from "express";
// import authRoutes from "./user.route";
// import superAdminRoutes from './superAdmin.route'
const router = Router();

// API bulk upload api 
// this api should take list of users and store them in db

// under /customer route
// API under  update user details  such as edit name)
// API update usesr measurements 
// add user email or phone number
// update payment
// deconsinged user

// under /customerSearch route
// search with email or phone or some unique id given by admin
// use measurements to filter customers


// under /dashboard
// api which show due customers in comming days
// api which shows paid customers in past days
// api which shows new joinees this month

// things to do 
// total payments made by a customer in total 
// this usaully needs a transactions collection which creates objects during payments.
// we can use this collection to show how much a user has totaly paid to this gym in total.

//make body measurements collection
// make paymentdue collection
// make meambership collection (not sure about this)

export default router;
