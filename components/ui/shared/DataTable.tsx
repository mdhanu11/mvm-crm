import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    ColumnDef,
    SortingState,
    getSortedRowModel,
    OnChangeFn,
} from "@tanstack/react-table";
import Pagination from "./Pagination";
import Sorter from "./Sorter";

type DataTableProps<T> = {
    columns: ColumnDef<T, any>[];
    data: T[];
    totalCount: number;
    pageIndex: number;
    pageSize: number;
    onPageChange: (newPageIndex: number) => void;
    onPageSizeChange: (newPageSize: number) => void;
    sorting?: SortingState;
    onSortingChange?: OnChangeFn<SortingState>;
    isLoading?: boolean;
    hidePagination?: boolean
};

const DataTable = <T extends object>({
    columns,
    data,
    totalCount,
    pageIndex,
    pageSize,
    onPageChange,
    onPageSizeChange,
    sorting,
    onSortingChange,
    isLoading = false,
    hidePagination = false
}: DataTableProps<T>) => {
    const totalPages = Math.ceil(totalCount / pageSize);

    const table = useReactTable({
        data,
        columns,
        pageCount: totalPages,
        state: {
            pagination: {
                pageIndex,
                pageSize,
            },
            sorting,
        },
        manualPagination: true,
        manualSorting: true,
        onSortingChange: onSortingChange,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="w-full max-w-full overflow-auto h-full">
            <div className="w-full max-w-full relative">
                <table className="w-full text-sm text-left bg-white border border-gray-300">
                    <thead className="text-xs text-gray-500 bg-gray-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    // Skip rendering placeholder headers (e.g. in grouped columns)
                                    if (header.isPlaceholder) return null;

                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className="px-4 py-3 font-medium whitespace-nowrap max-w-[400px] text-nowrap border border-gray-300"
                                        >
                                            <div
                                                className="flex items-center gap-1 font-semibold text-black"
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getCanSort() && (
                                                    <Sorter sort={header.column.getIsSorted()} />
                                                )}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>


                    <tbody className="text-gray-700">
                        {isLoading ? (
                            // ✅ Skeleton Rows
                            Array.from({ length: 10 }).map((_, idx) => (
                                <tr key={`skeleton-${idx}`} className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                    {columns.map((_, colIdx) => (
                                        <td key={colIdx} className="px-4 py-3 ">
                                            <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4" />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className={`${"bg-white"} hover:bg-gray-50 transition-colors ease-in-out duration-150 border border-gray-300`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-3 whitespace-nowrap  border border-gray-300">
                                            <div className="max-w-[400px] text-wrap">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-3 whitespace-nowrap ">No data found...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {!hidePagination && <Pagination
                currentPage={pageIndex}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
            />}
        </div>
    );
};

export default DataTable;
