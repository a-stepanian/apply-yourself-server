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
exports.locationRouter = void 0;
const express_1 = __importDefault(require("express"));
const error_1 = require("../middleware/error");
const locationModel_1 = require("../models/locationModel");
exports.locationRouter = express_1.default.Router();
exports.locationRouter.use(error_1.errorHandler);
exports.locationRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield locationModel_1.Location.countDocuments();
        const locations = yield locationModel_1.Location.find();
        res.json({
            total,
            data: locations
        });
    }
    catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({ error: "An error occurred while fetching locations." });
    }
}));
//# sourceMappingURL=locationRouter.js.map