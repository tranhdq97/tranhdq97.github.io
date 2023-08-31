import axios from "axios";
import { EAAuth, EAStaff } from "@/enums/api";
import { EToken } from "@/enums/common";
import { IFToken } from "@/interfaces/common";
import { IFStaff } from "@/interfaces/staff";
import { useCookies } from "vue3-cookies";
import authAxios from "@/auth_axios";
import { Commit, Dispatch } from "vuex";
import { ESAuth } from "@/enums/store";

const { cookies } = useCookies();

export interface IFState {
  user: IFStaff | null;
}

export default {
  namespaced: true,
  state: {
    user: null,
  } as IFState,
  getters: {
    user: (state: IFState) => state.user,
  },
  actions: {
    async signUp({ state }: { state: IFState }, user: IFStaff) {
      await axios.post(EAStaff.CREATE, user);
    },
    async signIn({ dispatch }: { dispatch: Dispatch }, user: IFStaff) {
      const res: IFToken = await axios.post(EAAuth.TOKEN, user);
      cookies.set(EToken.ACCESS, res.access);
      cookies.set(EToken.REFRESH, res.refresh);
      await dispatch(ESAuth.A_GET_ME, {}, { root: true });
    },
    signOut({ commit }: { commit: Commit }) {
      cookies.remove(EToken.ACCESS);
      cookies.remove(EToken.REFRESH);
      commit(ESAuth.M_REMOVE_CURRENT_USER, {}, { root: true });
    },
    async refreshToken({ dispatch }: { dispatch: Dispatch }) {
      const res: IFToken = await axios.post(EAAuth.REFRESH_TOKEN, {
        refresh: cookies.get(EToken.REFRESH),
      });
      cookies.set(EToken.ACCESS, res.access);
      cookies.set(EToken.REFRESH, res.refresh);
      dispatch(ESAuth.A_GET_ME, {}, { root: true });
    },
    async getMe({ commit }: { commit: Commit }) {
      const user: IFStaff = await authAxios.get(EAAuth.GET_ME);
      commit(ESAuth.M_SET_USER, user, { root: true });
    },
  },
  mutations: {
    removeCurrentUser(state: IFState) {
      state.user = null;
    },
    setUser(state: IFState, user: IFStaff) {
      state.user = user;
    },
  },
};
