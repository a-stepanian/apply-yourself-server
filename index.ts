import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/userRouter";
import { applicationRouter } from "./routes/applicationRouter";
import { jobRouter } from "./routes/jobRouter";
import { companyRouter } from "./routes/companyRouter";
import { categoryRouter } from "./routes/categoryRouter";
import { industryRouter } from "./routes/industryRouter";
import { locationRouter } from "./routes/locationRouter";
import { seedRouter } from "./routes/seedRouter";

dotenv.config({ path: "./config.env" });

// Fixes Mongoose Deprecation Warning
mongoose.set("strictQuery", true);
// Connect to DB
mongoose
  .connect(process.env.ATLAS_URI ?? "")
  .then(() => {
    console.log("\x1b[36m%s\x1b[0m", "-----------------------------");
    console.log("\x1b[36m%s\x1b[0m", "*  Connected to the Database");
    serveApp();
  })
  .catch(err => {
    console.log("DB CONNECTION ERROR", err);
  });

// Initialize server
const app: Express = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://client-apply-yourself.netlify.app"],
    credentials: true
  })
);

// Add Routing
app.use("/auth", userRouter);
app.use("/companies", companyRouter);
app.use("/jobs", jobRouter);
app.use("/applications", applicationRouter);
app.use("/locations", locationRouter);
app.use("/industries", industryRouter);
app.use("/categories", categoryRouter);
app.use("/seed", seedRouter);

// Serve app
function serveApp() {
  const port: number = parseInt(process.env.PORT || "5000", 10);
  app.listen(port, () => {
    console.log("\x1b[36m%s\x1b[0m", `*  Serving on Port ${port}...`);
    console.log("\x1b[36m%s\x1b[0m", "-----------------------------");
  });
}
