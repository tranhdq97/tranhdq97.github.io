import authAxios from "@/auth_axios";
import { EACustomer } from "@/enums/api";
import { EPCommon } from "@/enums/params";
import { IAListRes } from "@/interfaces/api";
import { IFCustomer } from "@/interfaces/customer";
import { formURL } from "@/util/url";
import { EOCustomer } from "@/enums/ordering";
import { ERouterParams } from "@/enums/common";
import { Commit, Dispatch } from "vuex";
import { ESCustomer, ESOrder } from "@/enums/store";
import { IFOrder } from "@/interfaces/order";

export interface IFState {
  customerList: IFCustomer[];
}

export default {
  namespaced: true,
  state: {
    customerList: [],
  } as IFState,
  getters: {
    customerList: (state: IFState) => state.customerList,
    customerByOrder: (state: IFState) => (order: IFOrder) =>
      state.customerList.find((item) => item.id === order?.customer?.id),
  },
  actions: {
    async addPhoneNumber(
      { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
      params: { order: IFOrder; phoneNumber: string }
    ) {
      const customer: IFCustomer = await authAxios.post(EACustomer.CREATE, {
        profile: { phone_number: params.phoneNumber },
      });
      commit(ESCustomer.M_ADD_CUSTOMER, customer, { root: true });
      dispatch(
        ESOrder.A_UPDATE_ORDER,
        {
          order: params.order,
          updateData: { customer_id: customer.id },
        },
        { root: true }
      );
      return customer;
    },
    async updateCustomer(
      { commit }: { commit: Commit },
      params: { customer: IFCustomer; updateData: IFCustomer }
    ) {
      const URL = formURL(EACustomer.UPDATE, [
        { key: ERouterParams.INDEX, value: params.customer.id },
      ]);
      const res: IFCustomer = await authAxios.put(URL, params.updateData);
      commit(ESCustomer.M_UPDATE, res, { root: true });
      return res;
    },
    async searchCustomerByPhoneNumber(
      { state }: { state: IFState },
      phoneNumber: string
    ) {
      const URL = formURL(
        EACustomer.LIST,
        [],
        [
          { key: EPCommon.SEARCH, value: phoneNumber },
          { key: EPCommon.PAGE_SIZE, value: 20 },
          { key: EPCommon.PAGE, value: 1 },
          { key: EPCommon.ORDERING, value: EOCustomer.PROFILE__PHONE_NUMBER },
        ]
      );
      const res: IAListRes = await authAxios.get(URL);
      return res.results as IFCustomer[];
    },
  },
  mutations: {
    removeCustomer(state: IFState, customer: IFCustomer) {
      const index = state.customerList.indexOf(customer);
      if (index > -1) {
        state.customerList.splice(index, 1);
      }
    },
    addCustomer(state: IFState, customer: IFCustomer) {
      state.customerList.push(customer);
    },
    update(state: IFState, customer: IFCustomer) {
      const updatingCustomer = state.customerList.find(
        (item) => customer.id === item?.id
      ) as IFCustomer;
      if (updatingCustomer) {
        updatingCustomer.profile = customer.profile;
      } else {
        state.customerList.push(customer);
      }
    },
  },
};
