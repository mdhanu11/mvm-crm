import { PDFViewer, usePDF } from "@react-pdf/renderer";
import Dialog from "../../../components/ui/Dialog";
import PayslipPdf from "./PaySlipPdf";
import Button from "../../../components/ui/Button";
import { HiOutlineDownload } from "react-icons/hi";
import { useEffect, useMemo } from "react";

function PaySlipViewModal({ isOpen, handleClose, paySlipMonth }: { isOpen: boolean, handleClose: any, paySlipMonth: string | null }) {
    const pdfDocument = useMemo(() => {
        return <PayslipPdf />;
    }, [isOpen]); // recreate only when modal opens

    const [pdfInstance, updatePdfInstance] = usePDF({ document: pdfDocument });

    useEffect(() => {
        if (isOpen) {
            updatePdfInstance(pdfDocument);
        }
    }, [isOpen, pdfDocument, updatePdfInstance]);

    const handleDownload = () => {
        if (pdfInstance.blob) {
            const blobUrl = URL.createObjectURL(pdfInstance.blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `Payslip ${paySlipMonth}.pdf`;
            link.click();
            URL.revokeObjectURL(blobUrl);
        }
    };

    return (
        <Dialog maxWidth="max-w-[800px]" isOpen={isOpen} onClose={handleClose}>
            <h6 className="text-center mb-2">Payslip {paySlipMonth}</h6>

            <div className="max-h-[500px] overflow-y-auto">
                <PDFViewer width="100%" height="400">
                    {pdfDocument}
                </PDFViewer>
            </div>

            <div className="text-end mt-5">
                <Button
                    loading={pdfInstance.loading}
                    iconStart={<HiOutlineDownload />}
                    onClick={handleDownload}
                    variant="black"
                >
                    Download
                </Button>
            </div>
        </Dialog>
    );
}

export default PaySlipViewModal;
