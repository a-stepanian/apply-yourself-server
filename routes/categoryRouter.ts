import express from "express";
import { errorHandler } from "../middleware/error";
import { Category } from "../models/categoryModel";

export const categoryRouter = express.Router();

categoryRouter.use(errorHandler);

categoryRouter.get("/", async (req, res) => {
  try {
    const total = await Category.countDocuments();
    const categories = await Category.find();

    res.json({
      total,
      data: categories
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "An error occurred while fetching categories." });
  }
});
