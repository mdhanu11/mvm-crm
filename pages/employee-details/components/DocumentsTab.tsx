import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { ColumnDef } from "@tanstack/react-table";
import DataTable from '../../../components/ui/shared/DataTable';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { HiOutlinePhotograph, HiSearch } from 'react-icons/hi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { CiFilter } from 'react-icons/ci';
import UploadModal from './UploadModal';
type Document = {
    name: string;
    category: string;
    size: string;
    format: string;
    uploadedOn: string;
    uploadedBy: string;
};

const recentDocs = [
    { name: 'Graduation Degree', date: '12/04/25', size: '34 KB', icon: <IoDocumentTextOutline /> },
    { name: 'Appointment Letter', date: '12/04/25', size: '34 KB', icon: <IoDocumentTextOutline /> },
    { name: 'Passport size Photo', date: '12/04/25', size: '34 KB', icon: <HiOutlinePhotograph /> },
];

// mockDocuments.ts
export const mockDocuments: Document[] = [
    {
        name: 'Jeremy-28292-129',
        category: 'Appointment Letter',
        size: '11 KB',
        format: 'Docx.',
        uploadedOn: '10/28/12',
        uploadedBy: 'Kristin Watson',
    },
    {
        name: '231839',
        category: 'Appointment Letter',
        size: '11 KB',
        format: 'PDF',
        uploadedOn: '7/18/17',
        uploadedBy: 'Jenny Wilson',
    },
    {
        name: 'Compressed_123',
        category: 'Appointment Letter',
        size: '11 KB',
        format: 'PDF',
        uploadedOn: '4/4/18',
        uploadedBy: 'Jenny Wilson',
    },
    {
        name: 'Microsoft word_123',
        category: 'Appointment Letter',
        size: '11 KB',
        format: 'Docx.',
        uploadedOn: '8/21/15',
        uploadedBy: 'Jenny Wilson',
    },
    {
        name: 'Image_123',
        category: 'Appointment Letter',
        size: '11 KB',
        format: 'PDF',
        uploadedOn: '2/11/12',
        uploadedBy: 'Kristin Watson',
    },
];

const DocumentSection: React.FC = () => {

    const documentColumns: ColumnDef<Document>[] = [
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
        },
        {
            accessorKey: "category",
            header: "Category",
        },
        {
            accessorKey: "size",
            header: "Size",
        },
        {
            accessorKey: "format",
            header: "Format",
        },
        {
            accessorKey: "uploadedOn",
            header: "Uploaded on",
        },
        {
            accessorKey: "uploadedBy",
            header: "Uploaded by",
        },
        {
            id: "actions",
            enableSorting: false,
            header: () => <span className="text-center block">Action</span>,
            cell: () => (
                <button className="text-gray-500 hover:text-red-600">
                    <FaTrashAlt />
                </button>
            ),
        },
    ];

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [sorting, setSorting] = useState<any>([]);
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="space-y-6">
            {/* Recent Documents */}
            <UploadModal isOpen={isOpen} onClose={()=>{
                setIsOpen(false)
            }} />
            <div>
                <h2 className="text-lg font-semibold mb-3">Recent</h2>
                <div className="grid grid-cols-3 gap-4">
                    {recentDocs.map((doc) => (
                        <div key={doc.name} className="bg-white rounded-md shadow-sm p-4 w-full">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-800">
                                    {doc.icon}
                                </div>
                                <div className="font-medium text-sm">{doc.name}</div>
                            </div>
                            <div className="text-xs text-gray-500">{doc.date} · {doc.size}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-3">Document List</h2>
                {/* Documents Table */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex justify-between items-center mb-4 gap-5">
                        <Input iconStart={<HiSearch />} containerClassName='w-full' placeholder='Search document' />
                        <Button variant='outline' className='shrink-0' iconStart={<CiFilter />}>
                            Sort
                        </Button>

                        <Button variant='black' onClick={()=>{
                            setIsOpen(true);
                        }} className='shrink-0' iconStart={<FiUpload />}>
                            Upload Documents
                        </Button>

                    </div>

                    <div className="overflow-auto">
                        <DataTable<Document>
                            columns={documentColumns}
                            data={mockDocuments}
                            totalCount={mockDocuments.length}
                            pageIndex={pageIndex}
                            pageSize={pageSize}
                            onPageChange={setPageIndex}
                            onPageSizeChange={setPageSize}
                            sorting={sorting}
                            onSortingChange={setSorting}
                            isLoading={false}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DocumentSection;
