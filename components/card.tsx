import { Item } from "@/types";

interface CardProps {
  item: Item;
}

export const Card = ({ item }: CardProps) => {
  return (
    <div className="flex snap-start flex-col items-center justify-between rounded-lg bg-white text-center shadow-[-25px_9px_25px_-3px_rgba(0,0,0,0.1),_0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className=" px-6 py-3 text-sm text-gray-400 dark:text-neutral-50">{item.id}</div>
      <div className="w-11/12 flex-1 border-b-2 border-t-2 border-neutral-100 p-5 dark:border-neutral-600">
        {item.brand && (
          <h5 className="mb-3 text-xl font-medium leading-tight text-neutral-600 dark:text-neutral-50">{item.brand}</h5>
        )}
        <p className="mb-3 text-base text-neutral-600 dark:text-neutral-200">{item.product}</p>
      </div>
      <div className="px-6 py-3 text-lg font-medium text-amber-300">{item.price} ₽</div>
    </div>
  );
};
