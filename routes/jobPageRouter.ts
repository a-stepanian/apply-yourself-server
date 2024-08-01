import express, { Request, Response } from "express";
import { IRequestWithUser } from "../middleware/auth";
const router = express.Router();
import JobPage from "../models/jobPageModel";

// CREATE NEW JOBPAGE
router.post("/new", async (req: IRequestWithUser, res: Response) => {
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

// GET ALL JOBPAGES
router.get("/", async (req: Request, res: Response) => {
  try {
    console.log("TEST");
    const foundJobPages = await JobPage.find({});
    res.json(foundJobPages);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// GET JOBPAGE BY PAGE NUMBER
router.get("/:pageNumber", async (req: Request, res: Response) => {
  const { pageNumber } = req.params;
  try {
    const foundJobPage = await JobPage.findOne({ page: pageNumber });
    if (foundJobPage) {
      res.send(foundJobPage);
    } else {
    }
    res.json(foundJobPage);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

export default router;
