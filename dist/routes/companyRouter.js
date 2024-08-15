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
exports.companyRouter = void 0;
const express_1 = __importDefault(require("express"));
const companyModel_1 = __importDefault(require("../models/companyModel"));
const error_1 = require("../middleware/error");
// Create an instance of the Router
exports.companyRouter = express_1.default.Router();
// Use Error handling middleware
exports.companyRouter.use(error_1.errorHandler);
// Get company by ID
exports.companyRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield companyModel_1.default.findById(req.params.id);
        if (company) {
            res.json(company);
        }
        else {
            res.status(404).send("Company not found");
        }
    }
    catch (err) {
        next(err);
    }
}));
// Create a new company
exports.companyRouter.post("/new", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCompany = new companyModel_1.default(req.body);
        const savedCompany = yield newCompany.save();
        res.status(201).json({ id: savedCompany._id });
    }
    catch (err) {
        next(err);
    }
}));
// Update a company by ID
exports.companyRouter.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCompany = yield companyModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedCompany) {
            res.json(updatedCompany);
        }
        else {
            res.status(404).send("Company not found");
        }
    }
    catch (err) {
        next(err);
    }
}));
// Delete a company by ID
exports.companyRouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete company document
        const deletedCompany = yield companyModel_1.default.findByIdAndDelete(req.params.id);
        if (deletedCompany) {
            res.json(deletedCompany);
        }
        else {
            res.status(404).send("Company not found");
        }
    }
    catch (err) {
        next(err);
    }
}));
//# sourceMappingURL=companyRouter.js.map