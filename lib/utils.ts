import md5 from "md5";
import { MakeUrl, Options } from "@/types";

const getTimestamp = () =>
  new Date()
    .toISOString() //
    .split("T")[0]
    .replaceAll("-", "");

export const generateXAuth = (): string => md5(`${process.env.PASSWORD}_${getTimestamp()}`);

export const getUniqueByProp = <T = Record<string, any>>(arr: T[], prop: keyof T): T[] =>
  Object.values(
    arr.reduce(
      (res, obj) => {
        const val = `${obj[prop]}`;
        if (!res[val]) res[val] = obj;
        return res;
      },
      {} as Record<string, T>,
    ),
  );

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export const retry = async <T>(
  promise: Promise<T>,
  onError = console.log,
  tries = 20,
  delay = 200,
): Promise<never | T> => {
  for (let i = 0; i < tries; i++) {
    try {
      return await promise;
    } catch (err) {
      if (err instanceof Error) {
        onError(err.message);
        await sleep(delay + 100 * i);
      }
    }
  }
  throw new Error("Oops!");
};

export const paginator = ({ total, limit, current, leftRange = 2, rightRange = 2 }: Record<string, number>) => {
  const start = 1;
  const end = Math.ceil(Math.abs(total / limit)) || 1;
  const pages = [start];
  let currentPage = start;

  if (start < end) {
    const emptySpace = NaN;
    currentPage = current < start ? start : current > end ? end : current;

    let from = Math.max(start + 1, currentPage - leftRange);
    from = from - start === 2 ? from - 1 : from;
    let to = Math.min(end, currentPage + rightRange);
    to = end - to === 2 ? to + 1 : to;

    if (from - start > 2) pages.push(emptySpace);
    for (let i = from; i <= to; i++) pages.push(i);
    if (end - to > 1) pages.push(emptySpace);
    if (end > to) pages.push(end);
  }

  return {
    pages,
    currentPage,
    prevPage: currentPage === start ? null : currentPage - 1,
    nextPage: currentPage === end ? null : currentPage + 1,
  };
};

// @ts-ignore
export const makeUrl: MakeUrl = (options) => {
  if (Object.keys(options).length < 4) {
    return (partialOptions) => makeUrl({ ...partialOptions, ...options });
  } else {
    const { path, searchParams, page, hash } = options as Options;
    return `${path}?${new URLSearchParams({
      ...searchParams,
      page: `${page}`,
    }).toString()}#${hash}`;
  }
};
