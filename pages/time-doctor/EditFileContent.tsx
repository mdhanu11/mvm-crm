import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/ui/Button";
import Dialog from "../../components/ui/Dialog";
import { InputCom } from "../../components/ui/shared/InputComponent";
import { useUpdateTimeDoctorDataMutation } from "../../services/time-doctor/timeDoctor.service";
import { TimeDoctorFileContent } from "../../types/TimeDoctor.type";

// // --- Schema ---
// const schema:any = yup.object({
//   name: yup.string().required("Name is required"),
//   personalEmail: yup.string().email().required("Email is required"),
//   hours: yup.string().required(),
//   rate: yup.string().required(),
//   additionalHours: yup.string(),
//   cbHours: yup.string(),
//   overpaidHours: yup.string(),
//   bonus: yup.string(),
//   cbRelease: yup.string(),
//   amount: yup.string(),
//   advances: yup.string(),
//   total: yup.string(),
//   batch: yup.string(),
//   wiseStatus: yup.string(),
//   remarks: yup.string(),
//   salarySlip: yup.string(),
//   pdf: yup.string(),
// });

interface Props {
    isOpen: boolean;
    onClose: () => void;
    rowData: TimeDoctorFileContent | null;
    onSuccess?: () => void;
}

const EditTimeDoctorData: React.FC<Props> = ({ isOpen, onClose, rowData, onSuccess }) => {
    const [updateTimeDoctorData, { isLoading }] = useUpdateTimeDoctorDataMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TimeDoctorFileContent>({
        // resolver: yupResolver(schema),
        defaultValues: rowData ?? {},
    });

    // patch values when rowData changes
    useEffect(() => {
        if (rowData) {
            reset(rowData);
        }
    }, [rowData, reset]);

    const onSubmit: SubmitHandler<TimeDoctorFileContent> = async (data) => {
        if (!rowData?.id) return; // or toast error

        try {
            const { id, ...rest } = data;
            await updateTimeDoctorData({ id: rowData.id, ...rest }).unwrap();
            onSuccess?.();
            onClose();
        } catch (err) {
            console.error("Failed to update:", err);
        }
    };


    return (
        <Dialog maxWidth="max-w-[800px]" isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-xl font-semibold mb-6">Edit Record</h3>

                {/* Scrollable body */}
                <div className="max-h-[70vh] overflow-y-auto pr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputCom label="Name" name="name" register={register} errors={errors}  />
                        <InputCom label="Personal Email" name="personalEmail" register={register} errors={errors}  />
                        <InputCom label="Hours" name="hours" register={register} errors={errors}  />
                        <InputCom label="Rate" name="rate" register={register} errors={errors}  />
                        <InputCom label="Additional Hours" name="additionalHours" register={register} errors={errors} />
                        <InputCom label="CB Hours" name="cbHours" register={register} errors={errors} />
                        <InputCom label="Overpaid Hours" name="overpaidHours" register={register} errors={errors} />
                        <InputCom label="Bonus" name="bonus" register={register} errors={errors} />
                        <InputCom label="CB Release" name="cbRelease" register={register} errors={errors} />
                        <InputCom label="Amount" name="amount" register={register} errors={errors} />
                        <InputCom label="Advances" name="advances" register={register} errors={errors} />
                        <InputCom label="Total" name="total" register={register} errors={errors} />
                        <InputCom label="Batch" name="batch" register={register} errors={errors} />
                        <InputCom label="Wise Status" name="wiseStatus" register={register} errors={errors} />
                        <InputCom label="Salary Slip" name="salarySlip" register={register} errors={errors} />
                        <InputCom label="PDF" name="pdf" register={register} errors={errors} />
                        <InputCom label="Email" name="email" register={register} errors={errors} />
                        <InputCom label="Remarks" name="remarks" register={register} errors={errors} />
                    </div>
                </div>

                {/* Fixed footer */}
                <div className="mt-5 text-right sticky bottom-0 bg-white pt-3">
                    <Button variant="black" type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </Dialog>

    );
};

export default EditTimeDoctorData;
