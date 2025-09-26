import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Button from '../../components/ui/Button';
import Dialog from '../../components/ui/Dialog';
import { InputCom } from '../../components/ui/shared/InputComponent';
import { SelectCom } from '../../components/ui/shared/SelectComponent';
import { useUploadTimeDoctorSheetMutation } from '../../services/time-doctor/timeDoctor.service';

// --- Types ---
interface FormValues {
    month: string;
    year: string;
    file_name: string;
    uploaded_date: string;
    upload_file: FileList;
}

// --- Schema ---
const schema: yup.ObjectSchema<FormValues> = yup.object({
    month: yup.string().required('Month is required'),
    year: yup.string().required('Year is required'),
    file_name: yup.string().required('File name is required'),
    uploaded_date: yup.string().required(),
    upload_file: yup
        .mixed<FileList>()
        .test('required', 'File is required', (value) => !!value && value.length > 0)
        .test('fileType', 'Only CSV or XLSX files allowed', (value) => {
            if (!value || value.length === 0) return false;
            const allowedTypes = [
                'text/csv',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];
            return allowedTypes.includes(value[0].type);
        })
        .required(),
});

// --- Constants ---
const months = [
    { label: 'January', value: 'January' },
    { label: 'February', value: 'February' },
    { label: 'March', value: 'March' },
    { label: 'April', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'June', value: 'June' },
    { label: 'July', value: 'July' },
    { label: 'August', value: 'August' },
    { label: 'September', value: 'September' },
    { label: 'October', value: 'October' },
    { label: 'November', value: 'November' },
    { label: 'December', value: 'December' },
];

const years = Array.from({ length: 10 }, (_, i) => {
    const y = new Date().getFullYear() - i;
    return { label: y.toString(), value: `${y}` };
});


const AddData: React.FC<{ isOpen: boolean; onClose: () => void; onSuccess?: () => void }> = ({
    isOpen,
    onClose,
    onSuccess,
}) => {
    const [uploadTimeDoctorSheet, { isLoading }] = useUploadTimeDoctorSheetMutation();

    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(
        today.getMonth() + 1
    ).padStart(2, '0')}/${today.getFullYear()}`;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            uploaded_date: formattedDate,
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const formData = new FormData();
        formData.append('month', data.month);
        formData.append('year', data.year);
        formData.append('file_name', data.file_name);
        if (data.upload_file && data.upload_file[0]) {
            formData.append('file', data.upload_file[0]);
        }

        try {
            await uploadTimeDoctorSheet(formData).unwrap();
            reset();
            onSuccess?.();
        } catch (err) {
            toast.error('Failed to submit. Please try again later');
            console.error('Failed to submit:', err);
        }
    };

    return (
        <Dialog maxWidth="max-w-[800px]" isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <h3 className="text-xl font-semibold mb-6">Add Data</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <SelectCom
                        label="Month"
                        name="month"
                        options={months}
                        placeholder="Month"
                        register={register}
                        errors={errors}
                        required
                    />
                    <SelectCom
                        label="Year"
                        name="year"
                        options={years}
                        placeholder=" Year"
                        register={register}
                        errors={errors}
                        required
                    />

                    <InputCom
                        label="File Name"
                        name="file_name"
                        placeholder="Enter file name"
                        register={register}
                        errors={errors}
                        required
                    />

                    <InputCom
                        label="Uploaded Date"
                        name="uploaded_date"
                        placeholder=""
                        register={register}
                        errors={errors}
                        required
                        readOnly
                        disabled
                    />

                    <InputCom
                        label="Upload File"
                        name="upload_file"
                        placeholder=""
                        register={register}
                        errors={errors}
                        type="file"
                        accept=".csv,.xlsx"
                        required
                        helperText="Only .csv and .xlsx files allowed. (Max size: 3MB)"
                    />

                    <div className="flex items-center">
                        <a
                            href="/Sample-upload-file.csv"
                            download
                            className="text-blue-600 hover:text-blue-800 text-sm underline"
                        >
                            Download Sample
                        </a>
                    </div>

                </div>

                <div className="mt-5 text-right">
                    <Button variant="black" type="submit" disabled={isLoading}>
                        {isLoading ? 'Adding Data...' : 'Add Data'}
                    </Button>
                </div>
            </form>
        </Dialog>
    );
};

export default AddData;
