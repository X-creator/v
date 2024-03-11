import { forwardRef } from "react";

interface InputProps {
  type: "text" | "number";
  name: string;
  placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ type, name, placeholder = "" }, ref) {
  return (
    <input
      className="h-[38px] w-full appearance-none rounded border border-blue-400 px-[10px] outline-none transition-all hover:shadow-[0_0_0_1px_var(--tw-shadow-color)] hover:shadow-blue-400"
      type={type}
      ref={ref}
      min={0}
      name={name}
      autoComplete="off"
      placeholder={placeholder}
    />
  );
});
