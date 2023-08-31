export enum ESSideBar {
  G_IS_SIDEBAR_COLLAPSED = "sideBar/isSideBarCollapsed",
  A_TOGGLE_SIDEBAR = "sideBar/toggleSideBar",
  A_COLLAPSE_SIDEBAR = "sideBar/collapseSideBar",
}

export enum ESItem {
  G_ALL_MEALS = "item/allMeals",
  G_MEALS = "item/meals",
  G_AVAILABLE_MENU = "item/availableItem",
  A_GET_MEALS = "item/getMeals",
  A_ADD_MEAL = "item/addMeal",
  A_CHANGE_QUANTITY = "item/changeQuantity",
  A_CHANGE_KEYWORD = "item/changeKeyword",
  A_CHANGE_QUANTITY_SEARCH = "item/changeQuantitySearch",
  A_RESET_QUANTITY = "item/resetQuantity",
}

export enum ESOrderItem {
  G_ORDER_PREVIEW_LIST = "order_item/orderItemPreviewList",
  G_ORDERED_LIST = "order_item/orderedItemList",
  G_TABLE_REP_DATA = "order_item/tableRepData",
  A_GET_ORDER_ITEMS = "order_item/getOrderItems",
  A_GET_ORDER_ITEM = "order_item/getOrderItem",
  A_ADD_TO_ORDER_PREVIEW = "order_item/addToOrderPreview",
  A_INCREASE_QUANTITY = "order_item/increaseQuantity",
  A_DECREASE_QUANTITY = "order_item/decreaseQuantity",
  A_ORDER = "order_item/order",
  A_SERVE = "order_item/serve",
  A_PAY = "order_item/pay",
  M_REMOVE_ORDER_ITEM = "order_item/removeOrderItem",
  M_UPDATE = "order_item/update",
  A_CHANGE_QUANTITY = "order_item/changeQuantity",
  A_REMOVE = "order_item/remove",
}

export enum ESOrder {
  G_ORDER_LIST = "order/orderList",
  G_ORDER = "order/order",
  G_ORDER_BY_TABLE = "order/orderByTable",
  A_ADD_ORDER = "order/addOrder",
  A_GET_ORDERS = "order/getOrders",
  A_GET_ORDER = "order/getOrder",
  A_UPDATE_ORDER = "order/updateOrder",
  M_REMOVE_ORDER = "order/removeOrder",
  M_UPDATE = "order/update",
  A_ORDER = "order/order",
}

export enum ESTable {
  G_TABLES = "table/tables",
  G_TABLE = "table/table",
  A_ADD_TABLE = "table/addTable",
  A_GET_TABLES = "table/getTables",
  A_GET_TABLE = "table/getTable",
  A_UPDATE_TABLE = "table/updateTable",
  A_JOIN_TABLE = "table/joinTable",
  A_OUT_TABLE = "table/outTable",
  A_INIT_TABLE = "table/initTable",
  M_UPDATE_TABLE = "table/update",
}

export enum ESBill {
  G_VAT = "bill/VAT",
}

export enum ESAuth {
  G_USER = "auth/user",
  A_SIGN_UP = "auth/signUp",
  A_SIGN_IN = "auth/signIn",
  A_SIGN_OUT = "auth/signOut",
  A_REFRESH = "auth/refreshToken",
  A_GET_ME = "auth/getMe",
  M_REMOVE_CURRENT_USER = "auth/removeCurrentUser",
  M_SET_USER = "auth/setUser",
}

export enum ESCustomer {
  G_CUSTOMER_BY_ORDER = "customer/customerByOrder",
  A_SEARCH_CUSTOMER_BY_PN = "customer/searchCustomerByPhoneNumber",
  A_ADD_PHONE_NUMBER = "customer/addPhoneNumber",
  A_UPDATE_CUSTOMER = "customer/updateCustomer",
  M_REMOVE_CUSTOMER = "customer/removeCustomer",
  M_ADD_CUSTOMER = "customer/addCustomer",
  M_UPDATE = "customer/update",
}

export enum ESProfile {
  A_UPDATE_PROFILE = "profile/updateProfile",
}

export enum ESStaff {
  G_STAFF = "staff/staff",
  G_STAFFS = "staff/staffs",
  G_SEARCHED_STAFFS = "staff/searchedStaffs",
  G_IS_NEXT = "staff/isNext",
  G_IS_PREVIOUS = "staff/isPrevious",
  A_GET_STAFFS = "staff/getStaffs",
  A_NEXT_PAGE = "staff/nextPage",
  A_PREVIOUS_PAGE = "staff/previousPage",
  A_UPDATE_STAFF = "staff/updateStaff",
  M_REMOVE_STAFF = "staff/removeStaff",
  M_ADD_STAFF = "staff/addStaff",
  M_UPDATE = "staff/update",
}

export enum ESStaffType {
  G_STAFF_TYPES = "staff_type/staffTypes",
  A_GET_STAFF_TYPES = "staff_type/getStaffTypes",
}

export enum ESMenuType {
  G_MENU_TYPES = "menu_type/menuTypes",
  A_GET_MENU_TYPES = "menu_type/getMenuTypes",
}

export enum ESCart {
  G_IS_IN_CART = "cart/isInCart",
  G_MEALS = "cart/meals",
  G_TOTAL_QUANTITY = "cart/totalQuantity",
  G_ORDER_ITEMS = "cart/orderItems",
  A_ADD_MEAL = "cart/addMeal",
  A_CHANGE_QUANTITY = "cart/changeQuantity",
  A_REMOVE = "cart/remove",
  A_SET_MEALS = "cart/setMeals",
  A_GET_ORDER_ITEMS = "cart/getOrderItems",
}

export enum ESFileManagement {
  A_UPLOAD_FILE = "file_management/uploadFile",
}
