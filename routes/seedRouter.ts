import express from "express";
import { errorHandler } from "../middleware/error";
import { getCompaniesFromAPI } from "../db/seedCompanies";

// Create an instance of the Router
export const seedRouter = express.Router();

// Use Error handling middleware
seedRouter.use(errorHandler);

seedRouter.get("/", async (req, res) => {
  try {
    const response = await fetch(`https://www.themuse.com/api/public/companies?page=1`);
    let data = await response.json();
    for (let i = 1; i <= data.page_count; i++) {
      await getCompaniesFromAPI(i);
    }
    res.status(200).json({ message: "Complete" });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "An error occurred while fetching companies." });
  }
});
