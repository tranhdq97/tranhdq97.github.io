import { IFCustomer } from "./customer";
import { IFMenuItem } from "./menu";
import { IFStaff } from "./staff";
import { IFTable } from "./tables";

export interface IFOrder {
  id?: number;
  table?: IFTable;
  table_id?: number;
  customer?: IFCustomer;
  customer_id?: number;
  paid_at?: Date;
  num_people?: number;
}

export interface IFOrderItem {
  id?: number;
  table?: IFTable;
  order?: IFOrder;
  menu: IFMenuItem;
  staff?: IFStaff;
  quantity: number;
  served_quantity?: number;
  served_at?: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  created_by?: IFStaff;
}

export interface IFOrderedItemRep {
  id: number;
  name: string;
  quantity: number;
  served_quantity: number;
  price: string;
  created_at: string;
  served_at: string;
  total: string;
  created_by: string;
  iconClasses: object;
}
