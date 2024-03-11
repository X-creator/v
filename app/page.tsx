import { redirect } from "next/navigation";
import { Filter } from "@/components/filter";
import { Card } from "@/components/card";
import { Pagination } from "@/components/pagination";
import { filter, getAllIds, getBrands, getItems } from "@/lib/api";
import { makeUrl, paginator, retry } from "@/lib/utils";
import { Item, NotEmpty } from "@/types";

interface HomeProps {
  searchParams: {
    page?: string;
    brand?: string;
    price?: string;
    product?: string;
  };
}

const LIMIT = 50;
const SCROLL_ANCHOR = "start";

export default async function Home({ searchParams }: HomeProps) {
  const page = Number(searchParams.page) || 1;
  const product = searchParams.product;
  const price = searchParams.price;
  const brand = searchParams.brand;
  const isFiltersApply = Boolean(brand || price || product);

  const params = {
    ...(brand && { brand }),
    ...(price && { price }),
    ...(product && { product }),
  };

  const allIds = await retry(isFiltersApply ? filter(params as NotEmpty<Item>) : getAllIds());

  const { pages, prevPage, currentPage, nextPage } = paginator({ total: allIds.length, limit: LIMIT, current: page });

  if (page !== currentPage)
    redirect(makeUrl({ path: "/", page: currentPage, searchParams: params, hash: SCROLL_ANCHOR }));

  const ids = allIds.slice(
    (page - 1) * LIMIT, //
    page * LIMIT,
  );

  const [items, brands] = await Promise.all([retry(getItems(ids)), retry(getBrands())]);

  return (
    <main className="flex h-dvh flex-col items-center gap-7 pb-8 pt-4">
      <Filter data={brands} />
      <section className="grid h-full w-full snap-y scroll-pt-2 auto-rows-max grid-cols-[repeat(auto-fill,_minmax(16rem,_1fr))] gap-8 overflow-y-auto scroll-smooth border-y border-[#cab2c5] bg-[aliceblue] p-2 [scrollbar-color:_#334155_#e2e8f0] [scrollbar-gutter:_stable] [scrollbar-width:_thin] dark:[scrollbar-color:_#059669_#1c1917]">
        <span id={SCROLL_ANCHOR} className="hidden" />
        {items.length ? items.map((item) => <Card key={item.id} item={item} />) : "Ничего не найдено!"}
      </section>

      <Pagination
        makeUrl={makeUrl({ path: "/", searchParams: params, hash: SCROLL_ANCHOR })}
        pages={pages}
        prevPage={prevPage}
        currentPage={currentPage}
        nextPage={nextPage}
      />
    </main>
  );
}
