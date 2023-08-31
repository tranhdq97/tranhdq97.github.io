export enum ECommon {
  EMAIL = "email",
  PASSWORD = "password",
  FIRSTNAME = "first_name",
  LASTNAME = "last_name",
  PHONE_NUMBER = "phone_number",
  LOCALE = "locale",
  SIGNUP = "sign_up",
  SIGNIN = "sign_in",
  SETTING = "setting",
  TABLES = "tables",
  TABLE = "table",
  HOME = "home",
  SIGNOUT = "sign_out",
  STAFFS = "staffs",
  STAFF = "staff",

  DAYS = "days",
  HOURS = "hours",
  MINUTES = "minutes",
  SECONDS = "seconds",
  SEARCH = "search",
  MEAL_NAME = "meal_name",
  QUANTITY = "quantity",
  UNIT_PRICE = "unit_price",
  TOTAL = "total",
  ORDERED_AT = "ordered_at",
  PREVIEW = "preview",
  ORDER = "order",
  SERVED = "served",
  SERVED_AT = "served_at",
  SERVING_QUANTITY = "serving_quantity",
  SERVED_QUANTITY = "served_quantity",
  SERVE = "serve",
  PAY_BILL = "pay_bill",
  VAT = "VAT",
  AMOUNT = "amount",
  NUM_PEOPLE = "num_people",
  UPDATE = "update",
  MENU = "menu",
  DESC = "desc",
  ADD_MEAL = "add_meal",
  MEAL_TYPE = "meal_type",
  ROLE = "role",
  PHOTO = "photo",
}

export enum EPlaceHolder {
  ENTER_EMAIL = "enter_email",
  ENTER_PASSWORD = "enter_password",
  ENTER_PHONENUMBER = "enter_phone_number",
  ENTER_MEAL_NAME = "enter_meal_name",
  ENTER_UNIT_PRICE = "enter_unit_price",
  ENTER_DESC = "enter_desc",
}

export enum EToken {
  ACCESS = "access",
  REFRESH = "refresh",
  EXPIRED = "expired",
}

export enum ERouterParams {
  INDEX = ":id",
  MASTER_NAME = ":master_name",
}

export enum EMasterModel {
  SEX = "m_sex",
  CITY = "m_city",
  COUNTRY = "m_country",
  DISTRICT = "m_district",
  FILE_TYPE = "m_file_type",
  MENU_TYPE = "m_menu_type",
  STAFF_TYPE = "m_staff_type",
}

export enum EMessage {
  PERMISSION_DENIED = "permission_denied",
}

export enum EAssets {
  LOGO = "https://restaurant-bucket-tranhdq-1.s3.ap-southeast-1.amazonaws.com/assets/Ge.svg",
}
