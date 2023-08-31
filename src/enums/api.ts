export enum EAFileManagement {
  CREATE = "file-management/create",
  LIST = "file-management/list",
  DETAIL = "file-management/:id/detail",
  UPDATE = "file-management/:id/update",
  DELETE = "file-management/:id/delete",
}

export enum EAAddress {}

export enum EAAuth {
  TOKEN = "auth/token",
  REFRESH_TOKEN = "auth/token/refresh",
  GET_ME = "auth/get-me",
  CHANGE_PASSWORD = "auth/change-password",
}

export enum EACustomer {
  CREATE = "customer/create",
  LIST = "customer/list",
  DETAIL = "customer/:id/detail",
  DELETE = "customer/:id/delete",
  UPDATE = "customer/:id/update",
}

export enum EAMaster {
  CREATE = "master/:master_name/create",
  LIST = "master/:master_name/list",
  DELETE = "master/:master_name/:id/list",
}

export enum EAItem {
  CREATE = "item/create",
  LIST = "item/list",
  DETAIL = "item/:id/detail",
  UPDATE = "item/:id/update",
  DELETE = "item/:id/delete",
}

export enum EAOrder {
  CREATE = "order/create",
  LIST = "order/list",
  DETAIL = "order/:id/detail",
  UPDATE = "order/:id/update",
  DELETE = "order/:id/delete",
}
export enum EAOrderItem {
  CREATE = "order_item/create",
  LIST = "order_item/list",
  DETAIL = "order_item/:id/detail",
  UPDATE = "order_item/:id",
  DELETE = "order_item/:id/delete",
}
export enum EAProfile {
  CREATE = "profile/create",
  DETAIL = "profile/:id/detail",
  UPDATE = "profile/:id/update",
  DELETE = "profile/:id/delete",
}

export enum EAStaff {
  CREATE = "staff/create",
  LIST = "staff/list",
  DETAIL = "staff/:id/detail",
  UPDATE = "staff/:id/update",
  DELETE = "staff/:id/delete",
}

export enum EATable {
  CREATE = "table/create",
  LIST = "table/list",
  DETAIL = "table/:id/detail",
  UPDATE = "table/:id/update",
  DELETE = "table/:id/delete",
  JOIN_TABLE = "table/:id/staff_in",
  OUT_TABLE = "table/:id/staff_out",
  GET_ORDER = "table/:id/order_items",
}
