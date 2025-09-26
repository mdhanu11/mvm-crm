import { useEffect, useState } from "react";
import Select from "../../../components/ui/Select";
import { DEPARTMENTS_OPTIONS, PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../../constants/ticketing.constants";
import { useGetStaffListQuery } from "../../../services/staff/staff.service";
import { StaffInterface } from "../../staff-management/store/types";
interface StaffState {
    pageIndex: number;
    pageSize: number;
    staffList: StaffInterface[];
    totalUsers: number;
    searchField: 'email' | 'full_name' | 'username';
    searchTerm: string;
}
interface Props {
    status: string;
    priority: string;
    assignee: string;
    department: string;
    onStatusChange: (val: string) => void;
    onPriorityChange: (val: string) => void;
    onAssigneeChange: (val: string) => void;
    onDepartmentChange: (val: string) => void
}

const TicketStatusPriorityForm = ({ status, priority, assignee, onStatusChange, onPriorityChange, onAssigneeChange, department, onDepartmentChange }: Props) => {
    const [state, setState] = useState<StaffState>({
        pageIndex: 0,
        pageSize: 20,
        totalUsers: 0,
        searchField: 'full_name',
        searchTerm: '',
        staffList: []
    });
    const { data: staffData, isLoading } = useGetStaffListQuery({});
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
    return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select
            label="Status"
            name="status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            selectSize="md"
            variant="primary"
        >
            {STATUS_OPTIONS.map((item, idx) => (
                <option key={idx} value={item.value}>{item.label}</option>
            ))}
        </Select>
        <Select
            label="Priority"
            name="priority"
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            selectSize="md"
            variant="primary"
        >
            {PRIORITY_OPTIONS.map((item, idx) => (
                <option key={idx} value={item.value}>{item.label}</option>
            ))}
        </Select>
        <Select
            label="Department"
            name="department"
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            selectSize="md"
            variant="primary"
        >
            {DEPARTMENTS_OPTIONS.map((item, idx) => (
                <option key={idx} value={item.value}>{item.label}</option>
            ))}
        </Select>

        <Select
            label="Assign To"
            name="assignee"
            value={assignee}
            onChange={(e) => onAssigneeChange(e.target.value)}
            selectSize="md"
            variant="primary"
            disabled={isLoading}
        >
            <option value="">Select Staff</option>
            {state?.staffList?.map((user: any, idx: number) => (
                <option key={idx} value={user.username}>
                    {user.full_name}
                </option>
            ))}
        </Select>
    </div>
};

export default TicketStatusPriorityForm;
