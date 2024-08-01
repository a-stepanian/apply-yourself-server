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
const applicationModel_1 = __importDefault(require("../models/applicationModel"));
// Create an instance of the Router
const applicationRoutes = express_1.default.Router();
// Use Error handling middleware
applicationRoutes.use(error_1.errorHandler);
// Get all applications
applicationRoutes.get("/applications", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield applicationModel_1.default.find();
        res.send(result);
    }
    catch (err) {
        next(err);
    }
}));
// Get a single application
applicationRoutes.get("/applications/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield applicationModel_1.default.findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
        if (result) {
            res.send(result);
        }
        else {
            res.status(404).send("Application not found");
        }
    }
    catch (err) {
        next(err);
    }
}));
// Create a new application
applicationRoutes.post("/applications/new", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newApplication = new applicationModel_1.default(Object.assign({}, req.body));
        const result = yield newApplication.save();
        res.send(result);
    }
    catch (err) {
        next(err);
    }
}));
// Update an application
applicationRoutes.put("/applications/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newValues = {
            $set: Object.assign({}, req.body)
        };
        const result = yield applicationModel_1.default.findByIdAndUpdate(new mongodb_1.ObjectId(req.params.id), newValues);
        if (result) {
            res.send(result);
        }
        else {
            res.status(404).send("Application not found");
        }
    }
    catch (err) {
        next(err);
    }
}));
// Delete an application
applicationRoutes.delete("/applications/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield applicationModel_1.default.findByIdAndDelete(req.params.id);
        if (result) {
            res.send(result);
        }
        else {
            res.status(404).send("Application not found");
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = applicationRoutes;
