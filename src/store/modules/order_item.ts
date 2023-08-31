import authAxios from "@/auth_axios";
import { EAOrder, EAOrderItem } from "@/enums/api";
import {
  ESCart,
  ESCustomer,
  ESOrder,
  ESOrderItem,
  ESTable,
} from "@/enums/store";
import { IFCustomer } from "@/interfaces/customer";
import { IFMenuItem } from "@/interfaces/menu";
import { IFOrderItem, IFOrder } from "@/interfaces/order";
import { IFStaff } from "@/interfaces/staff";
import { IFTable, IFTableRep } from "@/interfaces/tables";
import { formURL } from "@/util/url";
import { ERouterParams } from "@/enums/common";
import { Commit, Dispatch } from "vuex";
import { EPCommon, EPOrderItem } from "@/enums/params";
import { concatProperty } from "@/util/common";
import { IAListRes } from "@/interfaces/api";

export interface IFState {
  orderItemList: Array<IFOrderItem>;
}

export default {
  namespaced: true,
  state: {
    orderItemList: [],
  },
  getters: {
    orderItemPreviewList: (state: IFState) => (table: IFTable) => {
      return state.orderItemList.filter(
        (item) => item?.table?.id === table.id && !item.updated_at
      );
    },
    orderedItemList: (state: IFState) => (table: IFTable) => {
      return state.orderItemList.filter(
        (item) => item?.table?.id === table.id && item.updated_at
      );
    },
    tableRepData: (state: IFState) => (table: IFTable) => {
      let lastServedAt: Date = null as unknown as Date;
      let newestOrderedAt: Date = null as unknown as Date;
      let numServed = 0;
      let numOrders = 0;
      let phoneNumer = undefined;
      state.orderItemList
        .filter((item) => {
          return item?.table?.id === table.id && item.order;
        })
        .map((item, i) => {
          if (i === 0) {
            phoneNumer = item.order?.customer?.profile?.phone_number;
          }
          if (item.served_at) {
            if (lastServedAt) {
              lastServedAt = new Date(
                item.served_at > lastServedAt ? item.served_at : lastServedAt
              );
            } else {
              lastServedAt = new Date(item.served_at);
            }
          }
          if (item.updated_at) {
            if (newestOrderedAt) {
              newestOrderedAt = new Date(
                item.updated_at > newestOrderedAt
                  ? item.updated_at
                  : newestOrderedAt
              );
            } else {
              newestOrderedAt = new Date(item.updated_at);
            }
          }
          numServed += item.served_quantity ? item.served_quantity : 0;
          numOrders += item.quantity;
        });

      const tableRepData: IFTableRep = {
        phoneNumber: phoneNumer,
        lastServedAt: lastServedAt,
        newestOrderedAt: newestOrderedAt,
        numOrders: numOrders,
        numServed: numServed,
      };
      return tableRepData;
    },
  },
  actions: {
    addToOrderPreview(
      { state }: { state: IFState },
      params: {
        menu: IFMenuItem;
        table: IFTable;
        order?: IFOrder;
      }
    ) {
      if (
        state.orderItemList.some(
          (item: IFOrderItem) =>
            item.menu.id === params.menu.id &&
            item.table === params.table &&
            !item.order
        )
      )
        return;
      const newOrderItem = {
        order: params?.order,
        menu: params.menu,
        quantity: 1,
        table: params.table,
      };
      state.orderItemList.push(newOrderItem);
    },
    increaseQuantity({ state }: { state: IFState }, item: IFOrderItem) {
      item.quantity += 1;
    },
    decreaseQuantity({ state }: { state: IFState }, item: IFOrderItem) {
      item.quantity -= 1;
    },
    async getOrderItems({ state }: { state: IFState }, orders: IFOrder[]) {
      if (!orders.length) {
        state.orderItemList = [];
        return;
      }
      const orderIDs = concatProperty(orders, EPCommon.ID, ",");
      const URL = formURL(
        EAOrderItem.LIST,
        [],
        [{ key: EPOrderItem.ORDER_ID__IN, value: orderIDs }]
      );
      const res: IAListRes = await authAxios.get(URL);
      state.orderItemList = res.results as IFOrderItem[];
      state.orderItemList.map((item) => {
        item.table = item.order?.table;
      });
    },
    async getOrderItem({ commit }: { commit: Commit }, order: IFOrder) {
      const orderIDs = concatProperty([order], EPCommon.ID, ",");
      const URL = formURL(
        EAOrderItem.LIST,
        [],
        [{ key: EPOrderItem.ORDER_ID__IN, value: orderIDs }]
      );
      const res: IAListRes = await authAxios.get(URL);
      const orderItems = res.results as IFOrderItem[];
      orderItems.map((item) => {
        item.table = order?.table;
        commit(ESOrderItem.M_UPDATE, item, { root: true });
      });
    },
    async order(
      {
        state,
        commit,
        dispatch,
      }: { state: IFState; commit: Commit; dispatch: Dispatch },
      params: {
        table: IFTable;
        items: IFOrderItem[];
        tableOrder?: IFOrder;
        customer?: IFCustomer;
        staff: IFStaff;
      }
    ) {
      let table: IFTable = params.table;
      let tableOrder = params.tableOrder;
      if (table.is_available) {
        table = await dispatch(
          ESTable.A_UPDATE_TABLE,
          {
            table: params.table,
            updateData: { is_available: false },
          },
          { root: true }
        );
      }
      if (!params.tableOrder) {
        tableOrder = await dispatch(
          ESOrder.A_ADD_ORDER,
          {
            table_id: table.id,
            num_people: 1,
            customer_id: params?.customer?.id || 0,
          },
          { root: true }
        );
      }
      params.items.map(async (previewOrderItem: IFOrderItem) => {
        const orderedItem = state.orderItemList.find(
          (item: IFOrderItem) =>
            previewOrderItem.menu.id === item.menu.id &&
            previewOrderItem.table?.id === item?.table?.id &&
            item.order
        );
        if (orderedItem) {
          const updateURL = formURL(EAOrderItem.UPDATE, [
            { key: ERouterParams.INDEX, value: orderedItem.id },
          ]);
          const res: IFOrderItem = await authAxios.put(updateURL, {
            quantity: orderedItem.quantity + previewOrderItem.quantity,
            created_by_id: params.staff.id,
          });
          res.table = params.table;
          res.updated_at = new Date(res.updated_at as string);
          commit(ESOrderItem.M_UPDATE, res, { root: true });
        } else {
          const res: IFOrderItem = await authAxios.post(EAOrderItem.CREATE, {
            quantity: previewOrderItem.quantity,
            created_by_id: params.staff.id,
            order_id: tableOrder?.id,
            menu_id: previewOrderItem.menu.id,
          });
          res.table = params.table;
          res.created_at = new Date(res.created_at as string);
          res.updated_at = new Date(res.updated_at as string);
          commit(ESOrderItem.M_UPDATE, res, { root: true });
        }
        commit(ESOrderItem.M_REMOVE_ORDER_ITEM, previewOrderItem, {
          root: true,
        });
      });
    },
    async serve(
      { commit }: { commit: Commit },
      params: { item: IFOrderItem; serveQuantity: number }
    ) {
      const URL = formURL(EAOrderItem.UPDATE, [
        { key: ERouterParams.INDEX, value: params.item.id },
      ]);
      const res: IFOrderItem = await authAxios.put(URL, {
        served_quantity:
          (params.item?.served_quantity || 0) + params.serveQuantity,
        served_at: new Date(Date.now()).toISOString(),
      });
      res.served_at = new Date(res.served_at as string);
      commit(ESOrderItem.M_UPDATE, res, { root: true });
    },
    async pay(
      { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
      params: {
        order: IFOrder;
        customer: IFCustomer;
        orderItems: IFOrderItem[];
      }
    ) {
      params.orderItems.map((item) =>
        commit(ESOrderItem.M_REMOVE_ORDER_ITEM, item, { root: true })
      );
      const URL = formURL(EAOrder.UPDATE, [
        { key: ERouterParams.INDEX, value: params.order.id },
      ]);
      await authAxios.put(URL, {
        paid_at: new Date(Date.now()).toISOString(),
      });
      await dispatch(
        ESTable.A_UPDATE_TABLE,
        {
          table: params.order.table,
          updateData: { is_available: true },
        },
        { root: true }
      );
      commit(ESOrder.M_REMOVE_ORDER, params.order, { root: true });
      if (params?.customer)
        commit(ESCustomer.M_REMOVE_CUSTOMER, params.customer, { root: true });
      params.orderItems.map((item) =>
        commit(ESOrderItem.M_REMOVE_ORDER_ITEM, item, { root: true })
      );
    },
    async changeQuantity(
      { state, dispatch }: { state: IFState; dispatch: any },
      params: { id: number; data: object }
    ) {
      const { id, data } = params;

      const URL = formURL(EAOrderItem.UPDATE, [
        { key: ERouterParams.INDEX, value: id },
      ]);
      await authAxios.put(URL, data);
    },
    async remove({ state }: { state: IFState }, id: number) {
      const URL = formURL(EAOrderItem.DELETE, [
        { key: ERouterParams.INDEX, value: id },
      ]);
      await authAxios.delete(URL);
    },
  },
  mutations: {
    removeOrderItem(state: IFState, item: IFOrderItem) {
      const index = state.orderItemList.indexOf(item);
      index > -1 ? state.orderItemList.splice(index, 1) : null;
    },
    update(state: IFState, orderItem: IFOrderItem) {
      const updatingOrderItem = state.orderItemList.find(
        (item) => orderItem.id === item?.id
      );
      if (updatingOrderItem) {
        updatingOrderItem.order = orderItem.order;
        updatingOrderItem.menu = orderItem.menu;
        updatingOrderItem.quantity = orderItem.quantity;
        updatingOrderItem.served_quantity = orderItem.served_quantity;
        updatingOrderItem.served_at = orderItem.served_at;
        updatingOrderItem.created_at = orderItem.created_at;
        updatingOrderItem.updated_at = orderItem.updated_at;
        updatingOrderItem.created_by = orderItem.created_by;
      } else {
        state.orderItemList.push(orderItem);
      }
    },
  },
};
