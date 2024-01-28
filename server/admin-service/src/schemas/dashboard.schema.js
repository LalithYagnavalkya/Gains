"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const isObjectId = (value) => {
    return mongoose_1.Types.ObjectId.isValid(value);
};
exports.dashboardSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        _user: (0, zod_1.object)({
            _id: zod_1.z.string(),
            role: (0, zod_1.string)(),
            partnerId: zod_1.z.number(),
        })
    })
});
