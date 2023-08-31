import { IFMasterData } from "./common";
import { IFFileManagement } from "./file_management";

export interface IFMenuItem {
  id?: number;
  name: string;
  type?: IFMasterData;
  type_id?: number;
  price?: number;
  photo_id?: number;
  photo?: IFFileManagement;
  desc?: string;
  is_available?: boolean;
}
