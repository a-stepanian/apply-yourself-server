import express, { NextFunction, Request, Response } from "express";
import Company from "../models/companyModel";
import { ICompany } from "../models/interfaces";
import { errorHandler } from "../middleware/error";

// Create an instance of the Router
export const companyRouter = express.Router();

// Use Error handling middleware
companyRouter.use(errorHandler);

// Get company by ID
companyRouter.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const company = await Company.findById(req.params.id);
    if (company) {
      res.json(company);
    } else {
      res.status(404).send("Company not found");
    }
  } catch (err) {
    next(err);
  }
});

// Create a new company
companyRouter.post("/new", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newCompany = new Company(req.body as ICompany);
    const savedCompany = await newCompany.save();
    res.status(201).json({ id: savedCompany._id });
  } catch (err) {
    next(err);
  }
});

// Update a company by ID
companyRouter.put("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body as ICompany, { new: true });
    if (updatedCompany) {
      res.json(updatedCompany);
    } else {
      res.status(404).send("Company not found");
    }
  } catch (err) {
    next(err);
  }
});

// Delete a company by ID
companyRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Delete company document
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (deletedCompany) {
      res.json(deletedCompany);
    } else {
      res.status(404).send("Company not found");
    }
  } catch (err) {
    next(err);
  }
});