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
exports.seedRouter = void 0;
const express_1 = __importDefault(require("express"));
const error_1 = require("../middleware/error");
const seedCompanies_1 = require("../db/seedCompanies");
// Create an instance of the Router
exports.seedRouter = express_1.default.Router();
// Use Error handling middleware
exports.seedRouter.use(error_1.errorHandler);
exports.seedRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://www.themuse.com/api/public/companies?page=1`);
        let data = yield response.json();
        for (let i = 1; i <= data.page_count; i++) {
            yield (0, seedCompanies_1.getCompaniesFromAPI)(i);
        }
        res.status(200).json({ message: "Complete" });
    }
    catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).json({ error: "An error occurred while fetching companies." });
    }
}));
//# sourceMappingURL=seedRouter.js.map