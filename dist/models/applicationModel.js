"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const applicationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    company: { type: String, required: true },
    position: { type: String, required: true },
    website: { type: String, required: true },
    location: { type: String, required: true },
    applied: { type: String, required: true },
    response: { type: String },
    comments: { type: String },
    status: { type: String, required: true }
});
const Application = mongoose_1.default.model("application", applicationSchema);
exports.default = Application;
