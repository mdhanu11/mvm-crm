import { FiHome, FiSettings } from "react-icons/fi";
import { MdOutlinePerson, MdOutlineSupportAgent } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";

import type { sideBarSchemaInterface } from "../interface/sidebarInterface";

export const employeeSidebarSchema: sideBarSchemaInterface[] = [
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
        name: 'Personal Detail',
        icon: MdOutlinePerson,
        position: 'main',
        permission: "employee",
        link: '/dashboard/employee/:name'
    },
    {
        id: 'leave',
        name: 'Leave Management',
        icon: AiOutlineCalendar,
        position: 'main',
        permission: "leave",
        link: '/leave-management'
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
        id: 'settings',
        name: 'Settings',
        icon: FiSettings,
        position: 'bottom',
        link: '/settings'
    }
];

