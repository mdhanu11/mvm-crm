import React from "react";
import { TimeDoctorFileContent } from "../../types/TimeDoctor.type";
import Button from "../../components/ui/Button";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../components/ui/shared/DataTable";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onProceed: () => void;
    data: TimeDoctorFileContent[];
};

const ProcessPaymentModal: React.FC<Props> = ({ isOpen, onClose, onProceed, data }) => {
    if (!isOpen) return null;

    const columns: ColumnDef<TimeDoctorFileContent>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "hours",
            header: "Hours",
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: "total",
            header: "Total",
            cell: (info) => info.getValue(),
        },
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Process Payment</h2>

                <div className="max-h-[70vh] overflow-y-auto pr-2">
                    {data.length > 0 ? (
                        <DataTable<TimeDoctorFileContent>
                            columns={columns}
                            data={data}
                            totalCount={data.length}
                            pageIndex={0}
                            pageSize={data.length} // show all in popup
                            onPageChange={() => { }}
                            onPageSizeChange={() => { }}
                            sorting={[]}
                            onSortingChange={() => { }}
                            hidePagination={true} // ✅ no pagination in modal
                        />
                    ) : (
                        <p className="text-gray-500 italic">No approved records found.</p>
                    )}

                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="black" onClick={onProceed} disabled={data.length === 0}>
                        Proceed
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProcessPaymentModal;
