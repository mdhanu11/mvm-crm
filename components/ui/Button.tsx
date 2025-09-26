import React from 'react';
import { classNames } from '../../utils/classNames';
import type { ButtonVariantTypes } from '../../types/Button.type';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariantTypes;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  iconStart,
  iconEnd,
  className,
  ...rest
}) => {
  const baseClasses =
    'inline-flex items-center justify-center border font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2';

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-6 py-1.5 text-base',
    lg: 'px-7 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent focus:ring-indigo-500',
    black: 'bg-[#130F40] text-white hover:bg-gray-700 border-transparent focus:ring-gray-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 border-transparent focus:ring-gray-400',
    outline: 'bg-transparent text-gray-700  hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 border-transparent focus:ring-red-500',
  };

  const classes = classNames(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-50 cursor-not-allowed',
    className
  );

  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      ) : (
        <>
          {iconStart && <span className="mr-2">{iconStart}</span>}
          {children}
          {iconEnd && <span className="ml-2">{iconEnd}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
