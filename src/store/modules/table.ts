import authAxios from "@/auth_axios";
import { EATable } from "@/enums/api";
import { ERouterParams } from "@/enums/common";
import { ESCart, ESItem, ESOrder, ESOrderItem, ESTable } from "@/enums/store";
import { IAListRes } from "@/interfaces/api";
import { IFTable } from "@/interfaces/tables";
import { addPaddingNumber } from "@/util/common";
import { formURL } from "@/util/url";
import axios from "axios";
import { Commit, Dispatch } from "vuex";

export interface IFState {
  tables: Array<IFTable>;
}

export default {
  namespaced: true,
  state: {
    tables: [],
  } as IFState,
  getters: {
    tables: (state: IFState) => state.tables,
    table: (state: IFState) => (id: number) =>
      state.tables.find((table) => table.id === id),
  },
  actions: {
    async addTable({ state }: { state: IFState }) {
      const listLength = state.tables.length;
      const tableName = addPaddingNumber(listLength + 1);
      const table: IFTable = await authAxios.post(EATable.CREATE, {
        name: tableName,
      });
      state.tables.push(table);
    },
    async getTables({
      state,
      dispatch,
    }: {
      state: IFState;
      dispatch: Dispatch;
    }) {
      const tableRes: IAListRes = await authAxios.get(EATable.LIST);
      state.tables = tableRes.results as Array<IFTable>;
      if (state.tables) {
        const orders = await dispatch(
          ESOrder.A_GET_ORDERS,
          tableRes.results as IFTable[],
          { root: true }
        );
        if (orders) {
          await dispatch(ESOrderItem.A_GET_ORDER_ITEMS, orders, { root: true });
        }
      }
    },
    async getTable({ state }: { state: IFState }, table: IFTable) {
      const URL = formURL(EATable.DETAIL, [
        { key: ERouterParams.INDEX, value: table.id },
      ]);
      const res: IFTable = await axios.get(URL);
      return res;
    },
    async initTable(
      { dispatch, commit }: { dispatch: Dispatch; commit: Commit },
      table: IFTable
    ) {
      const resTable = await dispatch(ESTable.A_GET_TABLE, table, {
        root: true,
      });
      commit(ESTable.M_UPDATE_TABLE, resTable, { root: true });
      const order = await dispatch(ESOrder.A_GET_ORDER, table, { root: true });
      if (order) {
        await dispatch(ESOrderItem.A_GET_ORDER_ITEM, order, { root: true });
      }
    },
    async updateTable(
      { state }: { state: IFState },
      params: { table: IFTable; updateData: IFTable }
    ) {
      const URL = formURL(EATable.UPDATE, [
        { key: ERouterParams.INDEX, value: params.table.id },
      ]);
      await authAxios.put(URL, params.updateData);
      params.table = { ...params.table, ...params.updateData };
      return params.table;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async joinTable({ state }: { state: IFState }, id: number) {
      const URL = formURL(EATable.JOIN_TABLE, [
        {
          key: ERouterParams.INDEX,
          value: id,
        },
      ]);
      await authAxios.put(URL);
    },
    async outTable(
      { state, dispatch }: { state: IFState; dispatch: any },
      id: number
    ) {
      const URL = formURL(EATable.OUT_TABLE, [
        {
          key: ERouterParams.INDEX,
          value: id,
        },
      ]);
      await authAxios.put(URL);
      dispatch("getTables");
    },
    async getOrder(
      { state, dispatch }: { state: IFState; dispatch: any },
      tableId: number
    ) {
      const URL = formURL(EATable.GET_ORDER, [
        { key: ERouterParams.INDEX, value: tableId },
      ]);
      const res = await authAxios.get(URL);
      dispatch(ESCart.A_SET_MEALS, res);
    },
  },
  mutations: {
    update(state: IFState, table: IFTable) {
      const updatingTable = state.tables.find((item) => table.id === item?.id);
      if (updatingTable) {
        updatingTable.is_available = table.is_available;
      }
    },
  },
};
