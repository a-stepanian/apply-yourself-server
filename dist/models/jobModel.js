"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const LandingPageSchema = new Schema({ landing_page: { type: String } });
const CategorySchema = new Schema({ name: { type: String } });
const LocationSchema = new Schema({ name: { type: String } });
const LevelSchema = new Schema({
    name: { type: String },
    short_name: { type: String }
});
const CompanySchema = new Schema({
    id: { type: Number },
    name: { type: String },
    short_name: { type: String }
});
const jobSchema = new Schema({
    categories: { type: [CategorySchema] },
    company: { type: [CompanySchema] },
    contents: { type: String },
    levels: { type: [LevelSchema] },
    locations: { type: [LocationSchema] },
    model_type: { type: String },
    name: { type: String },
    publication_date: { type: String },
    refs: { type: LandingPageSchema },
    short_name: { type: String },
    tags: { type: [] },
    type: { type: String }
});
const Job = mongoose_1.default.model("job", jobSchema);
exports.default = Job;
//# sourceMappingURL=jobModel.js.map