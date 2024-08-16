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
exports.companyPageRouter = void 0;
const express_1 = __importDefault(require("express"));
const companyPageModel_1 = require("../models/companyPageModel");
const companyModel_1 = __importDefault(require("../models/companyModel"));
exports.companyPageRouter = express_1.default.Router();
// CREATE NEW JOBPAGE
exports.companyPageRouter.post("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get mongodb _id from user (added to req object from cookie in auth middleware)
        const user = req.user;
        // get remaining properties from req body
        const { aggregations, items_per_page, page, page_count, results, timed_out, took, total } = req.body;
        // create new application
        const newCompanyPage = new companyPageModel_1.CompanyPage({
            aggregations,
            items_per_page,
            page,
            page_count,
            results,
            timed_out,
            took,
            total
        });
        // save to db
        const savedCompanyPage = yield newCompanyPage.save();
        res.json(savedCompanyPage);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
}));
// GET JOBPAGE BY PAGE NUMBER
exports.companyPageRouter.get("/:pageNumber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { pageNumber } = req.params;
    try {
        const foundCompanyPage = yield ((_b = (_a = companyPageModel_1.CompanyPage.findOne({ page: pageNumber })) === null || _a === void 0 ? void 0 : _a.populate("results")) === null || _b === void 0 ? void 0 : _b.exec());
        if (foundCompanyPage) {
            res.json(foundCompanyPage);
        }
        else {
            // second try the API
            try {
                const response = yield fetch(`https://www.themuse.com/api/public/companies?page=${pageNumber}`);
                if (!response.ok) {
                    res.status(404).send("Company page not found on the API.");
                }
                let data = yield response.json();
                if (((_c = data === null || data === void 0 ? void 0 : data.results) === null || _c === void 0 ? void 0 : _c.length) > 0) {
                    const newCompanyIds = data.results.map((x) => __awaiter(void 0, void 0, void 0, function* () {
                        const newCompany = new companyModel_1.default(x);
                        const newCompanyResult = yield newCompany.save();
                        return newCompanyResult._id;
                    }));
                    const allNewCompanyIds = yield Promise.all(newCompanyIds);
                    console.log(allNewCompanyIds);
                    const newCompanyPage = new companyPageModel_1.CompanyPage(Object.assign(Object.assign({}, data), { results: allNewCompanyIds, localRecord: true }));
                    yield newCompanyPage.save();
                    data = yield response.json();
                    res.send(data);
                }
            }
            catch (error) {
                res.status(404).send("Company page not found.");
            }
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}));
//# sourceMappingURL=companyPageRouter.js.map