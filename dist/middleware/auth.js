"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware function
function auth(req, res, next) {
    try {
        // Get the token from cookies
        const token = req.cookies.token;
        if (!token) {
            throw new Error("Token not found from request cookies");
        }
        // Verify the token
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }
        const verified = jsonwebtoken_1.default.verify(token, secret);
        req.user = verified.user;
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}
exports.default = auth;
