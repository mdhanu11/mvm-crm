import { useState } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import Button from "../../components/ui/Button";
import { HiPlus, } from "react-icons/hi";
import TableToolBar from "./components/TableToolBar";
import DataTable from "../../components/ui/shared/DataTable";
import { Link } from "react-router-dom";

// Mock data
type Employee = {
  name: string;
  id: string;
  client: string;
  joiningDate: string;
  salary: string;
  status: "Present" | "Absent" | "Sabbatical";
};


const mockData: Employee[] = [
  { name: "Jerome Bell", id: "01839", client: "Invision", joiningDate: "12/04/2023", salary: "$220,000", status: "Present" },
  { name: "Robert Fox", id: "61391", client: "Assign", joiningDate: "07/05/2016", salary: "$40,000", status: "Present" },
  { name: "Darlene Robertson", id: "23340", client: "Google", joiningDate: "15/08/2017", salary: "$150,000", status: "Sabbatical" },
  { name: "Ronald Richards", id: "45904", client: "Assign", joiningDate: "28/10/2012", salary: "$80,000", status: "Present" },
  { name: "Bessie Cooper", id: "9631", client: "Assign", joiningDate: "12/06/2020", salary: "$100,000", status: "Absent" },
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
    header: "Unique ID",
  },
  {
    accessorKey: "client",
    header: "Client Name",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return value === "Assign" ? (
        <a href="#" className="text-blue-600 font-medium hover:underline">{value}</a>
      ) : (
        value
      );
    },
  },
  {
    accessorKey: "joiningDate",
    header: "Joining Date",
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
        Present: "bg-green-100 text-green-700",
        Absent: "bg-red-100 text-red-700",
        Sabbatical: "bg-purple-100 text-purple-700",
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styleMap[value]}`}>
          {value}
        </span>
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
      <h3 className="mb-7 font-semibold text-xl">Employee List (2006)</h3>
      <div className="rounded-sm shadow-sm border bg-white border-gray-200 p-3">
        <div className="flex justify-between items-center mb-5">
          <h6 className="font-semibold">Employee List</h6>
          <Link to={`/dashboard/add-employee`}><Button iconStart={<HiPlus />} size="md" variant="black">Add Employee</Button></Link>
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
