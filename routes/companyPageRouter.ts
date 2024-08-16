import express, { Request, Response } from "express";
import { IRequestWithUser } from "../middleware/auth";
import { CompanyPage } from "../models/companyPageModel";
import { ICompany } from "../models/interfaces";
import Company from "../models/companyModel";

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
    const foundCompanyPage = await CompanyPage.findOne({ page: pageNumber })?.populate("results")?.exec();

    if (foundCompanyPage) {
      res.json(foundCompanyPage);
    } else {
      // second try the API
      try {
        const response = await fetch(`https://www.themuse.com/api/public/companies?page=${pageNumber}`);

        if (!response.ok) {
          res.status(404).send("Company page not found on the API.");
        }
        let data = await response.json();

        if (data?.results?.length > 0) {
          const newCompanyIds = data.results.map(async (x: ICompany) => {
            const newCompany = new Company(x as ICompany);
            const newCompanyResult = await newCompany.save();
            return newCompanyResult._id;
          });

          const allNewCompanyIds = await Promise.all(newCompanyIds);
          console.log(allNewCompanyIds);

          const newCompanyPage = new CompanyPage({ ...data, results: allNewCompanyIds, localRecord: true });
          await newCompanyPage.save();
          data = await response.json();
          res.send(data);
        }
      } catch (error) {
        res.status(404).send("Company page not found.");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
