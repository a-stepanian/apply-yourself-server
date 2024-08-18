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
exports.companyRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const searchTerm = ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.search) || "";
        // const limit = 30;
        const page = Number((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
        const startIndex = page - 1; // * limit;
        const query = {};
        if (searchTerm.length > 0) {
            query.name = { $regex: new RegExp(searchTerm, "i") }; // case-insensitive search
        }
        const total = yield companyModel_1.default.countDocuments(query);
        const companies = yield companyModel_1.default.find(query).skip(startIndex); // .limit(limit);
        res.json({
            page,
            // limit,
            total,
            pages: Math.ceil(total), // / limit),
            data: companies
        });
    }
    catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).json({ error: "An error occurred while fetching companies." });
    }
}));
// // Get all company records
// companyRouter.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const allCompanies = await Company.find();
//     if (allCompanies) {
//       res.json(allCompanies);
//     } else {
//       res.status(404).send("Company not found");
//     }
//   } catch (err) {
//     next(err);
//   }
// });
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