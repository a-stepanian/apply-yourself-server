import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { errorHandler } from "../middleware/error";
import Application from "../models/applicationModel";

// Create an instance of the Router
const applicationRoutes = express.Router();

// Use Error handling middleware
applicationRoutes.use(errorHandler);

// Get all applications
applicationRoutes.get("/applications", async (req: Request, res: Response, next: Function) => {
  try {
    const result = await Application.find();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

// Get application by id
applicationRoutes.get("/applications/:id", async (req: Request, res: Response, next: Function) => {
  try {
    const result = await Application.findOne({ _id: new ObjectId(req.params.id) });
    if (result) {
      res.send(result);
    } else {
      res.status(404).send("Application not found");
    }
  } catch (err) {
    next(err);
  }
});

// Create a new application
applicationRoutes.post("/applications/new", async (req: Request, res: Response, next: Function) => {
  try {
    const newApplication = new Application({
      ...req.body
    });
    const result = await newApplication.save();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

// Update an application
applicationRoutes.put("/applications/:id", async (req: Request, res: Response, next: Function) => {
  try {
    const newValues = {
      $set: {
        ...req.body
      }
    };
    const result = await Application.findByIdAndUpdate(new ObjectId(req.params.id), newValues);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send("Application not found");
    }
  } catch (err) {
    next(err);
  }
});

// Delete an application
applicationRoutes.delete("/applications/:id", async (req: Request, res: Response, next: Function) => {
  try {
    const result = await Application.findByIdAndDelete(req.params.id);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send("Application not found");
    }
  } catch (err) {
    next(err);
  }
});

export default applicationRoutes;
