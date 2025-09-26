import { useState } from "react";
import { downloadTicketAttachment } from "../../../services/ticketing/ticketing.service";
import { getTicketPriorityColor, getTicketStatusColor } from "../store/helper";
import { toast } from "react-toastify";

interface Props {
    title: string;
    description: string;
    status: string;
    priority: string;
    screenshot?: string;
}

const TicketHeader = ({ title, description, status, priority, screenshot }: Props) => {
    const [isFileLoading, setIsFileLoading] = useState(false)
    const handleDownload = async () => {
        if(!screenshot)
            return;
        try {
            setIsFileLoading(true);
            const blob = await downloadTicketAttachment(screenshot!);
            const fileUrl = URL.createObjectURL(blob);
            window.open(fileUrl, "_blank");
        } catch (err) {
            console.log(err)
            toast.error('Failed to load file. Please try again later.')
        } finally {
            setIsFileLoading(false)
        }
    };

    return <div className="mb-3">
        <div className="flex flex-wrap items-start justify-between gap-4 ">
            <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">{title}</h2>
            </div>

            {screenshot && (
                <button onClick={()=>{handleDownload()}} className="inline-flex items-center gap-2 text-sm font-medium text-blue-600">
                {isFileLoading?'Loading...':'View Attachment'}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>              
            )}

            <div className="flex gap-2 flex-shrink-0">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTicketStatusColor(status)}`}>{status}</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getTicketPriorityColor(priority)}`}>{priority}</span>
            </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-4">{description}</p>
    </div>
};

export default TicketHeader;
