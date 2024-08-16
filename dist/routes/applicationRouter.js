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
exports.applicationRouter = void 0;
const express_1 = __importDefault(require("express"));
const applicationModel_1 = __importDefault(require("../models/applicationModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const auth_1 = __importDefault(require("../middleware/auth"));
const companyModel_1 = __importDefault(require("../models/companyModel"));
const jobModel_1 = __importDefault(require("../models/jobModel"));
exports.applicationRouter = express_1.default.Router();
// CREATE NEW APPLICATION
exports.applicationRouter.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.user;
    const { jobId, applied, response, comments, status } = req.body;
    try {
        const job = yield jobModel_1.default.findById(jobId);
        if (!((_a = job === null || job === void 0 ? void 0 : job.company[0]) === null || _a === void 0 ? void 0 : _a.name)) {
            return res.status(400).json({ message: "applicationRouter Error: job or job.company not found" });
        }
        console.log("******************************job**************************************");
        console.log(job);
        const company = yield companyModel_1.default.findOne({ name: job.company[0].name });
        if (!company) {
            return res.status(400).json({ message: "applicationRouter Error: company not found" });
        }
        console.log("******************************company**************************************");
        console.log(company);
        const newApplication = new applicationModel_1.default({
            user: userId,
            company: company._id,
            job: jobId,
            applied,
            response,
            comments,
            status
        });
        const savedApplication = yield newApplication.save();
        const foundUser = yield userModel_1.default.findById(userId);
        if (foundUser) {
            foundUser.applications.push(savedApplication._id);
            yield foundUser.save();
        }
        res.status(201).json(savedApplication);
    }
    catch (err) {
        console.error("applicationRouter Error: other - ", err);
        res.status(500).send("Server error");
    }
}));
// GET ALL APPLICATIONS
exports.applicationRouter.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    try {
        const applications = yield applicationModel_1.default.find({ user: userId });
        res.json(applications);
    }
    catch (err) {
        console.error("Error fetching applications:", err);
        res.status(500).send("Server error");
    }
}));
// GET SINGLE APPLICATION
exports.applicationRouter.get("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const application = yield applicationModel_1.default.findById(id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        res.json(application);
    }
    catch (err) {
        console.error("Error fetching application:", err);
        res.status(500).send("Server error");
    }
}));
// EDIT SINGLE APPLICATION
exports.applicationRouter.put("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedApp = req.body;
    try {
        const updatedApplication = yield applicationModel_1.default.findByIdAndUpdate(id, updatedApp, { new: true });
        if (!updatedApplication) {
            return res.status(404).json({ message: "Application not found" });
        }
        res.json(updatedApplication);
    }
    catch (error) {
        console.error("Error updating application:", error);
        res.status(500).send("Server error");
    }
}));
//# sourceMappingURL=applicationRouter.js.map