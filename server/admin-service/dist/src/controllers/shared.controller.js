"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTimeTaken = exports.paginateResults = exports.parseWorkoutTypes = exports.parseDate = void 0;
const date_fns_1 = require("date-fns");
// models
const classification_model_1 = __importDefault(require("../models/classification.model"));
const parseDate = (dateString, format) => {
    const parts = dateString.split('-');
    let day, month, year;
    if (parts.length === 3) {
        if (format === 'dd-mm-yy' || format === 'dd-mm-yyyy') {
            [day, month, year] = parts.map((part) => parseInt(part, 10));
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                return new Date(year, month - 1, day);
            }
        }
        else if (format === 'mm-dd-yy' || format === 'mm-dd-yyyy') {
            [month, day, year] = parts.map((part) => parseInt(part, 10));
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                return new Date(year, month - 1, day);
            }
        }
    }
    // Return a default value if parsing fails
    return new Date();
};
exports.parseDate = parseDate;
const parseWorkoutTypes = (workoutTypes) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _workoutTypes = yield classification_model_1.default.find({ type: 'WORKOUT_TYPE' }).select('key value').lean();
    const _keys = _workoutTypes.map(x => x.key);
    const updatedWorkoutTypes = [];
    for (const x of workoutTypes) {
        if (!_keys.includes(x.toLocaleLowerCase())) {
            return { error: true, message: `Invalid workout type: ${x}`, updatedWorkoutTypes: [] };
        }
        const updatedType = ((_a = _workoutTypes.find(item => item.key === x.toLocaleLowerCase())) === null || _a === void 0 ? void 0 : _a.value) || '';
        updatedWorkoutTypes.push(updatedType);
    }
    return { error: false, updatedWorkoutTypes };
});
exports.parseWorkoutTypes = parseWorkoutTypes;
const paginateResults = (model, query, pageNumber = 1, limit = 5, sortField, sortDirection, select, populateFields, populateSelect) => __awaiter(void 0, void 0, void 0, function* () {
    if (pageNumber < 1) {
        // throw new AppError(400, 'Page must be a positive integer');
    }
    const skip = (pageNumber - 1) * limit;
    let queryBuilder = model.find(query).skip(skip).limit(limit);
    if (sortField && sortDirection) {
        const sortOptions = {
            [sortField]: sortDirection,
        };
        queryBuilder = queryBuilder.sort(sortOptions);
    }
    if (select) {
        queryBuilder = queryBuilder.select(select);
    }
    if (populateFields && populateFields.length > 0) {
        for (const field of populateFields) {
            queryBuilder = queryBuilder.populate(field, populateSelect === null || populateSelect === void 0 ? void 0 : populateSelect.join(' '));
        }
    }
    const results = yield queryBuilder.lean();
    const totalCount = yield model.countDocuments(query);
    return {
        totalCount,
        data: results,
    };
});
exports.paginateResults = paginateResults;
const formatTimeTaken = (startTime, endTime) => {
    const timeTakenInSeconds = (0, date_fns_1.differenceInSeconds)(endTime, startTime);
    const timeTakenInMinutes = (0, date_fns_1.differenceInMinutes)(endTime, startTime);
    const timeTakenInHours = (0, date_fns_1.differenceInHours)(endTime, startTime);
    const formattedTime = [];
    if (timeTakenInHours > 0) {
        formattedTime.push(`${timeTakenInHours}h`);
    }
    if (timeTakenInMinutes > 0) {
        formattedTime.push(`${timeTakenInMinutes % 60}m`);
    }
    if (timeTakenInSeconds > 0) {
        formattedTime.push(`${timeTakenInSeconds % 60}s`);
    }
    return formattedTime.join(' ');
};
exports.formatTimeTaken = formatTimeTaken;
