// components/PayslipsTab.tsx
import { useState } from "react";
import { SortingState } from "@tanstack/react-table";
import DataTable from "../../../components/ui/shared/DataTable";
import Input from "../../../components/ui/Input";
import { HiSearch } from "react-icons/hi";
import { CiFilter } from "react-icons/ci";
import Button from "../../../components/ui/Button";
import { FiUpload } from "react-icons/fi";

type Payslip = {
    month: string;
    date: string;
    salary: string;
    salariedDays: number;
    status: "Pending" | "Sent" | "Paid";
};

const payslipData: Payslip[] = [
    { month: "April 2025", date: "25/04/2025", salary: "$ 20,090", salariedDays: 30, status: "Pending" },
    { month: "March 2025", date: "24/03/2025", salary: "$ 21,030", salariedDays: 29, status: "Sent" },
    { month: "February 2025", date: "24/02/2025", salary: "$ 21,000", salariedDays: 28, status: "Paid" },
    { month: "January 2025", date: "22/01/2025", salary: "$ 20,100", salariedDays: 31, status: "Paid" },
    { month: "December 2024", date: "24/12/2024", salary: "$ 21,100", salariedDays: 28, status: "Paid" },
    { month: "November 2024", date: "26/11/2024", salary: "$ 22,000", salariedDays: 29, status: "Paid" },
    { month: "October 2024", date: "24/10/2024", salary: "$ 18,000", salariedDays: 17, status: "Paid" },
    { month: "September 2024", date: "24/09/2024", salary: "$ 21,000", salariedDays: 28, status: "Paid" },
    { month: "August 2024", date: "24/08/2024", salary: "$ 20,000", salariedDays: 30, status: "Paid" },
    { month: "July 2024", date: "24/07/2024", salary: "$ 20,000", salariedDays: 30, status: "Paid" },
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
    { accessorKey: "month", header: "Month" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "salary", header: "Salary" },
    { accessorKey: "salariedDays", header: "Salaried Days" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }: any) => {
            const value: Payslip["status"] = getValue();
            const badgeClass = {
                Pending: "bg-red-100 text-red-700",
                Sent: "bg-purple-100 text-purple-700",
                Paid: "bg-green-100 text-green-700",
            }[value];

            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
                    {value}
                </span>
            );
        },
    },
];

function PayslipTab() {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [sorting, setSorting] = useState<SortingState>([]);

    return (
        <div className="space-y-5">
            <h4 className="font-semibold">Payslips</h4>

            <div className="bg-white rounded-md p-4">
                {/* Search and buttons */}
                <div className="flex justify-between items-center mb-4 gap-5">
                    <Input iconStart={<HiSearch />} containerClassName='w-full' placeholder='Search document' />
                    <Button variant='outline' className='shrink-0' iconStart={<CiFilter />}>
                        Sort
                    </Button>

                    <Button variant='black' className='shrink-0' iconStart={<FiUpload />}>
                        Upload Payslip
                    </Button>

                </div>

                {/* Table */}
                <DataTable<Payslip>
                    columns={columns}
                    data={payslipData}
                    totalCount={payslipData.length}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    onPageChange={setPageIndex}
                    onPageSizeChange={setPageSize}
                    sorting={sorting}
                    onSortingChange={setSorting}
                    isLoading={false}
                />
            </div>
        </div>
    );
}

export default PayslipTab;
