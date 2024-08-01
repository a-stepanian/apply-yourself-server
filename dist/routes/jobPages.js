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
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const error_1 = require("../middleware/error");
const jobPageModel_1 = __importDefault(require("../models/jobPageModel"));
// Create an instance of the Router
const jobPageRoutes = express_1.default.Router();
// Use Error handling middleware
jobPageRoutes.use(error_1.errorHandler);
// Get all jobPages
jobPageRoutes.get("/job-pages", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield jobPageModel_1.default.find();
        res.send(result);
    }
    catch (err) {
        next(err);
    }
}));
// Get jobPage by id
jobPageRoutes.get("/job-pages/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield jobPageModel_1.default.findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
        if (result) {
            res.send(result);
        }
        else {
            res.status(404).send("JobPage not found");
        }
    }
    catch (err) {
        next(err);
    }
}));
// Create a new jobPage
jobPageRoutes.post("/job-pages/new", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newJobPage = new jobPageModel_1.default(Object.assign({}, req.body));
        const result = yield newJobPage.save();
        res.send(result);
    }
    catch (err) {
        next(err);
    }
}));
// Update an jobPage
jobPageRoutes.put("/job-pages/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newValues = {
            $set: Object.assign({}, req.body)
        };
        const result = yield jobPageModel_1.default.findByIdAndUpdate(new mongodb_1.ObjectId(req.params.id), newValues);
        if (result) {
            res.send(result);
        }
        else {
            res.status(404).send("JobPage not found");
        }
    }
    catch (err) {
        next(err);
    }
}));
// Delete an jobPage
jobPageRoutes.delete("/job-pages/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield jobPageModel_1.default.findByIdAndDelete(req.params.id);
        if (result) {
            res.send(result);
        }
        else {
            res.status(404).send("JobPage not found");
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = jobPageRoutes;
