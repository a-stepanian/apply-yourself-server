import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { errorHandler } from "../middleware/error";
import dbo from "../db/conn";

// Create an instance of the Router
const applicationRoutes = express.Router();

// Use Error handling middleware
applicationRoutes.use(errorHandler);

// Get all applications
applicationRoutes.get("/applications", async (req: Request, res: Response, next: Function) => {
  try {
    const db_connect = dbo.getDb();
    const result = await db_connect?.collection("applications").find({}).toArray();
    res.json(result);
  } catch (err) {
    next(err);
  }
});
// Get a single application
applicationRoutes.get("/applications/:id", async (req: Request, res: Response, next: Function) => {
  try {
    const db_connect = dbo.getDb();
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect?.collection("applications").findOne(myquery);
    if (result) {
      res.json(result);
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
    const db_connect = dbo.getDb();
    const newApplication = {
      company: req.body.company,
      position: req.body.position,
      website: req.body.website,
      location: req.body.location,
      applied: req.body.applied,
      response: req.body.response,
      comments: req.body.comments,
      status: req.body.status
    };

    const result = await db_connect?.collection("applications").insertOne(newApplication);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Update an application
applicationRoutes.put("/applications/:id", async (req: Request, res: Response, next: Function) => {
  try {
    const db_connect = dbo.getDb();
    const foundApplication = { _id: new ObjectId(req.params.id) };
    const newvalues = {
      $set: {
        company: req.body.company,
        position: req.body.position,
        website: req.body.website,
        location: req.body.location,
        applied: req.body.applied,
        response: req.body.response,
        comments: req.body.comments,
        status: req.body.status
      }
    };

    const result = await db_connect?.collection("applications").updateOne(foundApplication, newvalues);
    if (result?.matchedCount && result.matchedCount > 0) {
      res.json(result);
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
    const db_connect = dbo.getDb();
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect?.collection("applications").deleteOne(myquery);
    if (result?.deletedCount && result.deletedCount > 0) {
      res.json(result);
    } else {
      res.status(404).send("Application not found");
    }
  } catch (err) {
    next(err);
  }
});

export default applicationRoutes;
