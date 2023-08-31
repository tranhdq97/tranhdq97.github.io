import authAxios from "@/auth_axios";
import { EAItem, EAOrder, EATable } from "@/enums/api";
import { ERouterParams } from "@/enums/common";
import { ESCart } from "@/enums/store";
import { IAListRes } from "@/interfaces/api";
import { IFMenuItem } from "@/interfaces/menu";
import { formURL } from "@/util/url";
import axios from "axios";
import { ITEM_RENDER_EVT } from "element-plus/es/components/virtual-list/src/defaults";

export interface IFState {
  meals: Array<any>;
  keyword: string;
  quantitySearch: number;
}

export default {
  namespaced: true,
  state: {
    meals: [],
    keyword: "",
    quantitySearch: 0,
  },
  _getters: {
    allMeals: (state: IFState) => state.meals,
    meals: (state: IFState) =>
      state.meals.filter(
        (meal: any) =>
          meal.name.toLowerCase().includes(state.keyword) &&
          meal.quantity >= state.quantitySearch
      ),
  },
  get getters() {
    return this._getters;
  },
  set getters(value) {
    this._getters = value;
  },
  actions: {
    async getMeals({ state, dispatch }: { state: IFState; dispatch: any }) {
      const res: IAListRes = await axios.get(EAItem.LIST);
      state.meals = res.results;
      dispatch("resetQuantity");
    },
    async addMeal({ state }: { state: IFState }, meal: IFMenuItem) {
      const res: IFMenuItem = await authAxios.post(EAItem.CREATE, meal);
      state.meals.push(res);
    },
    changeKeyword({ state }: { state: IFState }, keyword: string) {
      state.keyword = keyword.toLowerCase();
    },
    changeQuantitySearch({ state }: { state: IFState }, quantity: number) {
      state.quantitySearch = quantity;
    },
    changeQuantity(
      { state }: { state: IFState },
      params: { quantity: number; id: number }
    ) {
      const { quantity, id } = params;
      const meals = state.meals.find((meal: any) => meal.id === id);
      if (quantity && +quantity >= 0) {
        meals.quantity = quantity;
      } else {
        meals.quantity = 0;
      }
    },
    resetQuantity({ state }: { state: IFState }) {
      state.meals = state.meals.map((meal: any) => ({ ...meal, quantity: 0 }));
    },
  },
};
