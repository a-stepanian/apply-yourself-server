import express, { NextFunction, Request, Response } from "express";
import Job from "../models/jobModel";
import { IJob } from "../models/interfaces";
import { errorHandler } from "../middleware/error";

// Create an instance of the Router
export const jobRouter = express.Router();

// Use Error handling middleware
jobRouter.use(errorHandler);

// Get job by ID
jobRouter.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Find job by ID
    const job = await Job.findById(req.params.id);
    if (job) {
      res.json(job);
    } else {
      res.status(404).send("Job not found");
    }
  } catch (err) {
    next(err);
  }
});

// Create a new job
jobRouter.post("/new", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Create a new job document
    const newJob = new Job(req.body as IJob);
    // Save the job document
    const savedJob = await newJob.save();
    // Respond with the ID of the newly created job
    res.status(201).json({ id: savedJob._id });
  } catch (err) {
    next(err);
  }
});

// Update a job by ID
jobRouter.put("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Update job document
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body as IJob, { new: true });
    if (updatedJob) {
      res.json(updatedJob);
    } else {
      res.status(404).send("Job not found");
    }
  } catch (err) {
    next(err);
  }
});

// Delete a job by ID
jobRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Delete job document
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (deletedJob) {
      res.json(deletedJob);
    } else {
      res.status(404).send("Job not found");
    }
  } catch (err) {
    next(err);
  }
});
