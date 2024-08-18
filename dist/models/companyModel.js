"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const companySchema = new Schema({
    id: { type: Number },
    name: { type: String },
    short_name: { type: String },
    description: { type: String },
    locations: [{ name: { type: String } }],
    industries: [{ name: { type: String } }],
    model_type: { type: String },
    publication_date: { type: String },
    tags: [{ type: Schema.Types.Mixed }],
    twitter: { type: Schema.Types.Mixed },
    refs: { type: Schema.Types.Mixed },
    size: { type: Schema.Types.Mixed },
    jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }]
});
const Company = mongoose_1.default.model("company", companySchema);
exports.default = Company;
//# sourceMappingURL=companyModel.js.map