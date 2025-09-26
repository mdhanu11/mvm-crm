import { ColumnDef, OnChangeFn, SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { HiPlus, HiSearch } from "react-icons/hi";
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/shared/DataTable";
import {
    useGetStaffListQuery,
    useManageStaffMutation,
} from "../../services/staff/staff.service";
import AddStaffForm from "./AddStaffForm";
import { StaffInterface } from "./store/types";
import Input from "../../components/ui/Input";
import Dialog from "../../components/ui/Dialog";

interface StaffState {
    pageIndex: number;
    pageSize: number;
    sorting: SortingState;
    isModalOpen: boolean;
    editingStaff: StaffInterface | null;
    staffList: StaffInterface[];
    totalUsers: number;
    searchField: 'email' | 'full_name' | 'username';
    searchTerm: string;
    deleteLoading: boolean;
    confirmDeleteStaff: StaffInterface | null;
}

function StaffListPage() {
    const [state, setState] = useState<StaffState>({
        pageIndex: 0,
        pageSize: 10,
        sorting: [],
        isModalOpen: false,
        editingStaff: null,
        staffList: [],
        totalUsers: 0,
        searchField: 'email',
        searchTerm: '',
        deleteLoading: false,
        confirmDeleteStaff: null,
    });

    const [manageStaff] = useManageStaffMutation();

    const { data: staffData, isLoading } = useGetStaffListQuery({
        sort_by: state.sorting[0]?.id,
        sort_order: state.sorting[0]?.desc ? "desc" : "asc",
        page: state.pageIndex + 1,
        per_page: state.pageSize,
        [state.searchField]: state.searchTerm || undefined,
    });


    const handleEdit = (staff: StaffInterface) => {
        setState((prev) => ({
            ...prev,
            editingStaff: staff,
            isModalOpen: true,
        }));
    };

    const columns: ColumnDef<StaffInterface>[] = [
        {
            header: "Sno",
            enableSorting: true,
            cell: ({ row }) => <>{row.index + 1 + (state?.pageIndex * state?.pageSize)}</>,
        },
        {
            sortDescFirst: true,
            accessorKey: "full_name",
            header: "Full Name",
        },
        {
            sortDescFirst: true,
            accessorKey: "email",
            header: "Email",
        },
        {
            sortDescFirst: true,
            accessorKey: "username",
            header: "Username",
        },
        {
            header: "Permission",
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.module_permissions.map((perm: string) => (
                        <span
                            key={perm}
                            className="bg-gray-200 text-xs px-2 py-0.5 rounded"
                        >
                            {perm}
                        </span>
                    ))}
                </div>
            ),
        },
        

        {
            id: "actions",
            header: "Action",
            cell: ({ row }) => (
              <div className="flex gap-3">
                <button
                  className="text-blue-600 font-medium hover:underline"
                  onClick={() => handleEdit(row.original)}
                >
                  Edit
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
            ),
          }
    ];

    const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
        setState((prev) => {
            const newSorting =
                typeof updater === "function" ? updater(prev.sorting) : updater;

            return {
                ...prev,
                sorting: newSorting,
                pageIndex: 0, // optional: reset to first page when sorting changes
            };
        });
    };

    useEffect(() => {
        let totalPages = Math.ceil(state.totalUsers / state.pageSize) -1;
        totalPages = totalPages<0?0:totalPages
        if (totalPages < state.pageIndex) setState((prev) => ({ ...prev, pageIndex: totalPages, }))
    }, [state.totalUsers])


    useEffect(() => {
        
        if (staffData) {
            const {
                total_users = 0,
                users = [],
            }: {
                total_users?: number;
                users?: StaffInterface[];
            } = staffData;

            setState((prev) => ({
                ...prev,
                staffList: users,
                totalUsers: total_users,
            }));
        }
    }, [staffData]);


    return (
        <>
            {state.confirmDeleteStaff && (
                <Dialog
                    isOpen={!!state.confirmDeleteStaff}
                    onClose={() =>
                        setState((prev) => ({ ...prev, confirmDeleteStaff: null }))
                    }
                    title="Confirm Deletion"
                >
                    <p>
                        Are you sure you want to delete{" "}
                        <strong>{state.confirmDeleteStaff.full_name}</strong>?
                    </p>
                    <div className="mt-4 flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() =>
                                setState((prev) => ({ ...prev, confirmDeleteStaff: null }))
                            }
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            loading={state.deleteLoading}
                            onClick={async () => {
                                setState((prev) => ({
                                    ...prev,
                                    deleteLoading: true,
                                }));
                                await manageStaff({
                                    action: "delete",
                                    username: state.confirmDeleteStaff!.username,
                                });
                                setState((prev) => ({
                                    ...prev,
                                    deleteLoading: false,
                                    confirmDeleteStaff: null,
                                }));
                            }}
                        >
                            Confirm
                        </Button>
                    </div>
                </Dialog>
            )}

            <div className="flex justify-between items-center mb-7">
                <h3 className="font-semibold text-xl">Staff Management</h3>
                <Button
                    iconStart={<HiPlus />}
                    size="md"
                    variant="black"
                    onClick={() =>
                        setState((prev) => ({ ...prev, isModalOpen: true }))
                    }
                >
                    Create New Staff
                </Button>
            </div>

            <div className="rounded-sm shadow-sm border bg-white border-gray-200 p-3">
                <div className="flex items-center gap-2 mb-4">
                    <Input
                        dropdownOptions={[
                            { label: "Email", value: "email" },
                            { label: "Full Name", value: "full_name" },
                            { label: "Username", value: "username" },
                        ]}
                        dropdownValue={state.searchField}
                        onDropdownChange={(e) =>
                            setState((prev) => ({
                                ...prev,
                                searchField: e.target.value as 'email' | 'full_name' | 'username',
                                pageIndex: 0, // reset to first page
                            }))
                        }
                        value={state.searchTerm}
                        onChange={(e) =>
                            setState((prev) => ({
                                ...prev,
                                searchTerm: e.target.value,
                                pageIndex: 0,
                            }))
                        }
                        iconStart={<HiSearch size={18} />}
                        placeholder={`Search staff by ${state.searchField.replace("_", " ")}`}
                        inputSize="sm"
                        type="search"
                    />
                </div>


                <DataTable<StaffInterface>
                    columns={columns}
                    data={state.staffList}
                    totalCount={state.totalUsers}
                    pageIndex={state.pageIndex}
                    pageSize={state.pageSize}
                    onPageChange={(page) =>
                        setState((prev) => ({ ...prev, pageIndex: page, }))
                    }
                    onPageSizeChange={(size) =>
                        setState((prev) => ({ ...prev, pageSize: size, pageIndex: 0, }))
                    }
                    sorting={state.sorting}
                    onSortingChange={handleSortingChange}
                    isLoading={isLoading}
                />
            </div>

            {state.isModalOpen && (
                <AddStaffForm
                    onClose={() =>
                        setState((prev) => ({
                            ...prev,
                            isModalOpen: false,
                            editingStaff: null,
                        }))
                    }
                    defaultValues={state.editingStaff}
                />
            )}
        </>
    );
}

export default StaffListPage;
