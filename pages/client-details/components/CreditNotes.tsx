import React, { useState } from 'react';
import { BiDownload } from 'react-icons/bi';
import Button from '../../../components/ui/Button';
import { HiPlus } from 'react-icons/hi';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '../../../components/ui/shared/DataTable';
import Dialog from '../../../components/ui/Dialog';
import Input from '../../../components/ui/Input';

type CreditNote = {
    creditNote: string;
    issuedBy: string;
    issuedOn: string;
    hours: number;
    amount: string;
    status: 'Used' | 'Unused';
};



const columns: ColumnDef<CreditNote>[] = [
    {
        accessorKey: 'creditNote',
        enableSorting: false,
        header: 'Credit Note',
    },
    {
        accessorKey: 'issuedBy',
        enableSorting: false,
        header: 'Issued by',
    },
    {
        accessorKey: 'issuedOn',
        enableSorting: false,
        header: 'Issued on',
    },
    {
        accessorKey: 'hours',
        enableSorting: false,
        header: 'No. of hours',
    },
    {
        accessorKey: 'amount',
        enableSorting: false,
        header: 'Amount',
    },
    {
        accessorKey: 'status',
        enableSorting: false,
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${status === 'Used' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {status}
                </span>
            );
        },
    },
    {
        id: 'actions',
        header: '',
        cell: () => <BiDownload size={24} className='font-bold' />,
    },
];

const CreditNotes: React.FC = () => {
    const mockData: CreditNote[] = [
        {
            creditNote: 'CN_123',
            issuedBy: 'June',
            issuedOn: '12/04/2023',
            hours: 12,
            amount: '$2000',
            status: 'Unused',
        },
        {
            creditNote: 'CN_123',
            issuedBy: 'June',
            issuedOn: '12/04/2023',
            hours: 12,
            amount: '$2000',
            status: 'Used',
        },
        {
            creditNote: 'CN_123',
            issuedBy: 'June',
            issuedOn: '12/04/2023',
            hours: 12,
            amount: '$2000',
            status: 'Used',
        },
    ];

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [creditNoteState, setCreditNoteState] = useState({
        addModalOpen: false,
    })
    return (
        <>
            <div className="bg-white shadow-sm p-4 rounded-lg">
                <h3 className="font-semibold text-base mb-4">Credit Note</h3>

                <DataTable<CreditNote>
                    columns={columns}
                    data={mockData}
                    totalCount={mockData.length}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    onPageChange={setPageIndex}
                    onPageSizeChange={setPageSize}
                    isLoading={false}
                    hidePagination={true}
                />

                <div className="mt-4">
                    <Button
                        variant="outline"
                        iconStart={<HiPlus />}
                        onClick={()=>{
                            setCreditNoteState({...creditNoteState, addModalOpen: true})
                        }}
                    >
                        Create Credit Note
                    </Button>
                </div>
            </div>

            <Dialog maxWidth='max-w-2xl' onClose={()=>{
                setCreditNoteState({...creditNoteState, addModalOpen: false})
            }} isOpen={creditNoteState?.addModalOpen} title='Create Credit Note'>
                <>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    <div>
                        <label className='mb-2'>No. of Hour</label>
                        <Input variant='soft' inputSize='lg' type='text' placeholder='No. of Hour' />
                    </div>
                    <div>
                        <label className='mb-2'>Amount</label>
                        <Input variant='soft' inputSize='lg' type='text' placeholder='Amount' />
                    </div>
                </div>
                <div className="text-end mt-5">
                    <Button variant='black'>Issue</Button>
                </div>
                </>
            </Dialog>
        </>
    );
};
export default CreditNotes;
