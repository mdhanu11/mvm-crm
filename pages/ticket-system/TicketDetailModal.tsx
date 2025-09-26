import { useState } from "react";
import Dialog from "../../components/ui/Dialog";
import { TicketListItemInterface } from "../../types/Ticketing.type";
import { useAppSelector } from "../../store/store";
import { useUpdateTicketMutation } from "../../services/ticketing/ticketing.service";
import TicketHeader from "./components/TicketHeader";
import TicketComments from "./components/TicketComments";
import TicketStatusPriorityForm from "./components/TicketStatusPriorityForm";
import TicketFooterActions from "./components/TicketFooterActions";
import TicketMetaInfo from "./components/TicketMetaInfo";
import { DEFAULT_ASSIGNED_TO_USERNAME } from "../../constants/ticketing.constants";

interface Props {
    ticket: TicketListItemInterface;
    onClose: () => void;
}

const TicketDetailModal = ({ ticket, onClose }: Props) => {
    const user = useAppSelector((state) => state.auth);
    const [updateTicket, { isLoading }] = useUpdateTicketMutation();

    const [status, setStatus] = useState(ticket.status);
    const [priority, setPriority] = useState(ticket.priority);
    const [assignee, setAssignee] = useState(ticket.assigned_to);
    const [department, setDepartment] = useState(ticket.department);
    const [newComment, setNewComment] = useState("");
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const safeParse = (str: string) => {
        try {
            return JSON.parse(str || "[]");
        } catch {
            return [];
        }
    };

    const [localComments, setLocalComments] = useState<any>(safeParse(ticket.comments));
    const [collaborators, setCollaborators] = useState(JSON.parse(ticket.collaborators || "[]") || []);
    const userName = user?.username || "You";

    const ensureCollaborator = (list: string[]) =>
        list.includes(userName) ? list : [...list, userName];

    const handleStatusChange = (value: string) => {
        setStatus(value);
        setHasUnsavedChanges(value !== ticket.status);
    };

    const handlePriorityChange = (value: string) => {
        setPriority(value);
        setHasUnsavedChanges(value !== ticket.priority);
    };
    const handleAssigneeChange = (value: string) => {
        setAssignee(value);
        setHasUnsavedChanges(value !== ticket.assigned_to);
    };
    const handleDepartmentChange = (value: string) => {
        setDepartment(value);
        setHasUnsavedChanges(value !== ticket.department);
    };

    const saveChanges = async () => {
        try {
            const updatedCollaborators = collaborators.includes(assignee) ? collaborators : [...collaborators, assignee];
            await updateTicket({
                ticket_id: ticket.ticket_id,
                status,
                priority,
                department,
                collaborators: ensureCollaborator(updatedCollaborators),
            }).unwrap();
            setHasUnsavedChanges(false);
            onClose();
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        const newEntry = {
            id: Math.random().toString(36).substr(2, 9),
            user: userName,
            message: newComment.trim(),
            created_at: new Date().toISOString().split("T")[0],
        };

        const updatedComments = [...localComments, newEntry];
        const updatedCollaborators = ensureCollaborator(collaborators);

        setLocalComments(updatedComments);
        setCollaborators(updatedCollaborators);
        setNewComment("");

        try {
            await updateTicket({
                ticket_id: ticket.ticket_id,
                comments: updatedComments,
                collaborators: updatedCollaborators,
            }).unwrap();
        } catch (err) {
            console.error("Comment add failed:", err);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAddComment();
        }
    };

    return (
        <Dialog isOpen={!!ticket} onClose={onClose} maxWidth="max-w-[1000px]" title={`Ticket #${ticket.ticket_id}, Created At: ${ticket.created_at}`}>
            <div className="flex flex-col h-full max-h-[80vh]">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    
                    <TicketHeader
                        title={ticket.title}
                        description={ticket.description}
                        status={status}
                        priority={priority}
                        screenshot={ticket.screenshot}
                    />
                    <TicketMetaInfo
                        createdBy={ticket.created_by}
                        assignedTo={ticket.assigned_to}
                        department={ticket.department}
                        collaborators={JSON.parse(ticket.collaborators || "[]")}
                    />
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                    {
                        (ticket.assigned_to == user.username || user.username == DEFAULT_ASSIGNED_TO_USERNAME) && <TicketStatusPriorityForm
                            status={status}
                            priority={priority}
                            assignee={assignee}
                            onStatusChange={handleStatusChange}
                            onPriorityChange={handlePriorityChange}
                            onAssigneeChange={handleAssigneeChange}
                            department={department}
                            onDepartmentChange={handleDepartmentChange}
                        />
                    }


                    <TicketComments
                        comments={localComments}
                        newComment={newComment}
                        onChange={setNewComment}
                        onAdd={handleAddComment}
                        onKeyPress={handleKeyPress}
                    />
                </div>

                <TicketFooterActions
                    hasUnsavedChanges={hasUnsavedChanges}
                    isLoading={isLoading}
                    onClose={onClose}
                    onSave={saveChanges}
                />
            </div>
        </Dialog>
    );
};

export default TicketDetailModal;
