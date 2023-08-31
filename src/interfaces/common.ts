export interface IFSearchItem {
  id: number;
  name?: string;
}

export interface IFMasterData {
  id?: number;
  name?: string;
}

export interface IFCity {
  id: number;
  name: string;
  country?: IFMasterData;
}

export interface IFDistrict {
  id: number;
  name: string;
  zipcode?: string;
  city: IFCity;
}

export interface IFAddress {
  id: number;
  district: IFDistrict;
  street?: string;
}

export interface IFProfile {
  id: number;
  phone_number: string;
  first_name?: string;
  last_name?: string;
  dob?: Date;
  address?: IFAddress;
  sex?: IFMasterData;
}

export interface IFToken {
  access: string;
  refresh: string;
}

export interface IFTimeDiff {
  diffDays: number;
  diffHours: number;
  diffMins: number;
  diffSecs: number;
}

export interface IFRouterParams {
  key: string;
  value: string | number | boolean | undefined;
}
