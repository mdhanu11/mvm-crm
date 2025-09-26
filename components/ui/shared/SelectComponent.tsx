import Select from "../Select";

export const SelectCom = ({ label, name, register, options, errors, labelClassName, placeholder, required = false }: any) => (
    <div className="flex flex-col">
        <label className={`text-sm font-medium ${labelClassName ?? 'mb-1'}`}>{label} {required ? <span className="text-red-600">*</span> : <></>}</label>
        <Select
            {...register(name)}
            variant='soft'

        >
            <option value="">Select {placeholder}</option>
            {options.map((opt: any, index: number) => (
                <option key={opt.id ?? opt.value ?? index} value={opt.value ?? opt}>
                    {opt.label ?? opt}
                </option>
            ))}

        </Select>
        {errors[name] && (
            <span className="text-xs text-red-500 mt-1">{String(errors[name]?.message)}</span>
        )}
    </div>
);