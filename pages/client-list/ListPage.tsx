import { useState } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import Button from "../../components/ui/Button";
import { HiPlus } from "react-icons/hi";
import TableToolBar from "./components/TableToolBar";
import DataTable from "../../components/ui/shared/DataTable";
import { Link } from "react-router-dom";

// Updated data structure
type Employee = {
  clientName: string;
  location: string;
  company: string;
  employeeCount: string;
  status: "Active" | "Inactive" | "Paused";
};

const mockData: Employee[] = [
  {
    company: "Invision",
    clientName: "Jerome Bell",
    location: "01839",
    employeeCount: "12/04/2023",
    status: "Active",
  },
  {
    company: "Lendio",
    clientName: "Robert Fox",
    location: "61391",
    employeeCount: "07/05/2016",
    status: "Active",
  },
  {
    company: "Google",
    clientName: "Darlene Robertson",
    location: "23340",
    employeeCount: "15/08/2017",
    status: "Paused",
  },
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
    accessorKey: "company",
    header: "Company",
    cell: ({ getValue }) => (
      <span className="font-semibold">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "clientName",
    header: "Client Name",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <Link className="hover:underline" target="_blank" to={`/dashboard/client/${value}`}>{value}</Link>
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "employeeCount",
    header: "Start Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const value = getValue() as Employee["status"];
      const styleMap = {
        Active: "bg-green-100 text-green-700",
        Inactive: "bg-red-100 text-red-700",
        Paused: "bg-purple-100 text-purple-700",
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styleMap[value]}`}>
          {value}
        </span>
      );
    },
  },
  {
    id: "assign",
    header: "Assign Employee",
    cell: ({ row }) => {
      const assignable = row.original.status === "Active";
      return assignable ? (
        <a href="#" className="text-blue-600 font-medium hover:underline">Assign</a>
      ) : (
        "-"
      );
    },
  },
];

function ListPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <>
      <h3 className="mb-7 font-semibold text-xl">Client List (1022)</h3>
      <div className="rounded-sm shadow-sm border bg-white border-gray-200 p-3">
        <div className="flex justify-between items-center mb-5">
          <h6 className="font-semibold">Client List</h6>
          <Link to={`/dashboard/add-client`}><Button iconStart={<HiPlus />} size="md" variant="black">Add Client</Button></Link>
        </div>

        <div className="mb-2">
          <TableToolBar />
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
    </>
  );
}

export default ListPage;
