export const CheckBoxCom = ({ label, name, register, options, errors }: any) => (
    <div className="flex flex-col gap-3">
        <label className="text-sm font-medium mb-1">{label}</label>
        <div className="flex flex-col gap-2">
            {options.map((opt: string) => (
                <label key={opt} className="inline-flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
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