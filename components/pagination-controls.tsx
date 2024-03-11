import { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx/lite";

interface PaginationControlsProps {
  children: ReactNode;
  href: string;
  isActive: boolean;
  type: "nextOrPrev" | "item";
}

const styles: Record<PaginationControlsProps["type"], { base: string; active: string; notActive: string }> = {
  nextOrPrev: {
    base: "rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-100",
    active: "text-neutral-600 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white",
    notActive: "pointer-events-none text-slate-400 dark:text-neutral-400",
  },
  item: {
    base: "rounded px-3 py-1.5 transition-all duration-300 dark:text-white will-change-contents",
    active: "pointer-events-none font-semibold",
    notActive:
      "bg-transparent text-sm text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white",
  },
};

export const PaginationControls = ({ href, isActive, children, type }: PaginationControlsProps) => (
  <li>
    <Link href={href} className={clsx(styles[type].base, isActive ? styles[type].active : styles[type].notActive)}>
      {children}
    </Link>
  </li>
);
