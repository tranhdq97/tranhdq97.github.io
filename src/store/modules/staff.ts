import authAxios from "@/auth_axios";
import { EAStaff } from "@/enums/api";
import { ERouterParams } from "@/enums/common";
import { ESStaff } from "@/enums/store";
import { IAListRes } from "@/interfaces/api";
import { IFStaff, IFStaffRep } from "@/interfaces/staff";
import { concatList } from "@/util/common";
import { toUnderscore } from "@/util/str";
import { toDMY } from "@/util/time";
import { formURL } from "@/util/url";
import { useI18n } from "vue3-i18n";
import { Commit } from "vuex";

export interface IFState {
  staffList: IFStaff[];
  count: number;
  next: string;
  currentPage: number;
  alreadyPage: number;
}

export default {
  namespaced: true,
  state: {
    staffList: [],
    count: 0,
    currentPage: 0,
    alreadyPage: 0,
    next: "",
  } as IFState,
  getters: {
    staff: (state: IFState) => (id: number) =>
      state.staffList.find((item) => item.id === id),
    staffs: (state: IFState) => (staff: IFStaff) => {
      const staffs = state.staffList.filter(
        (item) =>
          item.currentPage === (state.currentPage || 1) &&
          ![staff?.type?.id || 0, 1].includes(item?.type?.id || 0)
      );
      const staffReps: IFStaffRep[] = [];
      const { t } = useI18n();
      staffs.map((item) => {
        staffReps.push({
          id: item.id as number,
          phone_number: item?.profile?.phone_number as string,
          first_name: item?.profile?.first_name as string,
          last_name: item?.profile?.last_name as string,
          email: item?.email,
          type: t(toUnderscore(item?.type?.name || "", true)),
          dob: toDMY(item?.profile?.dob as Date, "/"),
          sex: item?.profile?.sex?.name as string,
          address: concatList(
            [
              item?.profile?.address?.street,
              item?.profile?.address?.district?.name,
              item?.profile?.address?.district?.city?.name,
              item?.profile?.address?.district?.city?.country?.name,
            ],
            ", "
          ),
        });
      });
      return staffReps;
    },
    searchedStaffs: (state: IFState) => (value: string) => {
      state.staffList.find((item) => {
        const searchingList = [item.email];
        if (item?.profile?.phone_number)
          searchingList.push(item?.profile?.phone_number);
        if (item?.profile?.first_name)
          searchingList.push(item?.profile?.first_name);
        if (item?.profile?.last_name)
          searchingList.push(item?.profile?.last_name);
        return value in searchingList;
      });
    },
    isNext: (state: IFState) => !!state.next,
    isPrevious: (state: IFState) => state.currentPage > 1,
  },
  actions: {
    async getStaffs({ state }: { state: IFState }) {
      const res: IAListRes = await authAxios.get(EAStaff.LIST);
      state.staffList = res.results as IFStaff[];
      state.count = res.count;
      state.next = res.next as string;
      state.currentPage = 1;
      state.staffList.map((item) => (item.currentPage = state.currentPage));
    },
    async nextPage({ state }: { state: IFState }) {
      if (!state.next) return;
      if (
        state.currentPage >= state.alreadyPage &&
        state.currentPage < state.count
      ) {
        const res: IAListRes = await authAxios.get(state.next);
        if (!(res.results as IFStaff[]).length) return;
        state.next = res.next as string;
        state.alreadyPage = state.alreadyPage + 1;
        state.count = res.count;
        (res.results as IFStaff[]).map((item) => {
          item.currentPage = state.currentPage + 1;
          state.staffList.push(item);
        });
      }
      state.currentPage = state.currentPage + 1;
    },
    previousPage({ state }: { state: IFState }) {
      if (state.currentPage <= 1) return;
      state.currentPage = state.currentPage - 1;
    },
    async updateStaff(
      { commit }: { commit: Commit },
      params: { staff: IFStaff; updateData: IFStaff }
    ) {
      const URL = formURL(EAStaff.UPDATE, [
        { key: ERouterParams.INDEX, value: params.staff.id },
      ]);
      const res: IFStaff = await authAxios.put(URL, params.updateData);
      commit(ESStaff.M_UPDATE, res, { root: true });
      return res;
    },
  },
  mutations: {
    removeStaff(state: IFState, staff: IFStaff) {
      const index = state.staffList.indexOf(staff);
      if (index > -1) {
        state.staffList.splice(index, 1);
      }
    },
    addStaff(state: IFState, staff: IFStaff) {
      state.staffList.push(staff);
    },
    update(state: IFState, staff: IFStaff) {
      const updatingStaff = state.staffList.find(
        (item) => staff.id === item?.id
      ) as IFStaff;
      if (updatingStaff) {
        updatingStaff.type = staff.type;
        updatingStaff.profile = staff.profile;
      } else {
        state.staffList.push(staff);
      }
    },
  },
};
