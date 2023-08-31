import { ECommon } from "@/enums/common";

export function toExchange(money: number): string {
  const currentLocale = localStorage.getItem(ECommon.LOCALE)?.toString();
  const currency = currentLocale === "vi" ? "VND" : "USD";
  return money.toLocaleString(currentLocale, {
    style: "currency",
    currency: currency,
  });
}

export function formatPrice(money: number): string {
  const val = (money / 1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function sumProperty(array: any[], properties: string[]): number {
  let sum = 0;
  array.map((item: any) => {
    let mul = 1;
    properties.map((prop) => (mul *= item[prop]));
    sum += mul;
  });
  return sum;
}

export function concatProperty(
  array: any[],
  property: string,
  factor: string
): string {
  let text = "";
  array.map((item: any, index: number) => {
    text += (index === 0 ? "" : factor) + item[property];
  });
  return text;
}

export function addPaddingNumber(number: number, numLen?: number) {
  return number.toString().padStart(numLen || 3, "0");
}

export function concatList(array: any[], factor: string): string {
  let text = "";
  array.map((item: any, index: number) => {
    if (item) text += (index === 0 ? "" : factor) + item;
  });
  return text;
}
