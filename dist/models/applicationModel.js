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
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: "Job"
    },
    applied: { type: String },
    response: { type: String },
    comments: { type: String },
    status: { type: String }
});
const Application = mongoose_1.default.model("application", applicationSchema);
exports.default = Application;
//# sourceMappingURL=applicationModel.js.map