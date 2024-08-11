import express, { Request, Response } from "express";
import { IRequestWithUser } from "../middleware/auth";
import JobPage from "../models/jobPageModel";

export const jobPageRouter = express.Router();

// CREATE NEW JOBPAGE
jobPageRouter.post("/new", async (req: IRequestWithUser, res: Response) => {
  try {
    // get mongodb _id from user (added to req object from cookie in auth middleware)
    const user = req.user;
    // get remaining properties from req body
    const { aggregations, items_per_page, page, page_count, results, timed_out, took, total } = req.body;
    // create new application
    const newJobPage = new JobPage({
      aggregations,
      items_per_page,
      page,
      page_count,
      results,
      timed_out,
      took,
      total
    });
    // save to db
    const savedJobPage = await newJobPage.save();
    res.json(savedJobPage);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// GET JOBPAGE BY PAGE NUMBER
jobPageRouter.get("/:pageNumber", async (req: Request, res: Response) => {
  const { pageNumber } = req.params;
  try {
    const query: any = {}; // Initialize an empty query object
    if (pageNumber) query.page = pageNumber;

    const foundJobPage = await JobPage.findOne(query).populate("results").exec();

    if (foundJobPage) {
      res.json(foundJobPage);
    } else {
      try {
        const response = await fetch(`https://www.themuse.com/api/public/jobs?page=${pageNumber}`); // second try the API
        if (!response.ok) {
          res.status(404).send("Job page not found on the API.");
        }
        const newJobPage = new JobPage({
          ...response.body
        });
        await newJobPage.save();
        const data = await response.json();
        res.send(data);
      } catch (error) {
        res.status(404).send("Job page not found.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
