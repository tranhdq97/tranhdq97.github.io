import { IFRouterParams } from "@/interfaces/common";

export function formURL(
  baseURL: string,
  replaced_params?: Array<IFRouterParams>,
  params?: Array<IFRouterParams>
) {
  replaced_params?.map((val) => {
    if (val.value) baseURL = baseURL.replace(val.key, val.value.toString());
  });
  if (params) {
    baseURL += "?";
    params.map((val, index) => {
      if (val.key && val.value) {
        baseURL += val.key + "=" + val.value;
        if (index + 1 < params.length) baseURL += "&";
      }
    });
  }
  return baseURL;
}
