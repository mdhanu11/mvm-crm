import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import { InputCom } from '../../components/ui/shared/InputComponent';
import { SelectCom } from '../../components/ui/shared/SelectComponent';
import { ClientFormValues, currencies, schema } from './constants/add-client-constants';
import { useNavigate } from 'react-router-dom';

const AddClientForm: React.FC = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ClientFormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<ClientFormValues> = (data) => {
        console.log(data);
    };


    const handleCancel = () => {
        navigate("/dashboard/client-management");
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
        >
            <h1 className="text-2xl font-semibold">Add New Client</h1>

            {/* Client information */}

            <div className="bg-white shadow rounded p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                <InputCom label="Client Name" name="client_name" placeholder="Client Name" register={register} errors={errors} />
                <InputCom label="Designation" name="designation" placeholder="Designation" register={register} errors={errors} />
                <InputCom label="Business Name" name="businessName" placeholder="Business Name" register={register} errors={errors} />

                <InputCom label="Business Phone" name="businessPhone" placeholder="Business Phone" register={register} errors={errors} />
                <InputCom label="Business Email" name="businessEmail" placeholder="Business Email" register={register} errors={errors} />
                <InputCom label="Business Address" name="businessAddress" placeholder="Business Address" register={register} errors={errors} />
                <InputCom label="Accounts Team Phone" name="accountTeamContact" placeholder="Accounts Team Phone" register={register} errors={errors} />
                <InputCom label="Accounts Team Email" name="accountTeamEmail" placeholder="Accounts Team Email" register={register} errors={errors} />
                <InputCom label="Website" name="website" placeholder="Website" labelClassName="mb-6 xl:mb-1" register={register} errors={errors} />
                <InputCom label="ABN" name="abn" placeholder="ABN" register={register} errors={errors} />
                <SelectCom label="Payment Terms" name="paymentTerms" options={["Daily", "Weekly", "Monthly"]} register={register} errors={errors} />
                <SelectCom label="Currency" name="currencies" options={currencies} placeholder="Currency" register={register} errors={errors} />
                <InputCom label="Client Rate" name="clientRate" placeholder="Client Rate" register={register} errors={errors} />
                <SelectCom label="Type" name="type" options={["Full-Time", "Part-Time", "Project base", "Other"]} register={register} errors={errors} />
            </div>

            {/* Submit Button */}
            <div className="text-right">
                <Button variant='outline' className='me-2' onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant='black'>
                    Save
                </Button>
            </div>
        </form>
    );
};

export default AddClientForm;
