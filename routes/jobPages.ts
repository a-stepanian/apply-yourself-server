import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { errorHandler } from "../middleware/error";
import JobPage from "../models/jobPageModel";

// Create an instance of the Router
const jobPageRoutes = express.Router();

// Use Error handling middleware
jobPageRoutes.use(errorHandler);

// Get all jobPages
jobPageRoutes.get("/job-pages", async (req: Request, res: Response, next: Function) => {
  try {
    const result = await JobPage.find();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

// Get jobPage by id
jobPageRoutes.get("/job-pages/:id", async (req: Request, res: Response, next: Function) => {
  try {
    const result = await JobPage.findOne({ _id: new ObjectId(req.params.id) });
    if (result) {
      res.send(result);
    } else {
      res.status(404).send("JobPage not found");
    }
  } catch (err) {
    next(err);
  }
});

// Create a new jobPage
jobPageRoutes.post("/job-pages/new", async (req: Request, res: Response, next: Function) => {
  try {
    const newJobPage = new JobPage({
      ...req.body
    });
    const result = await newJobPage.save();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

// Update an jobPage
jobPageRoutes.put("/job-pages/:id", async (req: Request, res: Response, next: Function) => {
  try {
    const newValues = {
      $set: {
        ...req.body
      }
    };
    const result = await JobPage.findByIdAndUpdate(new ObjectId(req.params.id), newValues);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send("JobPage not found");
    }
  } catch (err) {
    next(err);
  }
});

// Delete an jobPage
jobPageRoutes.delete("/job-pages/:id", async (req: Request, res: Response, next: Function) => {
  try {
    const result = await JobPage.findByIdAndDelete(req.params.id);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send("JobPage not found");
    }
  } catch (err) {
    next(err);
  }
});

export default jobPageRoutes;
