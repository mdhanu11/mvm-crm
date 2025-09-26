export const RadioGroupCom = ({ label, name, register, options, errors,labelClassName }: any) => (
    <div className="flex flex-col gap-5">
        <label className={`text-sm font-medium ${labelClassName ?? 'mb-1'}`}>{label}</label>
        <div className="flex  gap-2">
            {options.map((opt: string) => (
                <label key={opt} className="inline-flex items-center w-50 gap-2 text-sm">
                    <input
                        type="radio"
                        value={opt}
                        {...register(name)}
                        className="form-radio text-blue-600"
                    />
                    {opt}
                </label>
            ))}
        </div>
        {errors[name] && (
            <span className="text-xs text-red-500 mt-1">{String(errors[name]?.message)}</span>
        )}
    </div>
);