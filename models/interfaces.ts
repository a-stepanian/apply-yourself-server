import { Document } from "mongoose";

export interface ILandingPage {
  landing_page: string;
}

export interface ICategory {
  name: string;
}

export interface ILocation {
  name: string;
}

export interface ILevel {
  name: string;
  short_name: string;
}

export interface ICompany {
  id: number;
  name: string;
  short_name: string;
}

export interface IJob extends Document {
  categories: ICategory[];
  company: ICompany[];
  contents: string;
  levels: ILevel[];
  locations: ILocation[];
  model_type: string;
  name: string;
  publication_date: string;
  refs: ILandingPage;
  short_name: string;
  tags: any[];
  type: string;
}
