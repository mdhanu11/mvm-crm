import { ColumnDef, SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import DataTable from "../../components/ui/shared/DataTable";
import { useGetTimeDoctorListQuery, downloadTimeDoctorFile } from "../../services/time-doctor/timeDoctor.service";

import { TimeDoctorItemInterface } from "../../types/TimeDoctor.type";
import Button from "../../components/ui/Button";
import { HiPlus, HiArrowDownTray } from "react-icons/hi2";
import AddData from "./AddData";
import { toast } from "react-toastify";

interface State {
  isModalOpen: boolean;
  sorting: SortingState;
  pageIndex: number;
  pageSize: number;
  // searchQuery: string;
  // searchField: string;
  dateFilter: string;
  userList: TimeDoctorItemInterface[];
  downloadingFileId: string | null;
}

export const TimeDoctorListPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    isModalOpen: false,
    sorting: [],
    pageIndex: 0,
    pageSize: 10,
    // searchQuery: "",
    // searchField: "name",
    dateFilter: "",
    userList: [],
    downloadingFileId: null,
  });

  // const [debouncedSearch, setDebouncedSearch] = useState(state.searchQuery);

  const { data, isLoading, refetch } = useGetTimeDoctorListQuery({
    page: state.pageIndex + 1,
    per_page: state.pageSize,
    sort_by: state.sorting[0]?.id,
    sort_order: state.sorting[0]?.desc ? "desc" : "asc",
    // search_by: debouncedSearch || undefined,
    // search_column: state.searchField || undefined,
    // date_filter: state.searchField === "date" ? state.dateFilter : undefined,
    date_filter: state.dateFilter || undefined,
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      userList: data?.data || [],
    }));
  }, [data]);

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedSearch(state.searchQuery);
  //   }, 900);
  //   return () => clearTimeout(handler);
  // }, [state.searchQuery]);

  const handleDownload = async (item: TimeDoctorItemInterface) => {
    const fileUrl = `${import.meta.env.VITE_BACKEND_API_URL}/${item.file}`;
    const fileName = item.file;
    
    try {
      setState((prev) => ({ ...prev, downloadingFileId: item.id }));
      const blob = await downloadTimeDoctorFile(fileUrl);
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('File downloaded successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to download file. Please try again later.');
    } finally {
      setState((prev) => ({ ...prev, downloadingFileId: null }));
    }
  };

  const columns: ColumnDef<TimeDoctorItemInterface>[] = [
    { 
     
      header: "File",
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/dashboard/time-doctor/file/${row.original.id}`)}
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
        >
          {row.original.file_name}
        </button>
      )
    },
    { accessorKey: "month", header: "Month" },
    { accessorKey: "year", header: "Year" },
    { accessorKey: "uploaded_at", header: "Uploaded At" },
    { accessorKey: "uploaded_by", header: "Uploaded By" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-3">
          <button
            onClick={() => handleDownload(row.original)}
            disabled={state.downloadingFileId === row.original.id}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            title="Download File"
          >
            {state.downloadingFileId === row.original.id ? (
              <>
                <div className="w-3 h-3 animate-spin border border-blue-600 border-t-transparent rounded-full"></div>
                Loading...
              </>
            ) : (
              <>
                <HiArrowDownTray className="w-3 h-3" />
                Download
              </>
            )}
          </button>

          <button
                  className="text-red-600 font-medium hover:underline"
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      confirmDeleteStaff: row.original,
                    }));
                  }}
                >
                  Delete
                </button>
        </div>
      )
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <h3 className="font-semibold text-xl">Time Doctor List</h3>
        <div className="flex gap-2">
          <Button
            iconStart={<HiPlus />}
            variant="black"
            onClick={() =>
              setState((prev) => ({ ...prev, isModalOpen: true }))
            }
          >
            Import Data
          </Button>
        </div>
      </div>

      <div className="rounded shadow p-4 bg-white">
        <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-4 w-full mb-4">
          {/* <div className="flex-1">
            <Input
              dropdownOptions={[
                { label: "Name", value: "name" },
                { label: "Role", value: "role" },
                { label: "Job Title", value: "job_title" },
                { label: "Date", value: "date" },
              ]}
              dropdownValue={state.searchField}
              onDropdownChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  searchField: e.target.value,
                  pageIndex: 0,
                }))
              }
              value={state.searchQuery}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  searchQuery: e.target.value,
                  pageIndex: 0,
                }))
              }
              iconStart={<HiSearch size={18} />}
              placeholder={`Search by ${state.searchField.replace("_", " ")}`}
              inputSize="sm"
              type="search"
            />

{state.searchField === "date" ? (
  <input
    type="date"
    value={state.dateFilter}
    onChange={(e) =>
      setState((prev) => ({
        ...prev,
        dateFilter: e.target.value,
        pageIndex: 0,
      }))
    }
    className="border rounded px-3 py-2 text-sm "
  />
) : (
  <Input
    dropdownOptions={[
      { label: "Name", value: "name" },
      { label: "Role", value: "role" },
      { label: "Job Title", value: "job_title" },
      { label: "Date", value: "date" }, // must match value in state
    ]}
    dropdownValue={state.searchField}
    onDropdownChange={(e) =>
      setState((prev) => ({
        ...prev,
        searchField: e.target.value,
        pageIndex: 0,
      }))
    }
    value={state.searchQuery}
    onChange={(e) =>
      setState((prev) => ({
        ...prev,
        searchQuery: e.target.value,
        pageIndex: 0,
      }))
    }
    iconStart={<HiSearch size={18} />}
    placeholder={`Search by ${state.searchField.replace("_", " ")}`}
    inputSize="sm"
    type="search"
  />
)}

          </div> */}

          {/* Date Filter */}
          <div className="flex items-center">
            <label htmlFor="" className="text-nowrap text-sm text-gray-400 me-2">Filter By Date:</label>
            <Input
              type="date"
              value={state.dateFilter}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  dateFilter: e.target.value,
                  pageIndex: 0,
                }))
              }
            />
          </div>
        </div>

        <DataTable<TimeDoctorItemInterface>
          columns={columns}
          data={state.userList}
          pageIndex={state.pageIndex}
          pageSize={state.pageSize}
          onPageChange={(page) => setState((prev) => ({ ...prev, pageIndex: page }))}
          onPageSizeChange={(size) => setState((prev) => ({ ...prev, pageSize: size }))}
          sorting={state.sorting}
          onSortingChange={(updater) =>
            setState((prev) => ({
              ...prev,
              sorting: typeof updater === "function" ? updater(prev.sorting) : updater,
            }))
          }
          isLoading={isLoading}
          totalCount={data?.total_records || 0}
        />
      </div>

      {state.isModalOpen && (
        <AddData
          isOpen={state.isModalOpen}
          onClose={() =>
            setState((prev) => ({
              ...prev,
              isModalOpen: false,
            }))
          }
          onSuccess={() => {
            refetch();
            setState((prev) => ({
              ...prev,
              isModalOpen: false,
            }));
          }}
        />
      )}
    </>
  );
};
