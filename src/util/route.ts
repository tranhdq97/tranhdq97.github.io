import { IFRouterParams } from "@/interfaces/common";

export function formRouter(
  baseRoute: string,
  replaced_params?: Array<IFRouterParams>
) {
  replaced_params?.map((val) => {
    if (val.value) baseRoute = baseRoute.replace(val.key, val.value.toString());
  });
  return baseRoute;
}
