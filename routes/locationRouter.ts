import express from "express";
import { errorHandler } from "../middleware/error";
import { Location } from "../models/locationModel";

export const locationRouter = express.Router();

locationRouter.use(errorHandler);

locationRouter.get("/", async (req, res) => {
  try {
    const total = await Location.countDocuments();
    const locations = await Location.find();

    res.json({
      total,
      data: locations
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ error: "An error occurred while fetching locations." });
  }
});
