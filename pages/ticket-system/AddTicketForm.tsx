import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import { InputCom } from '../../components/ui/shared/InputComponent';
import { schema, TicketFormValues } from './ticket.constant';
import { SelectCom } from '../../components/ui/shared/SelectComponent';
import { useCreateTicketMutation } from '../../services/ticketing/ticketing.service';
import { DEFAULT_ASSIGNED_TO_USERNAME, DEFAULT_TICKET_STATUS, DEPARTMENTS_OPTIONS, PRIORITY_TYPES } from '../../constants/ticketing.constants';
import { useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';
import Dialog from '../../components/ui/Dialog';

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const AddTicketForm: React.FC<CreateModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const appStoreVariable = useAppSelector(state => state.auth);
    const [createTicket, { isLoading }] = useCreateTicketMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TicketFormValues>({
        resolver: yupResolver(schema) as any,
    });

    const onSubmit: SubmitHandler<TicketFormValues> = async (data) => {

        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("created_by", appStoreVariable.username);
        if (data.description) formData.append("description", data.description);
        if (data.priority) formData.append("priority", data.priority);
        if (data.screenshot && data.screenshot[0]) {
            formData.append("screenshot", data.screenshot[0]);
        }
        if (data.department) formData.append("department", data.department);


        formData.append("status", DEFAULT_TICKET_STATUS);
        const arr = [appStoreVariable?.username, DEFAULT_ASSIGNED_TO_USERNAME];
        const selectedDept = DEPARTMENTS_OPTIONS.find(opt => opt.value === data.department);
        if (selectedDept?.poc) {
            formData.append("poc", selectedDept.poc);
            formData.append("assigned_to", selectedDept.poc);
            arr.push(selectedDept.poc)
        }
        formData.append("collaborators", JSON.stringify(arr));
        try {
            await createTicket(formData).unwrap();
            reset();
            onSuccess?.();
        } catch (err) {
            toast.error("Failed to submit ticket. Please try again later");
            console.error("Failed to submit ticket:", err);
        }
    };

    return (
        <>
            <Dialog maxWidth='max-w-[800px]' isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    {/* Heading */}
                    <h3 className="text-xl font-semibold mb-6">Create New Ticket</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputCom
                            label="Title"
                            name="title"
                            placeholder="Enter title"
                            register={register}
                            errors={errors}
                            required={true}
                        />
                        <SelectCom
                            label="Priority"
                            name="priority"
                            options={PRIORITY_TYPES}
                            placeholder="priority"
                            register={register}
                            errors={errors}
                            required={true}
                        />


                        <div className="col-span-2">
                            <InputCom

                                label="Description"
                                name="description"
                                placeholder="Enter description"
                                register={register}
                                errors={errors}
                                required={true}
                                textArea={true}
                            />
                        </div>


                        <SelectCom
                            label="Department"
                            name="department"
                            options={DEPARTMENTS_OPTIONS?.filter(item => item?.value)?.map(({ value }) => (value))}
                            placeholder="department"
                            register={register}
                            errors={errors}
                            required={true}
                        />
                        <InputCom
                            label="Upload Screenshot"
                            name="screenshot"
                            placeholder=""
                            register={register}
                            errors={errors}
                            type="file"
                            accept=".png,.jpg,.jpeg,.pdf"
                            helperText='Only .png,.jpg,.jpeg,.pdf file. (Max 3mb)'
                        />

                    </div>

                    <div className="mt-5 text-right">
                        <Button variant="black" type="submit" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create Ticket"}
                        </Button>
                    </div>
                </form>
            </Dialog>
        </>
    );
};

export default AddTicketForm;
