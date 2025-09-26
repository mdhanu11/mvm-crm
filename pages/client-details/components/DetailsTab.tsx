import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { HiChevronDown, HiPlus, HiSearch } from "react-icons/hi";
import Button from "../../../components/ui/Button";
import DataTable from "../../../components/ui/shared/DataTable";
import { useState } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { BiSortAlt2 } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import Dialog from "../../../components/ui/Dialog";

const notes = [
    {
        text: "Jerome has been working and leading on PV-21 project and has been recommend Lead position for next increment by Mary",
        date: "15/04/2025",
        type: "positive",
    },
    {
        text: "Jerome has been caught smoking in the premises, complaint has been raised.",
        date: "05/01/2025",
        type: "negative",
    },
    {
        text: "Performance appreciated",
        date: "05/01/2025",
        type: "positive",
    },
    {
        text: "Jerome has been away for 3 days without informing either client or agency",
        date: "05/01/2025",
        type: "negative",
    },
    {
        text: "Jerome has been away for 3 days without informing either client or agency",
        date: "05/01/2025",
        type: "negative",
    },
];


type Employee = {
    name: string;
    id: string;
    client: string;
    joiningDate: string;
    salary: string;
    status: "Active" | "On notice" | "On hold";
};

const mockData: Employee[] = [
    { name: "Jerome Bell", id: "Senior Software Developer", client: "Invision", joiningDate: "12/04/2023", salary: "$220,000", status: "Active" },
    { name: "Robert Fox", id: "Senior Software Developer", client: "Assign", joiningDate: "07/05/2016", salary: "$40,000", status: "Active" },
    { name: "Darlene Robertson", id: "Senior Software Developer", client: "Google", joiningDate: "15/08/2017", salary: "$150,000", status: "On notice" },
    { name: "Ronald Richards", id: "Senior Software Developer", client: "Assign", joiningDate: "28/10/2012", salary: "$80,000", status: "On hold" },
    { name: "Bessie Cooper", id: "Senior Software Developer", client: "Assign", joiningDate: "12/06/2020", salary: "$100,000", status: "Active" },
];

