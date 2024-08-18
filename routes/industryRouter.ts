import express from "express";
import { errorHandler } from "../middleware/error";
import { Industry } from "../models/industryModel";

export const industryRouter = express.Router();

industryRouter.use(errorHandler);

industryRouter.get("/", async (req, res) => {
  try {
    const total = await Industry.countDocuments();
    const industries = await Industry.find();

    res.json({
      total,
      data: industries
    });
  } catch (error) {
    console.error("Error fetching industries:", error);
    res.status(500).json({ error: "An error occurred while fetching industries." });
  }
});
