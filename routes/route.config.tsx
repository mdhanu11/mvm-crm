import MainLayouts from "../layouts/MainLayouts";
import ClientDetailPage from "../pages/client-details/DetailPage";
import ClientList from "../pages/client-list";
import EmployeeDetails from "../pages/employee-details";
import EmployeeList from "../pages/employee-list";
import Home from "../pages/Home/Home";
import { Login } from "../pages/login/Login";
import type { AppRoute } from "../types/Route.type";
import ProtectedRoute from "../components/routes/ProtectedRoute";
import AddClientForm from "../pages/add-client/AddClient";
import AddEmployeeForm from "../pages/add-employee/AddEmployeeForm";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import ResetPassword from "../pages/reset-password/ResetPassword";
import AddStaffForm from "../pages/staff-management/AddStaffForm";
import StaffListPage from "../pages/staff-management/StaffListPage";
import TicketSystemListPage from "../pages/ticket-system/TicketSystemListPage";
import { TimeDoctorListPage } from "../pages/time-doctor/TimeDoctorListPage";
import TimeDoctorFileDetailPage from "../pages/time-doctor/TimeDoctorFileDetailPage";

export const appRoutes: AppRoute[] = [
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/add-employee",
        element: <AddEmployeeForm />,
    },
    {
        path: "/reset-password",
        element: <ResetPassword />,
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute />,
        children: [
            {
                path: "",
                element: <MainLayouts />,
                children: [
                    {
                        path: "home",
                        element: <Home />,
                        roles: ['admin','staff', 'client', 'employee'],
                        permission: "home"
                    },
                    {
                        path: "employee-management",
                        element: <EmployeeList />,
                        roles: ['admin','staff'],
                        permission: "employee",
                    },
                    {
                        path: "employee/:name",
                        element: <EmployeeDetails />,
                        roles: ['admin','staff','employee'],
                        permission: "employee",
                    },
                    {
                        path: "add-employee",
                        element: <AddEmployeeForm />,
                        roles: ['admin','staff'],
                        permission: "employee",
                    },
                    {
                        path: "client/:name",
                        element: <ClientDetailPage />,
                        roles: ['admin','staff', 'client'],
                        permission: "client",
                    },
                    {
                        path: "client-management",
                        element: <ClientList />,
                        roles: ['admin','staff'],
                        permission: "client",
                    },
                    {
                        path: "add-client",
                        element:  <AddClientForm />,
                        roles: ['admin','staff',],
                        permission: "client",
                    },
                    {
                        path: "staff-management",
                        element:  <StaffListPage />,
                        roles: ['admin',],
                        permission: "staff",
                    },
                    {
                        path: "add-staff",
                        element:  <AddStaffForm />,
                        roles: ['admin',],
                        permission: "staff",
                    },
                    {
                        path: "ticketing-system",
                        element:  <TicketSystemListPage />,
                        roles: ['admin','staff', 'client', 'employee'],
                        permission: "ticketing",
                    },
                    {
                        path: "time-doctor",
                        element:  <TimeDoctorListPage />,
                        roles: ['admin','staff', 'client', 'employee'],
                        permission: "time-doctor",
                    },
                    {
                        path: "time-doctor/file/:fileId",
                        element:  <TimeDoctorFileDetailPage />,
                        roles: ['admin','staff', 'client', 'employee'],
                        permission: "time-doctor",
                    },
                ],
            }
        ]
    },
];
