"use client";

import { useRouter } from "next/navigation";
import { Select } from "./select";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { FormEvent, useRef } from "react";

interface FilterProps {
  data: (string | null)[];
}

export const Filter = ({ data }: FilterProps) => {
  const router = useRouter();
  const productRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const brandRef = useRef<{ getValue: () => { value: string }[] }>(null);
  const brandOptions = data.reduce(
    (res, brand) => {
      if (brand) res.push({ value: brand, label: brand });
      return res;
    },
    [] as {
      value: string;
      label: string;
    }[],
  );

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const product = productRef.current?.value.trim();
    const price = priceRef.current?.value.trim();
    const brand = brandRef.current?.getValue()[0]?.value.trim();

    const params = {
      ...(brand && { brand }),
      ...(price && { price }),
      ...(product && { product }),
    };

    router.push(`/?${new URLSearchParams(params).toString()}`);
  };

  return (
    <section className="w-full px-5 pb-3">
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-[repeat(auto-fill,_20rem)] gap-4 min-[1032px]:max-[1368px]:grid-cols-[repeat(2,_20rem)]"
      >
        <Input type="text" name="product" placeholder="Изделие" ref={productRef} />
        <Input type="number" name="price" placeholder="Цена" ref={priceRef} />
        <Select options={brandOptions} name="brand" placeholder="Бренд" ref={brandRef} />
        <Button>Применить</Button>
      </form>
    </section>
  );
};
