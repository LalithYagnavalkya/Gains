"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_route_1 = __importDefault(require("./customer.route"));
const paymemt_route_1 = __importDefault(require("./paymemt.route"));
const dashboard_route_1 = __importDefault(require("./dashboard.route"));
const shedulers_route_1 = __importDefault(require("./shedulers.route"));
const bodyMetrics_route_1 = __importDefault(require("./bodyMetrics.route"));
const authRoutes_route_1 = __importDefault(require("./authRoutes.route"));
const router = (0, express_1.Router)();
router.use('/customer', customer_route_1.default);
router.use('/bodyMetrics', bodyMetrics_route_1.default);
router.use('/payment', paymemt_route_1.default);
router.use('/dashboard', dashboard_route_1.default);
router.use('/scheduler', shedulers_route_1.default);
router.use('/auth', authRoutes_route_1.default);
router.get('/live', (req, res) => {
    return res.status(200).json({ error: false, message: 'Server is live' });
});
// API bulk upload api 
// this api should take list of users and store them in db
// under /customer route
// API under  update user details  such as edit name)
// API update usesr measurements 
// add user email or phone number
// update payment
// deconsinged user // user left the gym.
// under /customerSearch route 
// search with email or phone or some unique id given by admin
// use measurements to filter customers //filter by fatest tallest shortest
// under /dashboard
// api which show due customers in comming days
// api which shows paid customers in past days
// api which shows new joinees this month
// things to do 
// total payments made by a customer in total //transaction collection.
// this usaully needs a transactions collection which creates objects during payments.
// we can use this collection to show how much a user has totaly paid to this gym in total.
// make body measurements collection
// make paymentdue collection
// make meambership collection (not sure about this)
// measurements calculation 
// Feet = 5
// Inches = 9
// dashboard  contanis payments made table which can filter payments today and yestruday or last one week and others.
exports.default = router;
