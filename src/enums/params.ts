export enum EPCommon {
  NAME = "name",
  ORDERING = "ordering",
  PAGE = "page",
  PAGE_SIZE = "page_size",
  SEARCH = "search",
  ID = "id",
}

export enum EPTable {
  IS_AVAILABLE = "is_available",
}

export enum EPOrder {
  TABLE_ID__IN = "table_id__in",
}

export enum EPOrderItem {
  ORDER_ID__IN = "order_id__in",
  ORDER__CUSTOMER_ID = "order__customer_id",
}

export enum EPOrder {}

export enum EPCustomer {
  PROFILE__FIRST_NAME = "profile__first_name",
  PROFILE__LAST_NAME = "profile__last_name",
  PROFILE__PHONE_NUMBER = "profile__phone_number",
}