const columns: ColumnDef<Employee>[] = [
    {
        id: "select",
        enableSorting: false,
        header: ({ table }) => (
            <input
                type="checkbox"
                checked={table.getIsAllRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
            />
        ),
        cell: ({ row }) => (
            <input
                type="checkbox"
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ getValue }) => {
            const value = getValue() as string;
            return <Link className="hover:underline" target="_blank" to={`/dashboard/employee/${value}`}>{value}</Link>
        },
    },
    {
        accessorKey: "id",
        header: "Position",
    },
    {
        accessorKey: "joiningDate",
        header: "Contract Type",
    },
    {
        accessorKey: "joiningDate",
        header: "Contract Start Date",
    },
    {
        accessorKey: "salary",
        header: "Salary",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const value = getValue() as Employee["status"];
            const styleMap = {
                "Active": "bg-green-100 text-green-700",
                "On notice": "bg-red-100 text-red-700",
                "On hold": "bg-purple-100 text-purple-700",
            };
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${styleMap[value]}`}>
                    {value}
                </span>
            );
        },
    },
    {
        id: "actions",
        enableSorting: false,
        header: () => <span className="text-center block"></span>,
        cell: () => (
            <button className="text-gray-500 hover:text-red-600">
                <BsThreeDotsVertical />
            </button>
        ),
    },
];

export default function DetailsTab() {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [state, setState] = useState({
        assignModalOpen: false,
        generateInvoiceModalOpen: false
    })
    return (
        <>
            <div className="flex flex-col lg:flex-row gap-6 mt-2">
                {/* Left side */}
                <div className="flex-1 space-y-4">
                    {/* Contract Details */}
                    <div className="bg-white shadow-sm p-4 rounded-lg">
                        <h3 className="font-semibold mb-4">Contract Details</h3>
                        <div className="grid grid-cols-2 text-sm gap-y-3">
                            <div><span className="text-gray-500 font-normal">Started working on</span><div>12/05/2023</div></div>
                            <div><span className="text-gray-500 font-normal">Contract starting Date</span><div>12/05/2024</div></div>
                            <div><span className="text-gray-500 font-normal">Contract End Date</span><div>12/05/2025</div></div>
                            <div><span className="text-gray-500 font-normal">Increment Date</span><div>12/05/2025</div></div>
                        </div>
                    </div>


                </div>

                {/* Notes */}
                <div className="w-full lg:w-80 flex flex-col gap-4 bg-white shadow-sm p-4 rounded-lg ">
                    <div className="flex-1 flex flex-col max-h-[500px] overflow-y-auto">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold">Notes</h3>
                            <HiOutlineEllipsisHorizontal className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="overflow-y-auto space-y-3  pr-2">
                            {notes.length < 0 ? notes.map((note, idx) => (
                                <div
                                    key={idx}
                                    className={`text-sm p-3 rounded-md ${note.type === "positive"
                                        ? "bg-green-100 text-green-900"
                                        : "bg-red-100 text-red-900"
                                        }`}
                                >
                                    <p>{note.text}</p>
                                    <p className="text-xs mt-2">{note.date}</p>
                                </div>
                            )) : <div>
                                <p className="text-xs font-medium">Looking to hire 3 more software developers</p>
                                <span className="text-gray-500 font-normal text-xs">05/01/2025</span>
                            </div>}
                        </div>
                    </div>
                    <Button variant="outline" iconStart={<HiPlus />}>
                        Add notes
                    </Button>
                </div>

            </div>
            <div className="rounded-sm shadow-sm border bg-white border-gray-200 p-3 mt-4">
                <div className="flex justify-between items-center mb-5">
                    <h6 className="font-semibold">Employee List</h6>
                    <Button onClick={() => { setState({ ...state, assignModalOpen: true }) }} iconStart={<HiPlus />} size="md" variant="black">Assign Employee</Button>
                </div>

                <div className="mb-2">
                    <div className="flex flex-wrap items-center gap-3 w-full">


                        <div className="flex-1 min-w-[250px]">
                            <Input
                                iconStart={<HiSearch size={18} />}
                                placeholder="Search employee by name, email"
                                inputSize="md"
                            />
                        </div>

                        <Select defaultValue="" iconEnd={<HiChevronDown />}>
                            <option value="">Department</option>
                            <option value="hr">HR</option>
                            <option value="engineering">Engineering</option>
                            <option value="marketing">Marketing</option>
                        </Select>


                        {/* Sort Button */}
                        <Button variant="outline" size="md" iconStart={<BiSortAlt2 size={16} />}>
                            Sort by
                        </Button>

                        {/* Filter Button */}
                        <Button variant="outline" size="md" iconStart={<CiFilter size={16} />}>
                            Filter
                        </Button>
                    </div>
                </div>
                <DataTable<Employee>
                    columns={columns}
                    data={mockData}
                    totalCount={mockData.length}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    onPageChange={setPageIndex}
                    onPageSizeChange={setPageSize}
                    sorting={sorting}
                    onSortingChange={setSorting}
                    isLoading={false}
                />
            </div>

            <Dialog maxWidth='max-w-2xl' onClose={() => {
                setState({ ...state, assignModalOpen: false })
            }} isOpen={state?.assignModalOpen} title='Assign Employee'>
                <>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        <div>
                            <label>Employee Name</label>
                            <Input variant='soft' inputSize='lg' type='text' placeholder='Name' />
                        </div>
                        <div>
                            <label>Position</label>
                            <Input variant='soft' inputSize='lg' type='text' placeholder='Position' />
                        </div>
                        <div>
                            <label>Contract</label>
                            <Input variant='soft' inputSize='lg' type='text' placeholder='Contract' />
                        </div>
                        <div>
                            <label>Contract Start Date</label>
                            <Input variant='soft' inputSize='lg' type='date' placeholder='Date' />
                        </div>
                    </div>
                    <div className="text-end mt-5">
                        <Button variant='black'>Assign</Button>
                    </div>
                </>
            </Dialog>

           
        </>
    );
}
