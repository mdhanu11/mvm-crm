// components/AttendanceTab.tsx
import { useState } from "react";
import { SortingState } from "@tanstack/react-table";
import { FaCheckCircle, FaRegCalendarCheck, FaTimesCircle } from "react-icons/fa";
import DataTable from "../../../components/ui/shared/DataTable";
import { HiOutlineDownload, HiSearch } from "react-icons/hi";
import { CiFilter } from "react-icons/ci";
import Button from "../../../components/ui/Button";
import { TfiHeartBroken } from "react-icons/tfi";
import { AiOutlineCalendar } from "react-icons/ai";
import Input from "../../../components/ui/Input";
import Dialog from "../../../components/ui/Dialog";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

type Attendance = {
    date: string;
    status: string;
    inTime: string;
    outTime: string;
    hoursSpent: string;
};

const attendanceData: Attendance[] = [
    { date: "25/04/2025", status: "Present", inTime: "8:15 am", outTime: "4:54 pm", hoursSpent: "8 hours" },
    { date: "24/04/2025", status: "Present", inTime: "8:25 am", outTime: "4:51 pm", hoursSpent: "8 hours" },
    { date: "23/04/2025", status: "Present", inTime: "8:23 am", outTime: "4:53 pm", hoursSpent: "8 hours" },
];

const columns = [
    {
        id: "select",
        header: ({ table }: any) => (
            <input type="checkbox" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />
        ),
        cell: ({ row }: any) => (
            <input type="checkbox" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
        ),
    },
    { accessorKey: "date", header: "Date" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }: any) => (
            <span className="text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
                {getValue()}
            </span>
        ),
    },
    { accessorKey: "inTime", header: "In time" },
    { accessorKey: "outTime", header: "Out time" },
    { accessorKey: "hoursSpent", header: "Hours spent" },
];

function AttendanceTab() {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [state, setState] = useState({
        exportModal: false,
        
    })
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-3">Document List</h2>
            {/* Leave Review */}
            <div className="flex gap-4 bg-white p-3">
                <div className="bg-gray-50 p-2 rounded-lg flex-1">
                    <h4 className="font-semibold">Annual Leave</h4>
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="text-sm mt-1">01/05/2025 - 15/05/2025</p>
                    <div className="mt-2 flex gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <FaTimesCircle className="text-red-500" />
                    </div>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg flex-1">
                    <h4 className="font-semibold">Sick Leave</h4>
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="text-sm mt-1">11/05/2025</p>
                    <div className="mt-2 flex gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <FaTimesCircle className="text-red-500" />
                    </div>
                </div>
            </div>

            <h2 className="text-lg font-semibold mb-3">Leave Status</h2>
            {/* Leave Status */}
            <div className="flex items-center gap-4">
                <div className="bg-white flex gap-2 rounded-lg px-4 py-3 flex-1">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-800">
                        <TfiHeartBroken size={24} />
                    </div>
                    <div>
                        <p className="font-medium">Sick Leave</p>
                        <p className="text-sm text-gray-500">5/10</p>
                    </div>
                </div>
                <div className="bg-white flex gap-2 rounded-lg px-4 py-3 flex-1">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-800">
                        <AiOutlineCalendar size={24} />
                    </div>
                    <div>
                        <p className="font-medium">Annual Leave</p>
                        <p className="text-sm text-gray-500">5/10</p>
                    </div>
                </div>
                <div className="bg-white flex gap-2 rounded-lg px-4 py-3 flex-1">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-800">
                        <FaRegCalendarCheck size={24} />
                    </div>
                    <div>
                        <p className="font-medium">Public Holiday</p>
                        <p className="text-sm text-gray-500">Paid - 2/6 • Unpaid - 1/8</p>
                    </div>
                </div>
            </div>

            <h2 className="text-lg font-semibold mb-3">Attendance</h2>
            {/* Attendance Table */}
            <div className="bg-white rounded-md p-4">
                <div className="flex justify-between items-center mb-3 gap-5 ">
                    <Input iconStart={<HiSearch />} containerClassName='w-full' placeholder='Search document' />
                    <Button variant="outline" iconStart={<CiFilter />}>
                        Filter
                    </Button>
                    <Button onClick={()=>{setState({...state, exportModal:true})}} className="shrink-0" iconStart={<HiOutlineDownload />} variant="black">
                        Export Report
                    </Button>

                </div>

                <DataTable<Attendance>
                    columns={columns}
                    data={attendanceData}
                    totalCount={attendanceData.length}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    onPageChange={setPageIndex}
                    onPageSizeChange={setPageSize}
                    sorting={sorting}
                    onSortingChange={setSorting}
                    isLoading={false}
                />
            </div>

            <Dialog isOpen={state.exportModal} onClose={()=>{setState({...state, exportModal:false})}}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    <div>
                        <label className='mb-2'>From Date</label>
                        <Input variant='soft' inputSize='lg' type='date' />
                    </div>
                    <div>
                        <label className='mb-2'>To Date</label>
                        <Input variant='soft' inputSize='lg' type='date' />
                    </div>
                </div>

                <div className="mt-3">
                    <label className="mb-2">Select Format</label>
                    <div>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="xlsx" control={<Radio sx={{ color: '#737373', '&.Mui-checked': { color: '#737373' } }} />} label="xlsx" checked sx={{
                                    width: '100px', color: '#737373',
                                    '& .MuiFormControlLabel-label': { fontSize: '16px' }
                                }} />

                                <FormControlLabel value="pdf" control={<Radio sx={{ color: '#737373', '&.Mui-checked': { color: '#737373' } }} />} label="pdf" sx={{
                                    width: '100px', color: '#737373',
                                    '& .MuiFormControlLabel-label': { fontSize: '17px' }
                                }} />

                                <FormControlLabel value="docx" control={<Radio sx={{ color: '#737373', '&.Mui-checked': { color: '#737373' } }} />} label="docx" sx={{
                                    width: '100px', color: '#737373',
                                    '& .MuiFormControlLabel-label': { fontSize: '17px' }
                                }} />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="text-end mt-5">
                    <Button variant='black'>Export</Button>
                </div>
            </Dialog>
        </div>
    );
}

export default AttendanceTab;
