import { FiHome, FiSettings } from "react-icons/fi";
import { MdOutlinePerson, MdOutlineReceiptLong, MdOutlineSupportAgent } from "react-icons/md";
import { AiOutlineTeam, AiOutlineDollarCircle, AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";

import type { sideBarSchemaInterface } from "../interface/sidebarInterface";

export const sideBarSchema: sideBarSchemaInterface[] = [
    {
        id: 'home',
        name: 'Home',
        icon: FiHome,
        position: 'main',
        permission: "home",
        link: '/dashboard/home'
    },
    {
        id: 'employee',
        name: 'Employee Management',
        icon: MdOutlinePerson,
        position: 'main',
        permission: "employee",
        link: '/dashboard/employee-management'
    },
    {
        id: 'client',
        name: 'Client Management',
        icon: AiOutlineTeam,
        position: 'main',
        permission: "client",
        link: '/dashboard/client-management'
    },
    {
        id: 'staff',
        name: 'Staff Management',
        icon: AiOutlineTeam,
        position: 'main',
        permission:"staff",
        link: '/dashboard/staff-management'
    },
    // {
    //     id: 'roles',
    //     name: 'Roles and Permissions',
    //     icon: AiOutlineTeam,
    //     position: 'main',
    //     link: '/dashboard/roles-and-permissions'
    // },
    {
        id: 'leave',
        name: 'Leave Management',
        icon: AiOutlineCalendar,
        position: 'main',
        permission: "leave",
        link: '/leave-management'
    },
    {
        id: 'payroll',
        name: 'Payroll & Payslip',
        icon: AiOutlineDollarCircle,
        position: 'main',
        permission: "payroll",
        link: '/payroll'
    },
    {
        id: 'ticketing',
        name: 'Ticketing System',
        icon: MdOutlineSupportAgent,
        position: 'main',
        permission: "ticketing",
        link: '/dashboard/ticketing-system'
    },
    {
        id: 'invoicing',
        name: 'Invoicing & Billing',
        icon: MdOutlineReceiptLong,
        position: 'main',
        permission: "invoicing",
        link: '/invoicing'
    },
    {
        id: 'time-doctor',
        name: 'Time Doctor Data',
        icon: AiOutlineClockCircle,
        position: 'main',
        permission: "time-doctor",
        link: '/dashboard/time-doctor'
    },
    {
        id: 'settings',
        name: 'Settings',
        icon: FiSettings,
        position: 'bottom',
        link: '/settings'
    }
];

