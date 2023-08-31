import { ERouterParams, EMasterModel } from "@/enums/common";
import { IAListRes } from "@/interfaces/api";
import { IFMasterData } from "@/interfaces/common";
import { formURL } from "@/util/url";
import { EAMaster } from "@/enums/api";
import axios from "axios";
import { toUnderscore } from "@/util/str";
import { useI18n } from "vue3-i18n";

export interface IFState {
  typeList: IFMasterData[];
}

export default {
  namespaced: true,
  state: {
    typeList: [],
  } as IFState,
  getters: {
    staffTypes: (state: IFState) =>
      state.typeList.sort((a, b) =>
        (a?.name || "") < (b?.name || "") ? 1 : -1
      ),
  },
  actions: {
    async getStaffTypes({ state }: { state: IFState }) {
      const { t } = useI18n();
      const URL = formURL(EAMaster.LIST, [
        { key: ERouterParams.MASTER_NAME, value: EMasterModel.STAFF_TYPE },
      ]);
      const res: IAListRes = await axios.get(URL);
      state.typeList = res.results as IFMasterData[];
      state.typeList.map((item) => {
        item.name = t(toUnderscore(item?.name || "", true));
      });
    },
  },
};
