import { useState } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import Button from "../../components/ui/Button";
import { HiPlus, } from "react-icons/hi";
import DataTable from "../../components/ui/shared/DataTable";
import { Link } from "react-router-dom";
import TableToolBar from "./TableToolBox";

// Mock data
type Staff = {
    name: string;
    id: string;
    email: string;
    primaryContact: number;
    secondaryContact: number;
    department: string;
    level: string;
    role: string;
    description: string;
};

const mockData: Staff[] = [
    { name: "Jerome Bell", id: "01839", email: "Invision", primaryContact: 12333434345, secondaryContact: 3457765, department: "Present", level: "senior", role: "role", description: "description" },

];

const columns: ColumnDef<Staff>[] = [
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
        header: "Dummy",
    },
    {
        accessorKey: "name",
        header: "Dummy",
    },
    {
        accessorKey: "name",
        header: "Dummy",
    },
    {
        accessorKey: "name",
        header: "Dummy",
    },
    {
        accessorKey: "name",
        header: "Dummy",
    },
    {
        accessorKey: "name",
        header: "Dummy",
    },
    {
        id: "assign",
        header: "Actions",

        cell: () => {
          return  (
            <a href="#" className="text-blue-600 font-medium hover:underline">Assign Staff</a>
          )
        },
      },
   
];

function RolesAndPermissionsListPage
    () {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [sorting, setSorting] = useState<SortingState>([]);

    return (
        <>
            <div className="flex justify-between items-center mb-7">
                <h3 className=" font-semibold text-xl">Roles and Permissions</h3>
                <Link to={`/dashboard/add-staff`}><Button iconStart={<HiPlus />} size="md" variant="black">Add Role</Button></Link>
            </div>
            <div className="rounded-sm shadow-sm border bg-white border-gray-200 p-3">
                <div className="mb-2">
                    <TableToolBar />
                </div>
                <DataTable<Staff>
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
        </>
    );
}

export default RolesAndPermissionsListPage
    ;
