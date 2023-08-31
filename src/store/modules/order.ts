import authAxios from "@/auth_axios";
import { EAOrder, EATable } from "@/enums/api";
import { ERouterParams } from "@/enums/common";
import { EPCommon, EPOrder } from "@/enums/params";
import { ESCart, ESCustomer, ESItem, ESOrder, ESTable } from "@/enums/store";
import { IAListRes } from "@/interfaces/api";
import { IFOrder } from "@/interfaces/order";
import { IFTable } from "@/interfaces/tables";
import { concatProperty } from "@/util/common";
import { formURL } from "@/util/url";
import { Commit } from "vuex";

export interface IFState {
  orderList: Array<IFOrder>;
}

export default {
  namespaced: true,
  state: {
    orderList: [],
  } as IFState,
  getters: {
    orderList: (state: IFState) => state.orderList,
    order: (state: IFState) => (order: IFOrder) => {
      return state.orderList.find((item: IFOrder) => item.id === order.id);
    },
    orderByTable: (state: IFState) => (table: IFTable) => {
      return state.orderList.find(
        (item) => item?.table?.id === table.id && !item.paid_at
      );
    },
  },
  actions: {
    async order(
      { state, dispatch }: { state: IFState; dispatch: any },
      params: { table_id: number; order_items: Array<object> }
    ) {
      await authAxios.post(EAOrder.CREATE, params);
      dispatch(ESCart.A_GET_ORDER_ITEMS, params.table_id, { root: true });
      dispatch(ESItem.A_RESET_QUANTITY, null, { root: true });
    },
    async addOrder(
      { state, commit }: { state: IFState; commit: Commit },
      order: IFOrder
    ) {
      const res: IFOrder = await authAxios.post(EAOrder.CREATE, order);
      state.orderList.push(res);
      commit(ESTable.M_UPDATE_TABLE, res.table, { root: true });
      return res;
    },
    async getOrders({ state }: { state: IFState }, tables: IFTable[]) {
      if (!tables?.length) return state.orderList;
      const tableIDs = concatProperty(tables, EPCommon.ID, ",");
      const URL = formURL(
        EAOrder.LIST,
        [],
        [{ key: EPOrder.TABLE_ID__IN, value: tableIDs }]
      );
      const res: IAListRes = await authAxios.get(URL);
      state.orderList = res.results as Array<IFOrder>;
      return state.orderList;
    },
    async getOrder({ commit }: { commit: Commit }, table: IFTable) {
      const tableIDs = concatProperty([table], EPCommon.ID, ",");
      const URL = formURL(
        EAOrder.LIST,
        [],
        [{ key: EPOrder.TABLE_ID__IN, value: tableIDs }]
      );
      const res: IAListRes = await authAxios.get(URL);
      const order = res.results[0] as IFOrder;
      if (order) commit(ESOrder.M_UPDATE, order, { root: true });
      if (order?.customer)
        commit(ESCustomer.M_UPDATE, order.customer, { root: true });
      return order;
    },
    async updateOrder(
      { commit }: { commit: Commit },
      params: { order: IFOrder; updateData: IFOrder }
    ) {
      const URL = formURL(EAOrder.UPDATE, [
        { key: ERouterParams.INDEX, value: params.order.id },
      ]);
      const res: IFOrder = await authAxios.put(URL, params.updateData);
      commit(ESOrder.M_UPDATE, res, { root: true });
      if (res?.table) commit(ESTable.M_UPDATE_TABLE, res.table, { root: true });
      if (res?.customer)
        commit(ESCustomer.M_UPDATE, res.customer, { root: true });
      return params.order;
    },
  },
  mutations: {
    removeOrder(state: IFState, order: IFOrder) {
      const index = state.orderList.indexOf(order);
      index > -1 ? state.orderList.splice(index, 1) : null;
    },
    update(state: IFState, order: IFOrder) {
      const updatingOrder = state.orderList.find(
        (item) => order.id === item?.id
      );
      if (updatingOrder) {
        updatingOrder.num_people = order.num_people;
        updatingOrder.paid_at = order.paid_at;
        updatingOrder.table = order.table;
        updatingOrder.customer = order.customer;
      } else {
        state.orderList.push(order);
      }
    },
  },
};
