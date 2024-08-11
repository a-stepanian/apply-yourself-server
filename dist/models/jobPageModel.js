"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jobModel_1 = __importDefault(require("./jobModel"));
const Schema = mongoose_1.default.Schema;
const jobPageSchema = new Schema({
    aggregations: { type: {} },
    items_per_page: { type: Number },
    page: { type: Number },
    page_count: { type: Number },
    results: [{ type: Schema.Types.ObjectId, ref: jobModel_1.default }],
    timed_out: { type: Boolean },
    took: { type: Number },
    total: { type: Number }
});
const JobPage = mongoose_1.default.model("jobPage", jobPageSchema);
exports.default = JobPage;
//# sourceMappingURL=jobPageModel.js.map