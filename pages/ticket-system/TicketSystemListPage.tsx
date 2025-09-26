import { ColumnDef, SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { HiPlus, HiSearch } from "react-icons/hi";
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/shared/DataTable";
import AddTicketForm from "./AddTicketForm";
import { TicketListItemInterface } from "../../types/Ticketing.type";
import { useGetTicketListQuery } from "../../services/ticketing/ticketing.service";
import Input from "../../components/ui/Input";
import TicketDetailModal from "./TicketDetailModal";
import Select from "../../components/ui/Select";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../constants/ticketing.constants";
import { getTicketPriorityColor, getTicketStatusColor } from "./store/helper";

interface State {
    isModalOpen: boolean;
    editingTicket: TicketListItemInterface | null;
    sorting: SortingState;
    pageIndex: number;
    pageSize: number;
    confirmDeleteTicket: TicketListItemInterface | null;
    ticketList: TicketListItemInterface[];
    searchQuery: string;
    selectedIds: string[];
    ticketDetails: TicketListItemInterface | null;
    searchField: string;
    priorityFilter: string;
    statusFilter: string;
}

const TicketListPage = () => {
    const [state, setState] = useState<State>({
        isModalOpen: false,
        editingTicket: null,
        sorting: [],
        pageIndex: 0,
        pageSize: 10,
        confirmDeleteTicket: null,
        ticketList: [],
        searchQuery: "",
        selectedIds: [],
        ticketDetails: null,
        searchField: "ticket_id",
        priorityFilter: "",
        statusFilter: "",
    });

    const [debouncedSearch, setDebouncedSearch] = useState(state.searchQuery);

    const { data, isLoading, refetch } = useGetTicketListQuery({
        page: state.pageIndex + 1,
        per_page: state.pageSize,
        sort_by: state.sorting[0]?.id,
        sort_order: state.sorting[0]?.desc ? "desc" : "asc",
        search_by: debouncedSearch || undefined,
        search_column: state?.searchField || undefined,
        priority_filter: state.priorityFilter || undefined,
        status_filter: state.statusFilter || undefined,
    });

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            ticketList: data?.items || [],
        }));
    }, [data]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(state.searchQuery);
        }, 900); // Debounce delay in milliseconds

        return () => {
            clearTimeout(handler);
        };
    }, [state.searchQuery]);


    const columns: ColumnDef<TicketListItemInterface>[] = [
        { accessorKey: "ticket_id", header: "ID" },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <button
                    className="font-semibold hover:underline"
                    onClick={() =>
                        setState((prev) => ({ ...prev, ticketDetails: row.original }))
                    }
                >
                    {row.original.title}
                </button>
            ),
        },
        {
            accessorKey: "priority",
            header: "Priority",
            cell: ({ row }) => {
                const value = row.original.priority;

                return (
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getTicketPriorityColor(value) || ""}`}
                    >
                        {value}
                    </span>
                );
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const value = row.original.status;

                return (
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getTicketStatusColor(value) || ""}`}
                    >
                        {value}
                    </span>
                );
            },
        },
        { accessorKey: "department", header: "Department" },
        { accessorKey: "created_by", header: "Created By" },
        { accessorKey: "assigned_to", header: "Assigned To" },
    ];

    return (
        <>
            {state.ticketDetails && (
                <TicketDetailModal
                    ticket={state.ticketDetails}
                    onClose={() => setState((prev) => ({ ...prev, ticketDetails: null }))}
                />
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-7">
                <h3 className="font-semibold text-xl">Ticket List</h3>
                <div className="flex gap-2">
                    <Button
                        iconStart={<HiPlus />}
                        variant="black"
                        onClick={() =>
                            setState((prev) => ({ ...prev, isModalOpen: true }))
                        }
                    >
                        Create New Ticket
                    </Button>
                </div>
            </div>

            {/* Search + Table */}
            <div className="rounded shadow p-4 bg-white">
                <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-4 w-full mb-4">
                    <div className="flex-1">
                        <Input
                            dropdownOptions={[
                                { label: "ID", value: "ticket_id" },
                                { label: "Title", value: "title" },
                                { label: "Department", value: "department" },
                                { label: "Created By", value: "created_by" },
                                { label: "Assigned To", value: "assigned_to" },
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
                            placeholder={`Search ticket by ${state.searchField.replace("_", " ")}`}
                            inputSize="sm"
                            type="search"
                        />
                    </div>

                    {/* Priority Filter */}
                    <Select
                        value={state.priorityFilter}
                        onChange={(e) =>
                            setState((prev) => ({
                                ...prev,
                                priorityFilter: e.target.value,
                                pageIndex: 0,
                            }))
                        }
                        selectSize="md"
                    >
                        {PRIORITY_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </Select>

                    {/* Status Filter */}
                    <Select
                        value={state.statusFilter}
                        onChange={(e) =>
                            setState((prev) => ({
                                ...prev,
                                statusFilter: e.target.value,
                                pageIndex: 0,
                            }))
                        }
                        selectSize="md"
                    >
                        {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </Select>
                </div>

                <DataTable<TicketListItemInterface>
                    columns={columns}
                    data={state.ticketList}
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
                <AddTicketForm
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

export default TicketListPage;
