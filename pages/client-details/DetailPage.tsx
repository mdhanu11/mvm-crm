import { CiGlobe, CiLinkedin, CiPhone, CiUser } from "react-icons/ci";
import { TbTimezone } from "react-icons/tb";
import { FaSlack } from "react-icons/fa";
import {
    HiOutlineEnvelope,
    HiOutlineMapPin,
    HiOutlinePencil,
} from "react-icons/hi2";
import DetailsTab from "../client-details/components/DetailsTab";
import Tabs from "../../components/ui/Tabs";
import { useState } from "react";
import TabContent from "../../components/ui/TabContent";
import BillingCycle from "./components/BillingCycle";
import Button from "../../components/ui/Button";
import Dialog from "../../components/ui/Dialog";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { BsCurrencyDollar } from "react-icons/bs";

const RateIcon=()=>{
    return "/hr"
}
function ClientDetailPage() {
    const tabItems = [
        { label: 'Details', value: 'details' },
        { label: 'Billing Cycle', value: 'billingcycle' },
    ];
    const [active, setActive] = useState('details');
    const [state, setState] = useState({
        assignModalOpen: false,
        generateInvoiceModalOpen: false
    })
    return (
        <div className="">
            <div className="bg-white shadow rounded-lg p-6 flex items-start gap-6">
                <img
                    src="/images/employee.png"
                    alt="Jerome Bell"
                    className="w-50 h-50 object-cover"
                />
                <div className="flex-1">
                    <div className="flex">
                        <div className="">
                            <div className="flex items-center">
                                <h2 className="text-xl font-semibold">Flying Squad</h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                                    <HiOutlinePencil className="text-gray-500 cursor-pointer hover:text-gray-700" />
                                </div>
                            </div>
                            <span className="text-blue-600 text-sm block">Tech Agency</span>
                        </div>

                        <div className="ml-auto">
                            <Button onClick={() => {
                                setState({ ...state, generateInvoiceModalOpen: true });
                            }} size="md" variant="black">
                                Generate Invoice
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mt-4 space-y-2 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <CiGlobe className="text-gray-600" />
                                <a target="_blank" href="https://www.linkedin.com/in/jerome.bell/" className="text-gray-600">
                                    flyingsquad.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <HiOutlineEnvelope className="text-gray-600" />
                                <span>hr@flyingsquad.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CiUser className="text-gray-600" />
                                <span>Harry Dan</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <HiOutlineMapPin className="text-gray-600" />
                                <span>Melbourne, Australia</span>
                            </div>
                        </div>


                        <div className="mt-4 space-y-2 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <CiLinkedin className="text-gray-600" />
                                <a target="_blank" href="https://www.linkedin.com/in/jerome.bell/" className="text-gray-600">
                                    https://www.linkedin.com/in/flyingsquad/
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaSlack className="text-gray-600" />
                                <span>hr@flyingsquad.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CiPhone className="text-gray-600" />
                                <span>629.555.0129</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TbTimezone className="text-gray-600" />
                                <span>GMT 4+</span>
                            </div>
                        </div>
                    </div>



                </div>
            </div>

            <Dialog maxWidth='max-w-2xl' onClose={() => {
                setState({ ...state, generateInvoiceModalOpen: false })
            }} isOpen={state?.generateInvoiceModalOpen} title='Generate Invoice'>
                <>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        <div className="col-span-2 ">
                            <div>
                                <label className="mb-2">Select Format</label>
                                <div>
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value="Fortnightly" control={<Radio sx={{ color: '#737373', '&.Mui-checked': { color: '#737373' } }} />} label="Hourly" checked sx={{
                                                width: '200px', color: '#737373',
                                                '& .MuiFormControlLabel-label': { fontSize: '16px' }
                                            }} />

                                            <FormControlLabel value="Monthly" control={<Radio sx={{ color: '#737373', '&.Mui-checked': { color: '#737373' } }} />} label="Monthly" sx={{
                                                width: '200px', color: '#737373',
                                                '& .MuiFormControlLabel-label': { fontSize: '17px' }
                                            }} />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="mb-2">Details of the Project</label>
                            <Input variant='soft' inputSize='lg' type='text' placeholder='Project Details' />
                        </div>
                        <div>
                            <label className="mb-2">Employee Name</label>

                            <Select variant="soft" selectSize="lg" name="employee_name">
                                <option value="">Select Employee</option>
                            </Select>
                        </div>
                        <div>
                            <label className="mb-2">Hours Allocated</label>
                            <Input variant='soft' inputSize='lg' type='text' placeholder='Hours' />
                        </div>

                        <div>
                            <label className="mb-2">Currency Selector</label>

                            <Select variant="soft" selectSize="lg" name="employee_name">
                                <option value="">Select Currency</option>
                            </Select>
                        </div>
                        <div>
                            <label className="mb-2">Rate</label>
                            <Input iconStart={<BsCurrencyDollar />} iconEnd={<RateIcon />} variant='soft' inputSize='lg' type='text' placeholder='Rate' />
                        </div>
                    </div>
                    <div className="text-end mt-5">
                        <Button variant='black'>Generate</Button>
                    </div>
                </>
            </Dialog>


            <Tabs
                tabs={tabItems}
                activeTab={active}
                onTabChange={setActive}
                className="mt-5"
                activeTabClassName="font-semibold"
            />

            <div className="mt-2">
                <TabContent value="details" active={active}>
                    <DetailsTab />
                </TabContent>
                <TabContent value="billingcycle" active={active}>
                    <BillingCycle />
                </TabContent>
            </div>


        </div>
    );
}

export default ClientDetailPage;
