import React, { SelectHTMLAttributes, forwardRef } from "react";
import { FiChevronDown } from "react-icons/fi";

export interface CustomSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  containerClassName?: string;
  selectClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
  selectSize?: "sm" | "md" | "lg";
  variant?: "primary" | "soft"; // NEW
}

const sizeClasses = {
  sm: "px-2 py-2 text-sm",
  md: "px-3 py-2.5 text-sm",
  lg: "px-4 py-3 text-lg",
};

const Select = forwardRef<HTMLSelectElement, CustomSelectProps>(
  (
    {
      label,
      error,
      iconStart,
      iconEnd,
      containerClassName = "",
      selectClassName = "",
      labelClassName = "",
      errorClassName = "",
      disabled = false,
      selectSize = "md",
      variant = "primary",
      ...props
    },
    ref
  ) => {
    const baseClasses = {
      primary: "border border-gray-300 focus:ring-0 focus:ring-blue-500",
      soft: "bg-gray-100  border border-gray-300 focus:ring-0 focus:ring-blue-300",
    };

    const errorClass = error ? "border-red-500" : "";
    const disabledClass = disabled ? "bg-gray-100 cursor-not-allowed" : "";
    const leftPadding = iconStart ? "pl-10" : "";
    const rightPadding = "pr-10";

    const finalClass = [
      "w-full appearance-none",
      baseClasses[variant],
      "rounded-md focus:outline-none transition text-[#737373]",
      sizeClasses[selectSize],
      leftPadding,
      rightPadding,
      errorClass,
      disabledClass,
      selectClassName,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`relative ${containerClassName}`}>
        {label && (
          <label
            htmlFor={props.id || props.name}
            className={`block font-medium mb-1 ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {iconStart && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {iconStart}
            </div>
          )}

          <select ref={ref} disabled={disabled} className={finalClass} {...props}>
            {props.children}
          </select>

          {/* {iconEnd && (
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-gray-400">
              {iconEnd}
            </div>
          )} */}
           <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {iconEnd ?? <FiChevronDown className="w-4 h-4" />}
          </div>
        </div>

        {error && (
          <p className={`text-xs mt-1 text-red-500 ${errorClassName}`}>{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
