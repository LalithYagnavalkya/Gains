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
exports.getBodyMetrics = exports.addBodyMetrics = void 0;
const bodyMetrics_model_1 = __importDefault(require("../models/bodyMetrics.model"));
const date_fns_1 = require("date-fns");
const addBodyMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    // should add a new document in bodymetrics collection.
    try {
        const { userId, bodyMetrics, date, _user } = req.body;
        const BodyMetricFound = yield bodyMetrics_model_1.default.findOne({ userId, date: (0, date_fns_1.format)(new Date(date), 'MMM YYYY') });
        if (BodyMetricFound) {
            BodyMetricFound['height'] = (_a = bodyMetrics.height) !== null && _a !== void 0 ? _a : null;
            BodyMetricFound['weight'] = (_b = bodyMetrics.weight) !== null && _b !== void 0 ? _b : null;
            BodyMetricFound['chest'] = (_c = bodyMetrics.chest) !== null && _c !== void 0 ? _c : null;
            BodyMetricFound['bicep'] = (_d = bodyMetrics.bicep) !== null && _d !== void 0 ? _d : null;
            BodyMetricFound['forearms'] = (_e = bodyMetrics.forearms) !== null && _e !== void 0 ? _e : null;
            BodyMetricFound['thighs'] = (_f = bodyMetrics.thighs) !== null && _f !== void 0 ? _f : null;
            BodyMetricFound['calfs'] = (_g = bodyMetrics.calfs) !== null && _g !== void 0 ? _g : null;
            BodyMetricFound['glutes'] = (_h = bodyMetrics.glutes) !== null && _h !== void 0 ? _h : null;
            yield BodyMetricFound.save();
            return res.status(200).json({ error: false, message: 'updated successfully' });
        }
        const bodyMetricsCreated = yield bodyMetrics_model_1.default.create({
            date: new Date(date),
            height: (_j = bodyMetrics.height) !== null && _j !== void 0 ? _j : null,
            weight: (_k = bodyMetrics.weight) !== null && _k !== void 0 ? _k : null,
            chest: (_l = bodyMetrics.chest) !== null && _l !== void 0 ? _l : null,
            bicep: (_m = bodyMetrics.bicep) !== null && _m !== void 0 ? _m : null,
            forearms: (_o = bodyMetrics.forearms) !== null && _o !== void 0 ? _o : null,
            thighs: (_p = bodyMetrics.thighs) !== null && _p !== void 0 ? _p : null,
            calfs: (_q = bodyMetrics.calfs) !== null && _q !== void 0 ? _q : null,
            glutes: (_r = bodyMetrics.glutes) !== null && _r !== void 0 ? _r : null,
        });
        return res.status(201).json({ error: false, message: 'created successfully', bodyMetrics: bodyMetricsCreated });
    }
    catch (error) {
        return res.status(500).json({ error: true, message: 'Internal server error' });
    }
});
exports.addBodyMetrics = addBodyMetrics;
const getBodyMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const currentDate = new Date();
        const lastTwelveMonthsStartDate = new Date(currentDate);
        lastTwelveMonthsStartDate.setMonth(currentDate.getMonth() - 11);
        const bodyMetricFilter = {
            userId,
            startDate: {
                $gte: lastTwelveMonthsStartDate,
                $lte: currentDate,
            }
        };
        const userBodyMetrics = yield bodyMetrics_model_1.default.find(bodyMetricFilter);
        return res.status(200).json(userBodyMetrics);
    }
    catch (error) {
    }
});
exports.getBodyMetrics = getBodyMetrics;
