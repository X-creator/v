import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <button className="h-[38px] w-full appearance-none rounded border border-blue-400 bg-blue-400 px-[10px] text-white outline-none transition-all will-change-transform hover:shadow-[0_0_0_1px_var(--tw-shadow-color)] hover:shadow-blue-400 active:scale-95">
      {children}
    </button>
  );
};
