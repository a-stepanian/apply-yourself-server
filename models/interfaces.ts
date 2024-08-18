import { Document } from "mongoose";

export interface ILandingPage {
  landing_page: string;
}

export interface IHasName {
  name: string;
}

export interface ILevel extends IHasName {
  short_name: string;
}

export interface ICompany extends Document {
  id: number;
  name: string;
  short_name: string;
  description?: string;
  locations?: IHasName[];
  industries?: IHasName[];
  tags?: any[];
  publication_date?: string;
  model_type?: string;
  twitter?: any;
  size?: ILevel;
  refs?: any;
  jobs?: IJob[];
}

export interface IJob extends Document {
  categories: IHasName[];
  company: ICompany[];
  contents: string;
  levels: ILevel[];
  locations: IHasName[];
  model_type: string;
  name: string;
  publication_date: string;
  refs: ILandingPage;
  short_name: string;
  tags: any[];
  type: string;
}
