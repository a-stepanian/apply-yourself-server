import express, { Request, Response } from "express";
import { IRequestWithUser } from "../middleware/auth";
import { CompanyPage } from "../models/companyPageModel";

export const companyPageRouter = express.Router();

// CREATE NEW JOBPAGE
companyPageRouter.post("/new", async (req: IRequestWithUser, res: Response) => {
  try {
    // get mongodb _id from user (added to req object from cookie in auth middleware)
    const user = req.user;
    // get remaining properties from req body
    const { aggregations, items_per_page, page, page_count, results, timed_out, took, total } = req.body;
    // create new application
    const newCompanyPage = new CompanyPage({
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
    const savedCompanyPage = await newCompanyPage.save();
    res.json(savedCompanyPage);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// GET JOBPAGE BY PAGE NUMBER
companyPageRouter.get("/:pageNumber", async (req: Request, res: Response) => {
  const { pageNumber } = req.params;
  try {
    const query: any = {}; // Initialize an empty query object
    if (pageNumber) query.page = pageNumber;

    const foundCompanyPage = await CompanyPage.findOne(query).populate("results").exec();

    if (foundCompanyPage) {
      res.json(foundCompanyPage);
    } else {
      try {
        const response = await fetch(`https://www.themuse.com/api/public/companies?page=${pageNumber}`); // second try the API
        if (!response.ok) {
          res.status(404).send("Company page not found on the API.");
        }
        const newCompanyPage = new CompanyPage({
          ...response.body
        });
        await newCompanyPage.save();
        const data = await response.json();
        res.send(data);
      } catch (error) {
        res.status(404).send("Company page not found.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
