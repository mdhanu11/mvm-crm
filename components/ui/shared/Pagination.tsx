type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (pageIndex: number) => void;
    pageSize: number;
};

const Pagination = ({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }: PaginationProps) => {
    const MAX_VISIBLE = 5; // Maximum visible page buttons (excluding first/last and ellipsis)

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= MAX_VISIBLE + 2) {
            // Show all pages
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            const start = Math.max(1, currentPage - 1);
            const end = Math.min(totalPages - 2, currentPage + 1);

            pages.push(0); // First page

            if (start > 1) {
                pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 2) {
                pages.push('...');
            }

            pages.push(totalPages - 1); // Last page
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-600 ">
            <div>Page {totalPages==0?0:(currentPage + 1)} of {totalPages}</div>

            <div className="flex items-center gap-1 bg-gray-50">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                    ← Prev
                </button>

                {getPageNumbers().map((page, index) => (
                    typeof page === 'number' ? (
                        <button
                            key={index}
                            onClick={() => onPageChange(page)}
                            className={`w-8 h-8 text-sm rounded ${page === currentPage
                                ? "bg-gray-800 text-gray-50 font-semibold"
                                : "hover:bg-gray-100"
                                }`}
                        >
                            {page + 1}
                        </button>
                    ) : (
                        <span
                            key={`dots-${index}`}
                            className="px-2 text-gray-400"
                        >
                            ...
                        </span>
                    )
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage + 1 >= totalPages}
                    className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                    Next →
                </button>
            </div>

            <div className="flex items-center justify-end">
                <label className="text-sm text-gray-700 mr-2">Rows:</label>
                <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className="border text-sm px-2 py-1 rounded"
                >
                    {[10, 25, 50, 100].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Pagination;
