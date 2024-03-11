import { PaginationControls } from "@/components/pagination-controls";
import { Options } from "@/types";

interface PaginationProps {
  makeUrl: (partialOptions: Pick<Options, "page">) => string;
  pages: number[];
  prevPage: null | number;
  currentPage: number;
  nextPage: null | number;
}

export const Pagination = ({ makeUrl, pages, prevPage, currentPage, nextPage }: PaginationProps) => (
  <nav aria-label="Page navigation">
    <ul className="list-style-none flex">
      <PaginationControls href={makeUrl({ page: prevPage ?? currentPage })} isActive={!!prevPage} type="nextOrPrev">
        Назад
      </PaginationControls>

      {pages.map((page, i) =>
        page ? (
          <PaginationControls key={i} href={makeUrl({ page })} isActive={page === currentPage} type="item">
            {page}
          </PaginationControls>
        ) : (
          <span key={i} className="dark:text-white">
            ...
          </span>
        ),
      )}

      <PaginationControls href={makeUrl({ page: nextPage ?? currentPage })} isActive={!!nextPage} type="nextOrPrev">
        Вперед
      </PaginationControls>
    </ul>
  </nav>
);
