export type NotEmpty<T extends Record<string, any>> = {
  [K in keyof T]: { [K2 in K]: T[K] };
}[keyof T];

export type Item = {
  brand: null | string;
  id: string;
  price: number;
  product: string;
};

interface GetIds {
  request: {
    action: "get_ids";
    params?: NotEmpty<{
      offset: number;
      limit: number;
    }>;
  };
  response: {
    result: Item["id"][];
  };
}

interface GetItems {
  request: {
    action: "get_items";
    params?: {
      ids: Item["id"][];
    };
  };
  response: {
    result: null | Item[];
  };
}

interface GetFields {
  request: {
    action: "get_fields";
    params?: NotEmpty<{
      field: keyof Item;
      offset: number;
      limit: number;
    }>;
  };
  response: {
    result: Item[keyof Item][];
  };
}

interface Filter {
  request: {
    action: "filter";
    params?: NotEmpty<Item>;
  };
  response: {
    result: Item["id"][];
  };
}

export type Methods = GetIds | GetItems | GetFields | Filter;

export type FetchDataParams<Action> = Extract<
  Methods,
  {
    request: { action: Action };
  }
>["request"];

export type FetchDataResponse<Action> = Extract<
  Methods,
  {
    request: { action: Action };
  }
>["response"];

export type FetchData = <Action extends Methods["request"]["action"]>(
  params: FetchDataParams<Action>,
) => Promise<never | FetchDataResponse<Action>["result"]>;

export interface Options {
  path: string;
  page: string | number;
  searchParams: Record<string, string>;
  hash: string;
}

export interface MakeUrl {
  <T extends Partial<Options>>(
    options: T,
  ): T extends Options
    ? string //
    : (partialOptions: Partial<Omit<Options, keyof T>>) => MakeUrl;
}
