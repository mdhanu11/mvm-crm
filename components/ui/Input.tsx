import React, {
    InputHTMLAttributes,
    forwardRef,
    ChangeEvent,
    useState,
    useId,
    useRef,
} from "react";
import { FiChevronDown } from "react-icons/fi";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    inputSize?: "sm" | "md" | "lg";
    iconStart?: React.ReactNode;
    iconEnd?: React.ReactNode;
    containerClassName?: string;
    inputClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
    helperClassName?: string;
    disabled?: boolean;
    variant?: "primary" | "soft" | "outline";
    required?: boolean;

    // Dropdown Props
    dropdownOptions?: { label: string; value: string }[];
    dropdownValue?: string;
    onDropdownChange?: (e: ChangeEvent<HTMLSelectElement>) => void;

    textArea?: boolean;
    rows?: number;
    resize?: "none" | "vertical" | "horizontal" | "both";
}

const sizeClasses = {
    sm: {
        input: "px-3 py-2 text-sm",
        icon: "w-4 h-4",
        label: "text-xs",
        fileButton: "px-3 py-2 text-sm",
        textarea: "px-3 py-2 text-sm",
    },
    md: {
        input: "px-3 py-2.5 text-sm",
        icon: "w-5 h-5",
        label: "text-sm",
        fileButton: "px-4 py-2.5 text-sm",
        textarea: "px-3 py-2.5 text-sm",
    },
    lg: {
        input: "px-4 py-3 text-base",
        icon: "w-5 h-5",
        label: "text-sm",
        fileButton: "px-5 py-3 text-base",
        textarea: "px-4 py-3 text-base",
    },
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            iconStart,
            iconEnd,
            containerClassName = "",
            inputClassName = "",
            labelClassName = "",
            errorClassName = "",
            helperClassName = "",
            disabled = false,
            inputSize = "md",
            variant = "primary",
            required = false,
            dropdownOptions,
            dropdownValue,
            onDropdownChange,
            type = "text",
            accept,
            onChange,
            textArea = false,
            rows = 4,
            resize = "vertical",
            ...props
        },
        ref
    ) => {

        const getResizeClass = () => {
            switch (resize) {
                case "none": return "resize-none";
                case "vertical": return "resize-y";
                case "horizontal": return "resize-x";
                case "both": return "resize";
                default: return "resize-y";
            }
        };
        const [isFocused, setIsFocused] = useState(false);
        const [selectedFile, setSelectedFile] = useState<string>("No file chosen");
        const fileInputRef = useRef<HTMLInputElement>(null);
        const id = useId();
        const inputId = props.id || `input-${id}`;
        const errorId = `error-${id}`;
        const helperId = `helper-${id}`;

        const baseInputClasses = {
            primary: `
                border border-gray-300 bg-white
                focus:border-gray-500 focus:ring-0
                hover:border-gray-400 
            `,
            soft: `
                bg-gray-100 border border-gray-200
                focus:border-gray-500 focus:ring-0
                hover:border-gray-300 hover:bg-gray-100/50
            `,
            outline: `
                border-2 border-gray-200 bg-transparent
                focus:border-gray-500 focus:ring-0
                hover:border-gray-300
            `,
        };

        const getStateClasses = () => {
            if (error) return "border-red-500 focus:border-red-500 focus:ring-red-500/20";
            if (disabled) return "bg-gray-50 border-gray-200 cursor-not-allowed opacity-60";
            return "";
        };

        const leftPadding = iconStart || dropdownOptions ? "pl-10" : "";
        const rightPadding = iconEnd ? "pr-10" : "";

        const finalInputClass = [
            "w-full",
            baseInputClasses[variant],
            textArea ? sizeClasses[inputSize].textarea : sizeClasses[inputSize].input, ,
            "rounded-lg",
            "transition-all duration-200 ease-in-out",
            "text-gray-900 placeholder-gray-500",
            "focus:outline-none",
            leftPadding,
            rightPadding,
            getStateClasses(),
            inputClassName,
        ]
            .filter(Boolean)
            .join(" ");

        const iconBaseClass = `absolute top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 ${sizeClasses[inputSize].icon}`;

        const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                setSelectedFile(file.name);
            } else {
                setSelectedFile("No file chosen");
            }
            onChange?.(e);
        };

        const handleFileButtonClick = () => {
            fileInputRef.current?.click();
        };

        if (textArea) {
            return (
                <div className={`space-y-1.5 ${containerClassName} !w-full`}>
                    {label && (
                        <label
                            htmlFor={inputId}
                            className={`
                                block font-medium text-gray-700
                                ${sizeClasses[inputSize].label}
                                ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}
                                ${labelClassName}
                            `}
                        >
                            {label}
                        </label>
                    )}

                    <div className="relative">
                        {iconStart && (
                            <div className={`${iconBaseClass} left-3 top-3 z-10 ${isFocused ? 'text-blue-500' : ''}`}>
                                {iconStart}
                            </div>
                        )}

                        <textarea
                            ref={ref as React.Ref<HTMLTextAreaElement>}
                            id={inputId}
                            rows={rows}
                            disabled={disabled}
                            className={`
                                ${finalInputClass}
                                ${getResizeClass()}
                                min-h-[80px]
                            `}
                            onFocus={(e) => {
                                setIsFocused(true);
                                props.onFocus?.(e as any);
                            }}
                            onBlur={(e) => {
                                setIsFocused(false);
                                props.onBlur?.(e as any);
                            }}
                            onChange={onChange as any}
                            aria-invalid={error ? 'true' : 'false'}
                            aria-describedby={error ? errorId : helperText ? helperId : undefined}
                            {...(props as any)}
                        />

                        {iconEnd && (
                            <div className={`${iconBaseClass} right-3 top-3`}>
                                {iconEnd}
                            </div>
                        )}
                    </div>

                    {/* Helper Text */}
                    {helperText && !error && (
                        <p
                            id={helperId}
                            className={`text-xs text-gray-600 ${helperClassName}`}
                        >
                            {helperText}
                        </p>
                    )}

                    {/* Error Message */}
                    {error && (
                        <p
                            id={errorId}
                            className={`text-xs text-red-600 flex items-center gap-1 ${errorClassName}`}
                            role="alert"
                        >
                            <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </p>
                    )}
                </div>
            );
        }

        // Custom File Input
        if (type === "file") {
            return (
                <div className={`space-y-1.5 ${containerClassName} !w-full`}>
                    {label && (
                        <label
                            htmlFor={inputId}
                            className={`
                                block font-medium text-gray-700
                                ${sizeClasses[inputSize].label}
                                ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}
                                ${labelClassName}
                            `}
                        >
                            {label}
                        </label>
                    )}

                    <div className="flex items-stretch overflow-hidden rounded-lg border border-gray-300 bg-white focus-within:border-gray-500 hover:border-gray-400 transition-colors duration-200">
                        {/* Choose file button */}
                        <button
                            type="button"
                            onClick={handleFileButtonClick}
                            disabled={disabled}
                            className={`
                                bg-gray-100 text-gray-700 font-medium rounded-none
                                hover:bg-gray-300 active:bg-gray-300
                                disabled:bg-gray-400 disabled:cursor-not-allowed
                                transition-colors duration-200
                                flex-shrink-0 border-0 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                                ${sizeClasses[inputSize].fileButton}
                                ${getStateClasses()}
                            `}
                        >
                            Choose file
                        </button>

                        {/* File name display */}
                        <div className={`
                            flex-1 bg-white px-3 py-2.5 text-sm text-gray-600
                            flex items-center min-w-0
                            ${disabled ? 'bg-gray-50 text-gray-400' : ''}
                        `}>
                            <span className="truncate">{selectedFile}</span>
                        </div>

                        {/* Hidden file input */}
                        <input
                            ref={(node) => {
                                fileInputRef.current = node;
                                if (typeof ref === 'function') {
                                    ref(node);
                                } else if (ref) {
                                    ref.current = node;
                                }
                            }}
                            type="file"
                            id={inputId}
                            className="hidden"
                            disabled={disabled}
                            accept={accept}
                            onChange={handleFileChange}
                            aria-invalid={error ? 'true' : 'false'}
                            aria-describedby={error ? errorId : helperText ? helperId : undefined}
                            {...props}
                        />
                    </div>

                    {/* Helper text for file types */}
                    {(helperText || accept) && !error && (
                        <p className={`text-xs text-gray-500 ${helperClassName}`}>
                            {helperText || (accept && `Accepted formats: ${accept.replace(/\./g, '').toUpperCase()}`)}
                        </p>
                    )}

                    {/* Error Message */}
                    {error && (
                        <p
                            id={errorId}
                            className={`text-xs text-red-600 flex items-center gap-1 ${errorClassName}`}
                            role="alert"
                        >
                            <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </p>
                    )}
                </div>
            );
        }

        // Regular inputs 
        return (
            <div className={`space-y-1.5 ${containerClassName} !w-full`}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className={`
                            block font-medium text-gray-700
                            ${sizeClasses[inputSize].label}
                            ${required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}
                            ${labelClassName}
                        `}
                    >
                        {label}
                    </label>
                )}

                <div className="flex items-stretch gap-0 focus:outline-none focus:ring-none">
                    {/* Dropdown */}
                    {dropdownOptions && (
                        // <select
                        //     className={`${baseInputClasses[variant]} ${sizeClasses[inputSize].input} rounded-l-lg rounded-r-none border-r-0 focus-visible:!outline-none 
                        //     `}
                        //     onChange={onDropdownChange}
                        //     disabled={disabled}
                        //     aria-describedby={error ? errorId : helperText ? helperId : undefined}
                        // >
                        //     {dropdownOptions.map((opt) => (
                        //         <option key={opt.value} value={opt.value}>
                        //             {opt.label}
                        //         </option>
                        //     ))}
                        // </select>
                        <div className="relative">

                            <select
                                className={`
    appearance-none pr-6 pl-3 
    ${baseInputClasses[variant]} 
    ${sizeClasses[inputSize].input} 
    rounded-l-lg rounded-r-none border-r-0 
    focus-visible:!outline-none
  `}
                                value={dropdownValue}
                                onChange={onDropdownChange}
                                disabled={disabled}
                                aria-describedby={error ? errorId : helperText ? helperId : undefined}
                            >
                                {dropdownOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>

                            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                                <FiChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                    )}

                    {/* Input Field */}
                    <div className={`relative flex-1 ${dropdownOptions ? 'border-l border-gray-300' : 'w-full'}`}>
                        {iconStart && !dropdownOptions && (
                            <div className={`${iconBaseClass} left-3 z-10 ${isFocused ? 'text-blue-500' : ''}`}>
                                {iconStart}
                            </div>
                        )}

                        <input
                            ref={ref}
                            id={inputId}
                            type={type}
                            disabled={disabled}
                            className={`
                                ${dropdownOptions ?
                                    `${baseInputClasses[variant]} ${sizeClasses[inputSize].input} rounded-r-lg rounded-l-none border-l-0 transition-all duration-200 ease-in-out text-gray-900 placeholder-gray-500 focus:outline-none ${getStateClasses()} ${rightPadding}` :
                                    finalInputClass
                                }
                            `}
                            onFocus={(e) => {
                                setIsFocused(true);
                                props.onFocus?.(e);
                            }}
                            onBlur={(e) => {
                                setIsFocused(false);
                                props.onBlur?.(e);
                            }}
                            onChange={onChange}
                            aria-invalid={error ? 'true' : 'false'}
                            aria-describedby={error ? errorId : helperText ? helperId : undefined}
                            {...props}
                        />

                        {iconEnd && (
                            <div className={`${iconBaseClass} right-3`}>
                                {iconEnd}
                            </div>
                        )}
                    </div>
                </div>

                {/* Helper Text */}
                {helperText && !error && (
                    <p
                        id={helperId}
                        className={`text-xs text-gray-600 ${helperClassName}`}
                    >
                        {helperText}
                    </p>
                )}

                {/* Error Message */}
                {error && (
                    <p
                        id={errorId}
                        className={`text-xs text-red-600 flex items-center gap-1 ${errorClassName}`}
                        role="alert"
                    >
                        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;