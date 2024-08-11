import { Request, Response } from "express";
import { IRequestWithUser } from "../middleware/auth";
import express from "express";
import Application from "../models/applicationModel";
import User from "../models/userModel";
import auth from "../middleware/auth";

export const applicationRouter = express.Router();

// CREATE NEW APPLICATION
applicationRouter.post("/", auth, async (req: IRequestWithUser, res: Response) => {
  try {
    // get mongodb _id from user (added to req object from cookie in auth middleware)
    const user = req.user;
    const { company, position, website, location, applied, response, comments, status } = req.body;

    const newApplication = new Application({
      user,
      company,
      position,
      website,
      location,
      applied,
      response,
      comments,
      status
    });

    const savedApplication = await newApplication.save();

    if (savedApplication) {
      const foundUser = await User.findById(user);
      // Push new app into the user's applications array.
      foundUser?.applications?.push(savedApplication.id);
      await foundUser?.save();
    }

    res.json(savedApplication);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// GET ALL APPLICATIONS
applicationRouter.get("/", auth, async (req: IRequestWithUser, res: Response) => {
  const id = req.user; //req.user added in auth middleware
  try {
    const foundApplications = await Application.find({ user: id });
    res.json(foundApplications);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// GET SINGLE APPLICATION
applicationRouter.get("/:id", auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const foundApplication = await Application.findById(id);
    res.json(foundApplication);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// EDIT SINGLE APPLICATION
applicationRouter.put("/:id", auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedApp = req.body;

  try {
    const application = await Application.findByIdAndUpdate(id, updatedApp);
    await application?.save();
    // Respond with old values
    res.json(application);
  } catch (error) {
    console.log(error);
  }
});
