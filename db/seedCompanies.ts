import Company from "../models/companyModel";
import { Industry } from "../models/industryModel";
import Job from "../models/jobModel";
import { Category } from "../models/categoryModel";
import { ICompany, IHasName, IJob } from "./../models/interfaces";
import { Location } from "./../models/locationModel";

let companiesCreated = 0;
let locationsCreated = 0;
let categoriesCreated = 0;
let industriesCreated = 0;
let jobsCreated = 0;

async function seedLocations(locations: IHasName[]) {
  locations.forEach(async y => {
    let location = await Location.findOne({ name: y.name }).exec();
    if (!location) {
      location = new Location({ name: y.name });
      await location.save();
      locationsCreated++;
    }
  });
}

async function seedCategories(categories: IHasName[]) {
  categories.forEach(async y => {
    let category = await Category.findOne({ name: y.name }).exec();
    if (!category) {
      category = new Category({ name: y.name });
      await category.save();
      categoriesCreated++;
    }
  });
}

async function seedIndustries(industries: IHasName[]) {
  industries.forEach(async y => {
    let industry = await Industry.findOne({ name: y.name }).exec();
    if (!industry) {
      industry = new Industry({ name: y.name });
      await industry.save();
      industriesCreated++;
    }
  });
}

async function getJobsByCompanyNameFromAPI(companyName: string) {
  try {
    const response = await fetch(`https://www.themuse.com/api/public/jobs?company=${companyName}&page=1`);
    let data = await response.json();
    let jobs = data?.results as IJob[];

    if (!(jobs?.length > 0)) {
      return;
    }

    const createdJobs = await Promise.all(
      jobs.map(async x => {
        if (x.locations && x.locations.length > 0) {
          await seedLocations(x.locations);
        }
        if (x.categories && x.categories.length > 0) {
          await seedCategories(x.categories);
        }
        let job = new Job({ ...x });
        await job.save();
        jobsCreated++;
        return job;
      })
    );

    return createdJobs;
  } catch (error) {
    console.log("Error in getJobsByCompanyNameFromAPI: ", error);
  }
}

export async function getCompaniesFromAPI(pageNumber: number) {
  try {
    const response = await fetch(`https://www.themuse.com/api/public/companies?page=${pageNumber.toString()}`);
    let data = await response.json();
    let companies = data?.results as ICompany[];

    if (companies?.length > 0) {
      companies.forEach(async x => {
        if (x.locations && x.locations.length > 0) {
          await seedLocations(x.locations);
        }
        if (x.industries && x.industries.length > 0) {
          await seedIndustries(x.industries);
        }
        const jobList = await getJobsByCompanyNameFromAPI(x.name);
        let company = new Company({ ...x, jobs: jobList });
        await company.save();
        companiesCreated++;
        console.log(
          `Total Companies: ${companiesCreated}, Total Jobs: ${jobsCreated}, Total Locations: ${locationsCreated}, Total Categories: ${categoriesCreated},  Total Industries: ${industriesCreated}`
        );
      });
    }
  } catch (error) {
    console.log("Error in getCompaniesFromAPI: ", error);
  }
}
