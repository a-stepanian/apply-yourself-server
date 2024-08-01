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
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middleware/auth"));
// Create User
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username, email, password, passwordVerify } = req.body;
        // Validate user input
        // 1. Must have all required fields
        if (!username || !email || !password || !passwordVerify)
            return res.status(400).json({ errorMessage: "Please enter all required fields." });
        // 2. Password has at least 6 characters
        if (password.length < 6)
            return res.status(400).json({
                errorMessage: "Please enter a password of at least 6 characters."
            });
        // 3. Password and verification match
        if (password !== passwordVerify)
            return res.status(400).json({
                errorMessage: "Passwords do not match.  Please enter the same password twice."
            });
        // 4. Email is not already in user
        const existingEmail = yield userModel_1.default.findOne({ email });
        if (existingEmail)
            return res.status(400).json({
                errorMessage: "An account with this email already exists."
            });
        // 5. Username is not already in user
        const existingUsername = yield userModel_1.default.findOne({ username });
        if (existingUsername)
            return res.status(400).json({
                errorMessage: "An account with this username already exists."
            });
        // Salt & hash the password
        const salt = yield bcryptjs_1.default.genSalt();
        const passwordHash = yield bcryptjs_1.default.hash(password, salt);
        // Add new user to the db
        const newUser = yield new userModel_1.default({
            username,
            email,
            passwordHash,
            applications: []
        });
        const savedUser = yield newUser.save();
        // Create token and sign with the secret
        const token = jsonwebtoken_1.default.sign({
            user: savedUser._id
        }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "");
        // Send the token in an http-only cookie
        res
            .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
            .send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
}));
//-------------------
// LOG IN USER
//-------------------
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username, password } = req.body;
        // Validate user input
        // 1. Ensure required fields are filled out
        if (!username || !password)
            return res.status(400).json({ errorMessage: "Please enter all required fields." });
        // 2. Confirm user with that username exists
        const existingUser = yield userModel_1.default.findOne({ username });
        if (!existingUser)
            return res.status(401).json({ errorMessage: "Wrong username or password." });
        // 3. Compare password with db hashed password
        const passwordCorrect = yield bcryptjs_1.default.compare(password, existingUser.passwordHash);
        if (!passwordCorrect)
            return res.status(401).json({ errorMessage: "Wrong username or password." });
        // Create token and sign with the secret
        const token = jsonwebtoken_1.default.sign({
            user: existingUser._id
        }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "");
        // Send the token in an http-only cookie
        res
            .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
            .send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
}));
//-------------------
// LOG OUT USER
//-------------------
router.get("/logout", (req, res) => {
    //  Set token to empty string and make it expired
    res
        .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    })
        .send();
});
//-------------------
// VERIFY USER HAS TOKEN AND SECRET MATCHES
//-------------------
router.get("/loggedIn", (req, res) => {
    var _a;
    try {
        const token = req.cookies.token;
        if (!token)
            return res.json(false);
        jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "");
        res.send(true);
    }
    catch (err) {
        res.json(false);
    }
});
//-------------------
// GET SINGLE USER
//-------------------
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.user;
    try {
        const foundUser = yield userModel_1.default.findById(id);
        const justTheName = { username: (_a = foundUser === null || foundUser === void 0 ? void 0 : foundUser.username) !== null && _a !== void 0 ? _a : "" };
        res.json(justTheName);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
}));
exports.default = router;
