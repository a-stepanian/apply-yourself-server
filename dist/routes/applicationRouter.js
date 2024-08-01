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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const applicationModel_1 = __importDefault(require("../models/applicationModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const auth_1 = __importDefault(require("../middleware/auth"));
//-----------------------
// CREATE NEW APPLICATION
//-----------------------
router.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // get mongodb _id from user (added to req object from cookie in auth middleware)
        const user = req.user;
        // get remaining properties from req body
        const { company, position, website, location, applied, response, comments, status } = req.body;
        // create new application
        const newApplication = new applicationModel_1.default({
            user,
            company,
            position,
            website,
            location,
            applied,
            response,
            comments,
            status
        });
        // save to db
        const savedApplication = yield newApplication.save();
        if (savedApplication) {
            // Find user in db
            const foundUser = yield userModel_1.default.findById(user);
            // Push new app into the user's applications array.
            (_a = foundUser === null || foundUser === void 0 ? void 0 : foundUser.applications) === null || _a === void 0 ? void 0 : _a.push(savedApplication.id);
            yield (foundUser === null || foundUser === void 0 ? void 0 : foundUser.save());
        }
        res.json(savedApplication);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
}));
//-----------------------
// GET ALL APPLICATIONS
//-----------------------
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user; //req.user added in auth middleware
    try {
        const foundApplications = yield applicationModel_1.default.find({ user: id });
        res.json(foundApplications);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
}));
//-----------------------
// GET SINGLE APPLICATION
//-----------------------
router.get("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const foundApplication = yield applicationModel_1.default.findById(id);
        res.json(foundApplication);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
}));
//-----------------------
// EDIT SINGLE APPLICATION
//-----------------------
router.put("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedApp = req.body;
    //Update application
    try {
        const application = yield applicationModel_1.default.findByIdAndUpdate(id, updatedApp);
        yield (application === null || application === void 0 ? void 0 : application.save());
        // Respond with old values
        res.json(application);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
