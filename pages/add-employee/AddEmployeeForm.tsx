import { useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import { CheckBoxCom } from '../../components/ui/shared/CheckboxComponnet';
import { InputCom } from '../../components/ui/shared/InputComponent';
import { RadioGroupCom } from '../../components/ui/shared/RadioComponent';
import { SelectCom } from '../../components/ui/shared/SelectComponent';
import { currencies, EmployeeFormValues, govtIds, nationalities, policyAcknowledgement, timeZone } from './constants/add-employee-constants';
import { useNavigate } from 'react-router-dom';

const AddEmployeeForm = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmployeeFormValues>({
        // resolver: yupResolver(schema),
    });

    const onSubmit = (values: EmployeeFormValues) => {
        console.log(values)
    }

    const handleCancel = () => {
        navigate("/dashboard/employee-management");
    };

    return (
        <>
            <h1 className="text-2xl font-semibold mb-2">Add New Employee</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
            >

                {/* Section 1: Personal Info */}
                <h2 className="text-xl font-semibold mb-2">1. Personal Details </h2>

                <div className="bg-white shadow rounded p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputCom label="Full Name" name="fullName" placeholder="Full Name" register={register} errors={errors} />
                    <InputCom label="Date of Birth" name="dateOfBirth" type="date" register={register} errors={errors} />
                    <SelectCom label="Nationality" name="nationality" placeholder="Nationality" options={nationalities} register={register} errors={errors} />
                    <SelectCom label="Gender" name="linkedin" placeholder="Gender" options={["Male", "Female", "Other"]} register={register} errors={errors} />
                    <InputCom label="Email" name="email" type="email" placeholder="example@gmail.com" register={register} errors={errors} />
                    <InputCom label="Mobile Number" name="mobile" type="tel" placeholder="+91 1234567890" register={register} errors={errors} />
                    <InputCom label="WhatsApp Number" name="whatsapp" type="tel" placeholder="Whatsapp Number" register={register} errors={errors} />
                    <InputCom label="Facebook URL(optional)" name="facebook" placeholder="Profile URL" register={register} errors={errors} />
                    <InputCom label="LinkedIn URL(optional)" name="linkedIn" placeholder="Profile URL" register={register} errors={errors} />
                    <InputCom label="Full Home Address" name="address" placeholder="House No, Area, City, State, Country" register={register} errors={errors} />
                    <RadioGroupCom label="Do you have children?" name="haveChildren" options={["Yes", "No"]} register={register} errors={errors} />
                    <InputCom label="If yes,how many and what are their ages?" placeholder="Total number" name="howManyChildren" register={register} errors={errors} />
                    <InputCom label="Who will care for them during work hours?" placeholder="Example: Father, Grand Parents" name="WhoWIllCare" register={register} errors={errors} />
                </div>

                {/* Section 2: Emergency Contact */}
                <h2 className="text-xl font-semibold mb-2">2. Emergency Contact(Provide 2 contacts from the same household) </h2>

                <div className="bg-white shadow rounded p-6 ">
                    <label className="text-sm font-medium mb-1">Contact1</label>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-5'>
                        <InputCom name="name" placeholder="Contact person name" register={register} errors={errors} />
                        <InputCom name="relationship" placeholder="Your relationship with contact" register={register} errors={errors} />
                        <InputCom name="phone" placeholder="Contact phone" register={register} errors={errors} />
                    </div>
                    <label className="text-sm font-medium mb-1">Contact2</label>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <InputCom name="name" placeholder="Contact person name" register={register} errors={errors} />
                        <InputCom name="relationship" placeholder="Your relationship with contact" register={register} errors={errors} />
                        <InputCom name="phone" placeholder="Contact phone" register={register} errors={errors} />
                    </div>
                </div>


                {/* Section 3: Roles and Compensation */}
                <h2 className="text-xl font-semibold mb-2">3. Role & Compensation</h2>
                <div className="bg-white shadow rounded p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    <SelectCom label="Role/Designation Offered" placeholder="Role" name="role" labelClassName="mb-7 xl:mb-1" options={["Frontend", "Backend"]} register={register} errors={errors} />
                    <SelectCom label="Full Time/Part Time" placeholder="Full time/ Part Time" labelClassName="mb-7 xl:mb-1" name="position" options={["Full-Time", "Part-Time"]} register={register} errors={errors} />
                    <SelectCom label="Monthly Salary or Hourly Rate(Local Currency)" name="salary" options={["Monthly", "Per Hour"]} placeholder="Salary" register={register} errors={errors} />
                    <SelectCom label="Currency" name="currencies" options={currencies} labelClassName="mb-12 xl:mb-7" placeholder="Currency" register={register} errors={errors} />
                    <SelectCom label="Agreed Time Zone" name="timeZone" options={timeZone} labelClassName="mb-12  xl:mb-7" register={register} errors={errors} />
                    <div className='grid'>
                        <label className="text-sm font-medium mb-1">Scheduled Working Hours (Your Local Time)</label>
                        <div className='grid grid-cols-2 gap-2'>
                            <InputCom label="Start Time" name="startTime" type="time" register={register} errors={errors} />
                            <InputCom label="End Time" name="endTime" type="time" register={register} errors={errors} />
                        </div>
                    </div>
                    <RadioGroupCom label="Do you have concerns about working hours?" name="workingHours" options={["Yes", "No"]} labelClassName="mb-7" register={register} errors={errors} />
                    <RadioGroupCom label="Do you understand the role & responsibilities?" name="rolesAndResponsibilities" options={["Yes", "No"]} labelClassName="mb-5" register={register} errors={errors} />
                    <RadioGroupCom label="Do you have any questions about the offered rate?" name="offeredRate" options={["Yes", "No"]} labelClassName="mb-5" register={register} errors={errors} />
                    <RadioGroupCom label="Are you legally allowed to work as a freelancer/contractor?" name="legalWork" options={["Yes", "No"]} register={register} errors={errors} />

                </div>

                {/* Section 4: Experience and commitments */}
                <h2 className="text-xl font-semibold mb-2">4. Experience & Commitment</h2>
                <div className="bg-white shadow rounded p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end gap-6">
                    <InputCom label="How long have you worked as a Virtual Assistant?" placeholder="Example: 1 year" name="experience" labelClassName="mb-5" register={register} errors={errors} />
                    <RadioGroupCom label="Do you have any active work commitments or projects with others?" name="activeWorkCommitments" options={["Yes", "No"]} register={register} errors={errors} />
                    <RadioGroupCom label="Are you waiting for interview results from other companies?" name="waitingForInterviewResult" labelClassName="mb-5 xl:mb-1" options={["Yes", "No"]} register={register} errors={errors} />
                    <InputCom label="Who referred you to MVM? (If applicable)" name="referred" placeholder="Mention his null name with contact" labelClassName="mb-5" register={register} errors={errors} />
                    <RadioGroupCom label="Are you open to working with an additional client or more than 40 hours/week?" name="openToWork" options={["Yes", "No"]} register={register} errors={errors} />
                </div>

                {/* Section 5: Certification and qualifications */}
                <h2 className="text-xl font-semibold mb-2">5. Certifications & Qualifications</h2>
                <div className="bg-white shadow rounded p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <RadioGroupCom label="Do you have required certifications?" name="certifications" options={["Yes", "No"]} register={register} errors={errors} />
                    <InputCom label="Upload relevant certifications/documents" multiple name="certificate" type="file" placeholder="Upload relevant certifications/documents" register={register} errors={errors} />
                </div>

                {/* Section 6: Device and work setup */}
                <h2 className="text-xl font-semibold mb-2">6. Device and Work Setup</h2>
                <div className="bg-white shadow rounded p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-end gap-6">
                    <InputCom label="Operating System" name="operatingSystem" placeholder="Operating System" register={register} errors={errors} />
                    <InputCom label="IP Address" name="ipAddress" placeholder="IP Address" register={register} errors={errors} />
                    <InputCom label="Serial Number of Main Device" name="serialNumber" placeholder="Serial Number of Main Device" register={register} errors={errors} />
                    <InputCom label="Upload a clear photo of your workstation" name="workstationPhoto" type="file" placeholder="Serial Number of Main Device" register={register} errors={errors} />
                    <InputCom label="Upload main device specs (screenshot or doc)" name="deviceSpecs" type="file" placeholder="Serial Number of Main Device" register={register} errors={errors} />
                    <InputCom label="Upload backup device specs (if available)" name="backupDeviceSpecs" type="file" placeholder="Serial Number of Main Device" register={register} errors={errors} />
                    <InputCom label="Upload Speed Test (Main ISP)" name="position" type="mainIsp" placeholder="Serial Number of Main Device" labelClassName="mb-10  xl:mb-5" register={register} errors={errors} />
                    <InputCom label="Upload Speed Test (Backup ISP)" name="position" type="backupIsp" placeholder="Serial Number of Main Device" labelClassName="mb-5" register={register} errors={errors} />
                    <RadioGroupCom label="Do you confirm your understanding of remote work requirements?" name="confirmRemoteWorkRequirements" options={["Yes", "No"]} register={register} errors={errors} />
                </div>

                {/* Section 7: ID & Photo */}
                <h2 className="text-xl font-semibold mb-2">7. ID & Photo</h2>
                <div className="bg-white shadow rounded p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className='grid'>
                        <label className="text-sm font-medium mb-1">Upload any 2 Valid Government IDs (Passport / License / National ID / Residency Card)</label>
                        <div className='grid grid-cols-2  gap-2'>
                            <div >
                                <SelectCom name="id1" options={govtIds} placeholder="ID Type" register={register} errors={errors} />
                                <InputCom name="id1" type="file" placeholder="Operating System" register={register} errors={errors} />
                            </div>
                            <div>
                                <SelectCom name="id2" options={govtIds} placeholder="ID Type" register={register} errors={errors} />
                                <InputCom name="id2" type="file" placeholder="Operating System" register={register} errors={errors} />
                            </div>
                        </div>
                    </div>
                    <InputCom label="Upload a recent photo of yourself (Headshot)" name="photo" type="file" placeholder="IP Address" labelClassName="mb-13" register={register} errors={errors} />
                </div>

                {/* Section 8: Portfolio (If applicable) */}
                <h2 className="text-xl font-semibold mb-2 grid grid-cols-1 lg:grid-cols-2">8. Portfolio (If applicable)</h2>
                <div className="bg-white shadow rounded p-6 ">
                    <label className="text-sm font-medium mb-1">Upload sample work/portfolio</label>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <InputCom name="sampleWork" type="file" register={register} errors={errors} />
                        <InputCom name="portfolio" placeholder="portfolio link" register={register} errors={errors} />
                    </div>
                </div>

                {/* Section 9: Bank & Payment Details */}
                <h2 className="text-xl font-semibold mb-2">9. Bank & Payment Details</h2>
                <div className="bg-white shadow rounded p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    <InputCom label="Account Holder Name" name="accountHolderName" placeholder="Account Holder Name" register={register} errors={errors} />
                    <InputCom label="Bank Name" name="bankName" placeholder="Bank Name" register={register} errors={errors} />
                    <InputCom label="Account Number" name="accountNumber" placeholder="Account Number" register={register} errors={errors} />
                    <InputCom label="IFSC or SWIFT Code (if outside your country)" name="ifscCode" placeholder="IFSC or SWIFT Code (if outside your country)" labelClassName="mb-5" register={register} errors={errors} />
                    <InputCom label="Wise Account Email (for international transfers)" name="wiseAccountEmail" type="email" placeholder="Wise Account Email (for international transfers)" labelClassName="mb-5" register={register} errors={errors} />
                    <RadioGroupCom label="Are you okay with payouts on the 7th and 22nd of each month?" name="payouts" options={["Yes", "No"]} register={register} errors={errors} />
                    <RadioGroupCom label="Would you like to participate in our bonus/referral program?" name="bonus" options={["Yes", "No"]} register={register} errors={errors} />
                </div>

                {/* Section 10: Background Check & References */}
                <h2 className="text-xl font-semibold mb-2">10. Background Check & References</h2>
                <div className="bg-white shadow rounded p-6 grid grid-cols-1 gap-6">
                    <RadioGroupCom label="Do you consent to a background check?" name="backgroundCheck" options={["Yes", "No"]} register={register} errors={errors} />
                    <div className='grid col-span-3'>
                        <label className="text-sm font-medium mb-1 ">Provide 3 references (Recent Clients or Employers)</label>
                        {/* Divider with text */}
                        <div className="relative flex items-center mb-5">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500 text-sm whitespace-nowrap">Reference 1</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-5'>
                            <InputCom name="name" placeholder="Name" register={register} errors={errors} />
                            <InputCom name="contactNumber" placeholder="Contact number" register={register} errors={errors} />
                            <InputCom name="email" placeholder="Email" register={register} errors={errors} />
                            <InputCom name="role" placeholder="Role" register={register} errors={errors} />
                            <InputCom name="company" placeholder="Company" register={register} errors={errors} />
                            <InputCom name="status" placeholder="Status" register={register} errors={errors} />
                        </div>

                        {/* Divider with text */}
                        <div className="relative flex items-center mb-5">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500 text-sm whitespace-nowrap">Reference 2</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-5'>
                            <InputCom name="name" placeholder="Name" register={register} errors={errors} />
                            <InputCom name="contactNumber" placeholder="Contact number" register={register} errors={errors} />
                            <InputCom name="email" placeholder="Email" register={register} errors={errors} />
                            <InputCom name="role" placeholder="Role" register={register} errors={errors} />
                            <InputCom name="company" placeholder="Company" register={register} errors={errors} />
                            <InputCom name="status" placeholder="Status" register={register} errors={errors} />
                        </div>

                        {/* Divider with text */}
                        <div className="relative flex items-center mb-5">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500 text-sm whitespace-nowrap">Reference 3</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            <InputCom name="name" placeholder="Name" register={register} errors={errors} />
                            <InputCom name="contactNumber" placeholder="Contact number" register={register} errors={errors} />
                            <InputCom name="email" placeholder="Email" register={register} errors={errors} />
                            <InputCom name="role" placeholder="Role" register={register} errors={errors} />
                            <InputCom name="company" placeholder="Company" register={register} errors={errors} />
                            <InputCom name="status" placeholder="Status" register={register} errors={errors} />
                        </div>
                    </div>
                </div>

                {/* Section 11: Policy Acknowledgement */}
                <h2 className="text-xl font-semibold mb-2">11. Policy Acknowledgement</h2>
                <div className="bg-white shadow rounded p-6 grid grid-cols-1  gap-4">
                    <CheckBoxCom label="Do you acknowledge and agree to comply with:" name="acknowledgement" options={policyAcknowledgement} register={register} errors={errors} />
                    <a href="#" className="text-blue-600 text-sm font-medium hover:underline ml-4">Please read and accept the policies</a>
                    <CheckBoxCom name="acknowledgement" options={["I have read the policies and I accept the same"]} register={register} errors={errors} />
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
        </>
    );
};

export default AddEmployeeForm;
