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
exports.jobRouter = void 0;
const express_1 = __importDefault(require("express"));
const jobModel_1 = __importDefault(require("../models/jobModel"));
const error_1 = require("../middleware/error");
// Create an instance of the Router
exports.jobRouter = express_1.default.Router();
// Use Error handling middleware
exports.jobRouter.use(error_1.errorHandler);
// Get job by ID
exports.jobRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find job by ID
        const job = yield jobModel_1.default.findById(req.params.id);
        if (job) {
            res.json(job);
        }
        else {
            res.status(404).send("Job not found");
        }
    }
    catch (err) {
        next(err);
    }
}));
// Create a new job
exports.jobRouter.post("/new", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create a new job document
        const newJob = new jobModel_1.default(req.body);
        // Save the job document
        const savedJob = yield newJob.save();
        // Respond with the ID of the newly created job
        res.status(201).json({ id: savedJob._id });
    }
    catch (err) {
        next(err);
    }
}));
// Update a job by ID
exports.jobRouter.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Update job document
        const updatedJob = yield jobModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedJob) {
            res.json(updatedJob);
        }
        else {
            res.status(404).send("Job not found");
        }
    }
    catch (err) {
        next(err);
    }
}));
// Delete a job by ID
exports.jobRouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete job document
        const deletedJob = yield jobModel_1.default.findByIdAndDelete(req.params.id);
        if (deletedJob) {
            res.json(deletedJob);
        }
        else {
            res.status(404).send("Job not found");
        }
    }
    catch (err) {
        next(err);
    }
}));
//# sourceMappingURL=jobRouter.js.map