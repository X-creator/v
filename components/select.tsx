import WindowedSelect from "react-windowed-select";
import { forwardRef } from "react";

interface SelectProps {
  options: { value: string; label: string }[];
  name: string;
  placeholder?: string;
}

export const Select = forwardRef(function Select({ options, name, placeholder = "" }: SelectProps, ref) {
  return (
    <WindowedSelect
      isClearable
      ref={ref}
      name={name}
      options={options}
      windowThreshold={10}
      placeholder={placeholder}
      instanceId={name}
      styles={{
        container: (baseStyles, state) => ({
          ...baseStyles,
          width: "100%",
        }),
        clearIndicator: (baseStyles, state) => ({
          ...baseStyles,
          ":hover": { color: "#ef4444" },
          color: "#fca5a5",
        }),
        indicatorSeparator: (baseStyles, state) => ({
          ...baseStyles,
          height: "100%",
          backgroundColor: "#60a5fa",
          marginBottom: 0,
          marginTop: 0,
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          color: "#9ca3af",
        }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          "&:hover": { borderColor: "#60a5fa", boxShadow: "0 0 0 1px #60a5fa" },
          borderColor: "#60a5fa",
          boxShadow: undefined,
        }),
        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          color: "initial",
        }),
      }}
    />
  );
});
