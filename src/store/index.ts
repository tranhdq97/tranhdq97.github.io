import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import sideBar from "./modules/sideBar";
import item from "./modules/item";
import order from "./modules/order";
import order_item from "./modules/order_item";
import table from "./modules/table";
import bill from "./modules/bill";
import auth from "./modules/auth";
import customer from "./modules/customer";
import staff from "./modules/staff";
import staff_type from "./modules/staff_type";
import cart from "./modules/cart";
import menu_type from "./modules/menu_type";
import file_management from "./modules/file_management";

export default createStore({
  modules: {
    sideBar,
    item,
    order,
    order_item,
    table,
    bill,
    auth,
    customer,
    staff,
    staff_type,
    cart,
    menu_type,
    file_management,
  },
  plugins: [createPersistedState()],
});
