import Button from "../../../components/ui/Button";


interface Props {
    hasUnsavedChanges: boolean;
    isLoading: boolean;
    onClose: () => void;
    onSave: () => void;
}

const TicketFooterActions = ({ hasUnsavedChanges, isLoading, onClose, onSave }: Props) => (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <div className="text-sm text-gray-500">
            {hasUnsavedChanges && <span className="text-orange-600">You have unsaved changes</span>}
        </div>
        <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose} disabled={isLoading}>Close</Button>
            {hasUnsavedChanges && (
                <Button variant="black" onClick={onSave} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save & Close"}
                </Button>
            )}
        </div>
    </div>
);

export default TicketFooterActions;
