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
const router = express_1.default.Router();
const jobPageModel_1 = __importDefault(require("../models/jobPageModel"));
const auth_1 = __importDefault(require("../middleware/auth"));
// CREATE NEW JOBPAGE
router.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get mongodb _id from user (added to req object from cookie in auth middleware)
        const user = req.user;
        // get remaining properties from req body
        const { aggregations, items_per_page, page, page_count, results, timed_out, took, total } = req.body;
        // create new application
        const newJobPage = new jobPageModel_1.default({
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
        const savedJobPage = yield newJobPage.save();
        res.json(savedJobPage);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
}));
// GET ALL JOBPAGES
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundJobPages = yield jobPageModel_1.default.find({});
        res.json(foundJobPages);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
}));
// GET JOBPAGE BY PAGE NUMBER
router.get("/:pageNumber", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageNumber } = req.params;
    try {
        const foundJobPage = yield jobPageModel_1.default.findOne({ page: pageNumber });
        if (foundJobPage) {
            res.send(foundJobPage);
        }
        else {
        }
        res.json(foundJobPage);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
}));
exports.default = router;
