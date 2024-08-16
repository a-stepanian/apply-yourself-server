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
exports.jobPageRouter = void 0;
const express_1 = __importDefault(require("express"));
const jobPageModel_1 = require("../models/jobPageModel");
const jobModel_1 = __importDefault(require("../models/jobModel"));
exports.jobPageRouter = express_1.default.Router();
// Get JobPage by Page Number
exports.jobPageRouter.get("/:pageNumber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { pageNumber } = req.params;
    try {
        const foundJobPage = yield ((_b = (_a = jobPageModel_1.JobPage.findOne({ page: pageNumber })) === null || _a === void 0 ? void 0 : _a.populate("results")) === null || _b === void 0 ? void 0 : _b.exec());
        if (foundJobPage) {
            res.json(foundJobPage);
        }
        else {
            try {
                const response = yield fetch(`https://www.themuse.com/api/public/jobs?page=${pageNumber}`);
                if (!response.ok) {
                    res.status(404).send("Job page not found on the API.");
                }
                // console.log(response.headers.get("x-ratelimit-remaining"));
                let data = yield response.json();
                if (((_c = data === null || data === void 0 ? void 0 : data.results) === null || _c === void 0 ? void 0 : _c.length) > 0) {
                    const newJobIds = data.results.map((x) => __awaiter(void 0, void 0, void 0, function* () {
                        const newJob = new jobModel_1.default(x);
                        const newJobResult = yield newJob.save();
                        return newJobResult._id;
                    }));
                    const allNewJobIds = yield Promise.all(newJobIds);
                    const newJobPage = new jobPageModel_1.JobPage(Object.assign(Object.assign({}, data), { results: allNewJobIds, localRecord: true }));
                    yield newJobPage.save();
                    data = yield response.json();
                    res.send(data);
                }
            }
            catch (error) {
                res.status(404).send("Job page not found.");
            }
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}));
//# sourceMappingURL=jobPageRouter.js.map