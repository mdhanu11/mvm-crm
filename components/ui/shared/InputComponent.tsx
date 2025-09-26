// import { FieldErrors, UseFormRegister } from "react-hook-form";
import Input from "../Input";

// interface InputComProps {
//   label: string;
//   name: string;
//   type?: string;
//   register: UseFormRegister<any>; // You can replace `any` with your form values type
//   labelClassName?: string;
//   errors: FieldErrors;
//   placeholder?: string;
//   multiple?: boolean;
//   disabled?: boolean;
//   required?: boolean;
//   accept?: string;
//   variant?: "soft" | "outline" | "primary"; 
//   helperText?: string;
//   textArea?: boolean
// }

export const InputCom = ({
  label,
  name,
  type = "text",
  register,
  labelClassName,
  errors,
  placeholder,
  multiple = false,
  disabled = false,
  required = false,
  accept = "",
  variant = "soft",
  helperText="",
  textArea=false
}: any) => (
  <div className="flex flex-col">
    <label className={`text-sm font-medium ${labelClassName ?? 'mb-1'}`}>
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <Input
      disabled={disabled}
      placeholder={placeholder}
      variant={variant}
      {...register(name)}
      type={type}
      multiple={multiple}
      accept={accept}
      helperText={helperText}
      textArea={textArea}
    />
    {errors[name] && (
      <span className="text-xs text-red-500 mt-1">
        {String(errors[name]?.message)}
      </span>
    )}
  </div>
);
