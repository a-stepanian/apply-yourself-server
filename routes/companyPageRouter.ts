import express, { Request, Response } from "express";
import { CompanyPage } from "../models/companyPageModel";
import { ICompany } from "../models/interfaces";
import Company from "../models/companyModel";

export const companyPageRouter = express.Router();

// Get CompanyPage by Page Number
companyPageRouter.get("/:pageNumber", async (req: Request, res: Response) => {
  const { pageNumber } = req.params;
  try {
    const foundCompanyPage = await CompanyPage.findOne({ page: pageNumber })?.populate("results")?.exec();

    if (foundCompanyPage) {
      res.json(foundCompanyPage);
    } else {
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
