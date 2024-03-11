import { generateXAuth, getUniqueByProp } from "@/lib/utils";
import { FetchData, Item, NotEmpty } from "@/types";

export const fetchData: FetchData = async (params) => {
  const res = await fetch(`${process.env.API}`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json", "X-Auth": generateXAuth() },
  });
  console.log(`STATUS ${res.status}; TEXT - ${res.statusText}`);
  const { result } = await res.json();
  if (res.status >= 500) console.log("RESULT", result);

  return result;
};

export async function getAllIds() {
  const ids = (await fetchData<"get_ids">({ action: "get_ids" })) ?? [];
  return [...new Set(ids)];
}

export async function getItems(ids: string[]) {
  const items = (await fetchData<"get_items">({ action: "get_items", params: { ids } })) ?? [];
  return getUniqueByProp(items, "id");
}

export async function getBrands() {
  const brands = ((await fetchData<"get_fields">({
    action: "get_fields",
    params: { field: "brand" },
  })) ?? []) as (null | string)[];
  return [...new Set(brands)];
}

export async function filter(params: NotEmpty<Item>) {
  const data = (await fetchData<"filter">({ action: "filter", params })) ?? [];
  return [...new Set(data)];
}
