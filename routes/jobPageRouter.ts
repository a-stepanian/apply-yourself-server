import express, { Request, Response } from "express";
import { JobPage } from "../models/jobPageModel";
import { IJob } from "../models/interfaces";
import Job from "../models/jobModel";

export const jobPageRouter = express.Router();

// Get JobPage by Page Number
jobPageRouter.get("/:pageNumber", async (req: Request, res: Response) => {
  const { pageNumber } = req.params;
  try {
    const foundJobPage = await JobPage.findOne({ page: pageNumber })?.populate("results")?.exec();

    if (foundJobPage) {
      res.json(foundJobPage);
    } else {
      try {
        const response = await fetch(`https://www.themuse.com/api/public/jobs?page=${pageNumber}`);
        if (!response.ok) {
          res.status(404).send("Job page not found on the API.");
        }
        // console.log(response.headers.get("x-ratelimit-remaining"));
        let data = await response.json();

        if (data?.results?.length > 0) {
          const newJobIds = data.results.map(async (x: IJob) => {
            const newJob = new Job(x as IJob);
            const newJobResult = await newJob.save();
            return newJobResult._id;
          });

          const allNewJobIds = await Promise.all(newJobIds);
          const newJobPage = new JobPage({ ...data, results: allNewJobIds, localRecord: true });
          await newJobPage.save();
          data = await response.json();
          res.send(data);
        }
      } catch (error) {
        res.status(404).send("Job page not found.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
