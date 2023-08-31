import authAxios from "@/auth_axios";
import { EATable } from "@/enums/api";
import { ERouterParams } from "@/enums/common";
import { IFMenuItem } from "@/interfaces/menu";
import { formURL } from "@/util/url";

export interface IFState {
  orderItems: Array<object>;
}

export default {
  namespaced: true,
  state: {
    orderItems: [],
  } as IFState,
  getters: {
    orderItems: (state: IFState) => state.orderItems,
    totalQuantity: (state: IFState) =>
      state.orderItems.reduce(
        (total: number, item: any) => ((total += item.quantity), total),
        0
      ),
  },
  actions: {
    async getOrderItems(
      { state, dispatch }: { state: IFState; dispatch: any },
      tableId: number
    ) {
      const URL = formURL(EATable.GET_ORDER, [
        { key: ERouterParams.INDEX, value: tableId },
      ]);
      const res: Array<object> = await authAxios.get(URL);
      state.orderItems = res;
    },
    remove({ state }: { state: IFState }, id: number) {
      // state.meals = state.meals.filter((m: any) => m.id !== id);
    },
  },
};
