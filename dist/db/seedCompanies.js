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
exports.getCompaniesFromAPI = getCompaniesFromAPI;
const companyModel_1 = __importDefault(require("../models/companyModel"));
const industryModel_1 = require("../models/industryModel");
const jobModel_1 = __importDefault(require("../models/jobModel"));
const categoryModel_1 = require("../models/categoryModel");
const locationModel_1 = require("./../models/locationModel");
let companiesCreated = 0;
let locationsCreated = 0;
let categoriesCreated = 0;
let industriesCreated = 0;
let jobsCreated = 0;
function seedLocations(locations) {
    return __awaiter(this, void 0, void 0, function* () {
        locations.forEach((y) => __awaiter(this, void 0, void 0, function* () {
            let location = yield locationModel_1.Location.findOne({ name: y.name }).exec();
            if (!location) {
                location = new locationModel_1.Location({ name: y.name });
                yield location.save();
                locationsCreated++;
            }
        }));
    });
}
function seedCategories(categories) {
    return __awaiter(this, void 0, void 0, function* () {
        categories.forEach((y) => __awaiter(this, void 0, void 0, function* () {
            let category = yield categoryModel_1.Category.findOne({ name: y.name }).exec();
            if (!category) {
                category = new categoryModel_1.Category({ name: y.name });
                yield category.save();
                categoriesCreated++;
            }
        }));
    });
}
function seedIndustries(industries) {
    return __awaiter(this, void 0, void 0, function* () {
        industries.forEach((y) => __awaiter(this, void 0, void 0, function* () {
            let industry = yield industryModel_1.Industry.findOne({ name: y.name }).exec();
            if (!industry) {
                industry = new industryModel_1.Industry({ name: y.name });
                yield industry.save();
                industriesCreated++;
            }
        }));
    });
}
function getJobsByCompanyNameFromAPI(companyName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://www.themuse.com/api/public/jobs?company=${companyName}&page=1`);
            let data = yield response.json();
            let jobs = data === null || data === void 0 ? void 0 : data.results;
            if (!((jobs === null || jobs === void 0 ? void 0 : jobs.length) > 0)) {
                return;
            }
            const createdJobs = yield Promise.all(jobs.map((x) => __awaiter(this, void 0, void 0, function* () {
                if (x.locations && x.locations.length > 0) {
                    yield seedLocations(x.locations);
                }
                if (x.categories && x.categories.length > 0) {
                    yield seedCategories(x.categories);
                }
                let job = new jobModel_1.default(Object.assign({}, x));
                yield job.save();
                jobsCreated++;
                return job;
            })));
            return createdJobs;
        }
        catch (error) {
            console.log("Error in getJobsByCompanyNameFromAPI: ", error);
        }
    });
}
function getCompaniesFromAPI(pageNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://www.themuse.com/api/public/companies?page=${pageNumber.toString()}`);
            let data = yield response.json();
            let companies = data === null || data === void 0 ? void 0 : data.results;
            if ((companies === null || companies === void 0 ? void 0 : companies.length) > 0) {
                companies.forEach((x) => __awaiter(this, void 0, void 0, function* () {
                    if (x.locations && x.locations.length > 0) {
                        yield seedLocations(x.locations);
                    }
                    if (x.industries && x.industries.length > 0) {
                        yield seedIndustries(x.industries);
                    }
                    const jobList = yield getJobsByCompanyNameFromAPI(x.name);
                    let company = new companyModel_1.default(Object.assign(Object.assign({}, x), { jobs: jobList }));
                    yield company.save();
                    companiesCreated++;
                    console.log(`Total Companies: ${companiesCreated}, Total Jobs: ${jobsCreated}, Total Locations: ${locationsCreated}, Total Categories: ${categoriesCreated},  Total Industries: ${industriesCreated}`);
                }));
            }
        }
        catch (error) {
            console.log("Error in getCompaniesFromAPI: ", error);
        }
    });
}
//# sourceMappingURL=seedCompanies.js.map