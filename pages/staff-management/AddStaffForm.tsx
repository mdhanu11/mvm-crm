import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import { InputCom } from '../../components/ui/shared/InputComponent';
import { StaffPayload, useManageStaffMutation } from '../../services/staff/staff.service';
import { schema } from './staff-constant';
import { StaffInterface } from './store/types';
import { appPermissions } from '../../types/common.type';
import { toast } from 'react-toastify';

interface CreateModalProps {
    onClose?: () => void;
    defaultValues?: StaffInterface | null;
}

const AddStaffForm: React.FC<CreateModalProps> = ({ onClose, defaultValues }) => {
    const [manageStaff] = useManageStaffMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<any>({
        resolver: yupResolver(schema, { context: { isEdit: !!defaultValues } }),
        defaultValues: defaultValues || {},
      });
      const [state, setState] = useState({
        submitButtonLoading: false
      })

    const onSubmit: SubmitHandler<StaffInterface> = async (data) => {
        const payload:StaffPayload  = {
            action: defaultValues ? "edit" : "add",
            username: data.username,
            email: data.email,
            full_name: data.full_name,
            module_permissions: data.module_permissions,
        };

        try {
            setState({...state, submitButtonLoading: true});
            await manageStaff(payload).unwrap();
            onClose?.();
            toast.success(defaultValues?'Staff updated successfully !':'Staff created successfully !', { autoClose: 5000 });
        } catch (err:any) {
            console.error("Failed to submit staff form:", err);
            toast.error(err?.data?.message || 'Something went wrong ! Please try again later', { autoClose: 5000 });
        } finally{ setState({...state, submitButtonLoading: false});}
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center px-4 ">
                <div className="bg-white w-full max-w-4xl p-6 rounded-lg relative h-[500px] overflow-hidden flex flex-col">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 text-xl hover:text-gray-800"
                    >
                        &times;
                    </button>

                    {/* Heading */}
                    <h3 className="text-xl font-semibold mb-6">{defaultValues ? "Edit Staff" : "Create New Staff"}</h3>

                    {/* Form */}
                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 overflow-auto">
                        <InputCom required={true} label="Username" name="username" placeholder="Enter Username" register={register} errors={errors} disabled={!!(defaultValues)} />
                        <InputCom required={true} label="Full Name" name="full_name" placeholder="Enter Full Name" register={register} errors={errors} />
                        <InputCom required={true} label="Email Address" name="email" type="text" placeholder="Enter Email" register={register} errors={errors} />
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium mb-1">Module Permissions <span className="text-red-600">*</span></label>
                            <div className="grid grid-cols-3 gap-2">
                                {appPermissions.map((opt) => (
                                    <label key={opt} className="inline-flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            value={opt}
                                            className="form-radio text-blue-600"
                                            {...register("module_permissions")}
                                        // checked={selectedPermissions.includes(opt)}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                            {errors["module_permissions"] && (
                                <span className="text-xs text-red-500 mt-1">{String(errors["module_permissions"]?.message)}</span>
                            )}
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="md:col-span-2 text-right mt-4">
                        <Button variant='black' loading={state.submitButtonLoading}>
                        {defaultValues ? "Update Staff" : "Create Staff"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddStaffForm;
