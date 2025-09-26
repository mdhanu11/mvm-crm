export type Role = 'admin' | 'staff' | 'employee' | 'client';

export type Permission = "home" | "employee" | "client" | "leave" | "access" | "payroll" | "ticketing" | "invoicing" | "staff" | "time-doctor";

export type ApiMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export const appRoles: Role[] = ["admin", "staff", "employee", "client"]

export const appPermissions: Permission[] = ["home", "employee", "client", "leave", "payroll", "ticketing", "invoicing", "access"]

export type ListApiResponseInterface = {
    current_page: number;
}