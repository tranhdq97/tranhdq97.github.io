import { IFMasterData, IFProfile } from "./common";

export interface IFStaff {
  id?: number;
  type?: IFMasterData;
  email: string;
  password?: string;
  profile?: IFProfile;
  currentPage?: number;
}

export interface IFStaffRep {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string;
  type: string;
  dob: string;
  sex: string;
  address: string;
}
