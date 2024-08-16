"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyPage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const companyModel_1 = __importDefault(require("./companyModel"));
const Schema = mongoose_1.default.Schema;
const companyPageSchema = new Schema({
    aggregations: { type: {} },
    items_per_page: { type: Number },
    page: { type: Number },
    page_count: { type: Number },
    results: [{ type: Schema.Types.ObjectId, ref: companyModel_1.default }],
    timed_out: { type: Boolean },
    took: { type: Number },
    total: { type: Number },
    localRecord: { type: Boolean }
});
exports.CompanyPage = mongoose_1.default.model("companyPage", companyPageSchema);
//# sourceMappingURL=companyPageModel.js.map