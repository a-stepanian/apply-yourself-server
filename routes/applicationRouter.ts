import { Request, Response } from "express";
import express from "express";
import Application from "../models/applicationModel";
import User from "../models/userModel";
import auth from "../middleware/auth";
import Company from "../models/companyModel";
import Job from "../models/jobModel";
import { IRequestWithUser } from "../middleware/auth";

export const applicationRouter = express.Router();

// CREATE NEW APPLICATION
applicationRouter.post("/", auth, async (req: IRequestWithUser, res: Response) => {
  const userId = req.user;
  const { jobId, applied, response, comments, status } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job?.company[0]?.name) {
      return res.status(400).json({ message: "applicationRouter Error: job or job.company not found" });
    }
    console.log("******************************job**************************************");
    console.log(job);
    const company = await Company.findOne({ name: job.company[0].name });
    if (!company) {
      return res.status(400).json({ message: "applicationRouter Error: company not found" });
    }
    console.log("******************************company**************************************");
    console.log(company);

    const newApplication = new Application({
      user: userId,
      company: company._id,
      job: jobId,
      applied,
      response,
      comments,
      status
    });

    const savedApplication = await newApplication.save();
    const foundUser = await User.findById(userId);

    if (foundUser) {
      foundUser.applications.push(savedApplication._id);
      await foundUser.save();
    }

    res.status(201).json(savedApplication);
  } catch (err) {
    console.error("applicationRouter Error: other - ", err);
    res.status(500).send("Server error");
  }
});

// GET ALL APPLICATIONS
applicationRouter.get("/", auth, async (req: IRequestWithUser, res: Response) => {
  const userId = req.user;

  try {
    const applications = await Application.find({ user: userId });
    res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).send("Server error");
  }
});

// GET SINGLE APPLICATION
applicationRouter.get("/:id", auth, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(application);
  } catch (err) {
    console.error("Error fetching application:", err);
    res.status(500).send("Server error");
  }
});

// EDIT SINGLE APPLICATION
applicationRouter.put("/:id", auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedApp = req.body;

  try {
    const updatedApplication = await Application.findByIdAndUpdate(id, updatedApp, { new: true });

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(updatedApplication);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).send("Server error");
  }
});
