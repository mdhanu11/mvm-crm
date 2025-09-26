import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/shared/DataTable";
import { useApproveTimeDoctorDataMutation, useGetTimeDoctorFileContentQuery } from "../../services/time-doctor/timeDoctor.service";
import { TimeDoctorFileContent } from "../../types/TimeDoctor.type";
import EditTimeDoctorData from "./EditFileContent";
import ProcessPaymentModal from "./ProcessPaymentModal";

const TimeDoctorFileDetailPage = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const navigate = useNavigate();

  // Fetch file content using the API
  const { data, isLoading, } = useGetTimeDoctorFileContentQuery(fileId || "");
  const [editRow, setEditRow] = useState<TimeDoctorFileContent | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const approvedData = data?.data?.filter((row: any) => row.is_approved === "Yes") || [];

  const columns: ColumnDef<TimeDoctorFileContent>[] = [
    { enableSorting: false, accessorKey: "row_id", header: "Row ID", size: 80, cell: ({ row }) => row.index + 1 },
    { enableSorting: false, accessorKey: "name", header: "Name", size: 150 },
    { enableSorting: false, accessorKey: "personalEmail", header: "Personal Email", size: 200 },
    { enableSorting: false, accessorKey: "hours", header: "Hours", size: 80 },
    { enableSorting: false, accessorKey: "rate", header: "Rate", size: 80 },
    { enableSorting: false, accessorKey: "additionalHours", header: "Additional Hours", size: 120 },
    { enableSorting: false, accessorKey: "cbHours", header: "CB Hours", size: 100 },
    { enableSorting: false, accessorKey: "overpaidHours", header: "Overpaid Hours", size: 120 },
    { enableSorting: false, accessorKey: "bonus", header: "Bonus", size: 80 },
    { enableSorting: false, accessorKey: "cbRelease", header: "CB Release", size: 100 },
    { enableSorting: false, accessorKey: "amount", header: "Amount", size: 80 },
    { enableSorting: false, accessorKey: "advances", header: "Advances", size: 100 },
    { enableSorting: false, accessorKey: "total", header: "Total", size: 80 },
    { enableSorting: false, accessorKey: "batch", header: "Batch", size: 80 },
    { enableSorting: false, accessorKey: "wiseStatus", header: "Wise - Status", size: 120 },
    {
      enableSorting: false, accessorKey: "salarySlip",
      header: "Salary Slip",
      size: 100,
      cell: ({ row }) => {
        const value = row.original.salarySlip;
        if (!value) return "";

        // Check if it's a URL (simple check for http/https)
        const isUrl = value.startsWith('http://') || value.startsWith('https://');
        if (isUrl) {
          return (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              View Slip
            </a>
          );
        }

        return value;
      }
    },
    {
      enableSorting: false, accessorKey: "pdf",
      header: "PDF",
      size: 80,
      cell: ({ row }) => {
        const value = row.original.pdf;
        if (!value) return "";

        // Check if it's a URL (simple check for http/https)
        const isUrl = value.startsWith('http://') || value.startsWith('https://');

        if (isUrl) {
          return (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              View PDF
            </a>
          );
        }

        return value;
      }
    },
    { enableSorting: false, accessorKey: "email", header: "Email", size: 80 },
    { enableSorting: false, accessorKey: "remarks", header: "Remarks", size: 250 },
    {
      header: "Actions",
      accessorKey: "actions",
      size: 150,
      enableSorting: false,
      cell: ({ row }) => {
        const { id, is_approved } = row.original;
        const [approveTimeDoctorData, { isLoading }] = useApproveTimeDoctorDataMutation();

        const handleToggle = async () => {
          try {
            const nextStatus = is_approved === "Yes" ? "No" : "Yes";
            await approveTimeDoctorData({ id, is_approved: nextStatus }).unwrap();
          } catch (err) {
            console.error("Approval failed:", err);
          }
        };

        return (
          <div className="flex gap-2 justify-between">
            <button
              className={
                is_approved === "Yes"
                  ? "text-red-600 font-medium hover:underline"
                  : "text-green-600 font-medium hover:underline"
              }
              onClick={handleToggle}
              disabled={isLoading}
            >
              {is_approved === "Yes" ? "Disapprove" : "Approve"}
            </button>
            <button
              className="text-blue-600 font-medium hover:underline"
              onClick={() => setEditRow(row.original)}
            >
              Edit
            </button>
          </div>
        );
      }
    }
  ];

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          iconStart={<HiArrowLeft />}
          onClick={() => navigate("/dashboard/time-doctor")}
        >
          Back to Time Doctor List
        </Button>
        {/* <h1 className="text-2xl font-semibold">File Details: {fileName}</h1> */}
      </div>

      <div className="rounded shadow p-4 bg-white">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium mb-2">File Content</h2>
            {data?.data?.length ? (
              <p className="text-sm text-gray-600">
                Showing {data.data.length} records from the file
              </p>
            ) : (
              <p className="text-sm text-gray-500 italic"> Showing 0 records from the file</p>
            )}
          </div>
          <Button
            variant="black"
            onClick={() => setShowPaymentModal(true)}
          >
            Process Payment
          </Button>
        </div>

        {data?.data?.length ? (
          <div className="overflow-hidden h-[60vh]">
            <DataTable<TimeDoctorFileContent>
              columns={columns}
              data={data.data}
              pageIndex={0}
              pageSize={50}
              onPageChange={() => { }}
              onPageSizeChange={() => { }}
              sorting={[]}
              onSortingChange={() => { }}
              isLoading={isLoading}
              totalCount={data.data.length}
              hidePagination={true}
            />
          </div>
        ) : (
          !isLoading && (
            <div className="text-center text-gray-400 py-10">
              No data available for this file.
            </div>
          )
        )}
      </div>

      {/* Edit File COntent Popup */}
      <EditTimeDoctorData
        isOpen={!!editRow}
        rowData={editRow}
        onClose={() => setEditRow(null)}
        onSuccess={() => { }}
      />

      {/* Process Payment Popup */}
      <ProcessPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onProceed={() => {
          console.log("Proceeding with payment for:", approvedData);
          setShowPaymentModal(false);
        }}
        data={approvedData}
      />
    </>
  );
};

export default TimeDoctorFileDetailPage; 