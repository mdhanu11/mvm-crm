
export const DEFAULT_ASSIGNED_TO_USERNAME = "Shiv";
export const DEFAULT_TICKET_STATUS = "open";
export type PriorityInterface = 'low' | 'medium' | 'high' | 'critical';
export const PRIORITY_TYPES: PriorityInterface[] = ['low', 'medium', 'high', 'critical'];

export const PRIORITY_OPTIONS = [
    { label: "All Priorities", value: "" },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
    { label: "Critical", value: "critical" },
];

export const STATUS_OPTIONS = [
    { label: "All Statuses", value: "" },
    { label: "Open", value: "open" },
    { label: "In Progress", value: "in_progress" },
    { label: "Closed", value: "closed" },
    { label: "On Hold", value: "on_hold" },
];
export const DEPARTMENTS_OPTIONS = [
    { label: "Select Department", value: "", poc: "" },
    { label: "Employee Concerns", value: "Employee Concerns", poc: "Czarina" },
    { label: "Invoice/Payslip", value: "Invoice/Payslip", poc: "Himanshu" },
    { label: "Client", value: "Client", poc: "Shiv" },
];
