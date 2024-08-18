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
exports.industryRouter = void 0;
const express_1 = __importDefault(require("express"));
const error_1 = require("../middleware/error");
const industryModel_1 = require("../models/industryModel");
exports.industryRouter = express_1.default.Router();
exports.industryRouter.use(error_1.errorHandler);
exports.industryRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield industryModel_1.Industry.countDocuments();
        const industries = yield industryModel_1.Industry.find();
        res.json({
            total,
            data: industries
        });
    }
    catch (error) {
        console.error("Error fetching industries:", error);
        res.status(500).json({ error: "An error occurred while fetching industries." });
    }
}));
//# sourceMappingURL=industryRouter.js.map