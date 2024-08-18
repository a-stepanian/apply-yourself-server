"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRouter_1 = require("./routes/userRouter");
const applicationRouter_1 = require("./routes/applicationRouter");
const jobRouter_1 = require("./routes/jobRouter");
const companyRouter_1 = require("./routes/companyRouter");
// import { seedRouter } from "./routes/seedRouter";
dotenv_1.default.config({ path: "./config.env" });
// Connect to DB
mongoose_1.default
    .connect((_a = process.env.ATLAS_URI) !== null && _a !== void 0 ? _a : "")
    .then(() => {
    console.log("Connected to DB");
})
    .catch(err => {
    console.log("DB CONNECTION ERROR", err);
});
// Initialize server
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb" }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://client-apply-yourself.netlify.app"],
    credentials: true
}));
// Add Routing
app.use("/auth", userRouter_1.userRouter);
app.use("/company", companyRouter_1.companyRouter);
app.use("/job", jobRouter_1.jobRouter);
app.use("/applications", applicationRouter_1.applicationRouter);
// app.use("/seed", seedRouter);
// Serve app
const port = parseInt(process.env.PORT || "5000", 10);
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
//# sourceMappingURL=index.js.map