import authAxios from "@/auth_axios";
import { EAFileManagement } from "@/enums/api";
import { IRsFile } from "@/interfaces/api";
import { IFFileManagement } from "@/interfaces/file_management";

export interface IFState {
  files: Array<IFFileManagement>;
}

export default {
  namespaced: true,
  state: {
    files: [],
  } as IFState,
  getters: {},
  actions: {
    async uploadFile(
      { state }: { state: IFState },
      params: {
        file: Blob & IRsFile;
        name: string;
        desc: string;
        type_id: number;
      }
    ) {
      const form = new FormData();
      form.append("file", params.file, params.file.name);
      if (params?.name) form.append("name", params.file.name);
      if (params?.desc) form.append("desc", params.desc);
      if (params?.type_id) form.append("type_id", params.type_id.toString());
      const res: IFFileManagement = await authAxios.post(
        EAFileManagement.CREATE,
        form
      );
      return res;
    },
  },
};
