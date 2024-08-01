import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRouter";
import applicationRouter from "./routes/applicationRouter";
import mongoose from "mongoose";
import jobPageRouter from "./routes/jobPageRouter";

dotenv.config({ path: "./config.env" });

// Connect to DB
mongoose
  .connect(process.env.ATLAS_URI ?? "")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(err => {
    console.log("DB CONNECTION ERROR", err);
  });

// Initialize server
const app: Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://client-apply-yourself.netlify.app"],
    credentials: true
  })
);

// Add Routing
app.use("/auth", userRouter);
app.use("/applications", applicationRouter);
app.use("/job-pages", jobPageRouter);

// Serve app
const port: number = parseInt(process.env.PORT || "5000", 10);
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
