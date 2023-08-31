import { IFMasterData } from "./common";

export interface IFFileManagement {
  id?: number;
  name?: string;
  file?: string;
  thumbnail?: string;
  desc?: string;
  type?: IFMasterData;
  is_deleted?: boolean;
}
