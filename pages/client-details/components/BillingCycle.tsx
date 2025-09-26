import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Checkbox } from '@mui/material';
import CreditNotes from './CreditNotes';

const BillingCycle: React.FC = () => {


    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
                {/* Left side */}
                <div className="col-span-8 space-y-4">
                    {/* Contract Details */}
                    <div className="bg-white shadow-sm p-4 rounded-lg">
                        {/* <h3 className="font-semibold mb-4">Contract Details</h3> */}
                        <div className="text-sm gap-y-3">
                            <div className='flex flex-col'>
                                <span className="text-gray-500 font-medium text-base" style={{ color: '#262626' }}>Billing Frequency</span>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="Fortnightly" control={<Radio sx={{ color: '#737373', '&.Mui-checked': { color: '#737373' } }} />} label="Fortnightly" checked sx={{
                                            width: '200px', color: '#737373',
                                            '& .MuiFormControlLabel-label': { fontSize: '12px' }
                                        }} />

                                        <FormControlLabel value="Monthly" control={<Radio sx={{ color: '#737373', '&.Mui-checked': { color: '#737373' } }} />} label="Monthly" sx={{
                                            width: '200px', color: '#737373',
                                            '& .MuiFormControlLabel-label': { fontSize: '12px' }
                                        }} />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className='flex flex-col'>
                                <span className="text-gray-500 font-medium text-base" style={{ color: '#262626' }}>Billing Type</span>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="Advances Payment" control={<Radio sx={{ color: '#737373', '&.Mui-checked': { color: '#737373' } }} />} label="Advances Payment" checked sx={{ width: '200px', color: '#737373', '& .MuiFormControlLabel-label': { fontSize: '12px' } }} />

                                        <FormControlLabel value="Post-work Payment" control={<Radio sx={{ color: '#737373', '&.Mui-checked': { color: '#737373' } }} />} label="Post-work Payment" sx={{ width: '200px', color: '#737373', '& .MuiFormControlLabel-label': { fontSize: '12px' } }} />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Notes */}
                <div className="col-span-4 flex flex-col gap-4 bg-white shadow-sm p-4 rounded-lg ">
                    <div className="flex-1 flex flex-col max-h-[500px] overflow-y-auto">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold">Billing Details</h3>
                        </div>
                        <div className="overflow-y-auto space-y-3  pr-2">
                            <p className="text-gray-500 font-normal text-xs mb-0">Next Invoice Period</p>
                            <span className="text-xs font-medium">01/05/2025 - 15/05/2025</span>
                        </div>
                        <div className="overflow-y-auto space-y-3  pr-2 mt-3">
                            <p className="text-gray-500 font-normal text-xs mb-0">Next Invoice Period</p>
                            <span className="text-xs font-medium">01/05/2025</span>
                        </div>
                    </div>
                </div>

                <div className="col-span-8 bg-white shadow-sm p-4 rounded-lg w-full">
                    <h3 className="font-semibold text-base mb-4">Add-ons & Adjustment</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                        {/* Unused Hours */}
                        <div className="flex flex-col">
                            <span className="text-gray-500 font-medium">Unused Hours</span>
                            <span className="text-xs text-gray-400">Add any carry-over hours from the previous billing cycle</span>
                            <span className="mt-1 font-medium">No. of hours</span>
                            <span>12</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-medium text-gray-500">Note</span>
                            <span>Write a note here</span>
                        </div>

                        {/* Incentives */}
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-500">Incentives</span>
                            <span>Amount</span>
                            <span>$ 3000</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-medium text-gray-500">Comments</span>
                            <span>Write a comment here</span>
                        </div>

                        {/* Zoom/TD Charges */}
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-500">Zoom/TD Charges</span>
                            <span>$ 30</span>
                        </div>

                        {/* HPF Adjustments */}
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-500">HPF Adjustments</span>
                            <span>Xoxox</span>
                        </div>
                    </div>

                    {/* GST checkbox */}
                    <div className="mt-4 flex items-center space-x-2">
                        <Checkbox
                            defaultChecked
                            sx={{
                                padding: 0,
                                color: '#737373',
                                '&.Mui-checked': { color: '#737373' },
                            }}
                        />
                        <span className="text-sm font-medium text-gray-700">GST</span>
                    </div>
                </div>
                <div className='col-span-8'>
                    <CreditNotes />
                </div>
            </div>
        </div>
    );
};

export default BillingCycle;
