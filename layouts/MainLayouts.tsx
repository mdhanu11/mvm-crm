import { useEffect, useRef, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { MdSearch } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { Link, Outlet, useLocation, useNavigate, } from "react-router-dom";
import { logoutHelper } from "../helpers/logout.helper";
import type { sideBarSchemaInterface } from "../interface/sidebarInterface";
import { sideBarSchema } from "../schema/Sidebar.schema";
import { useAppSelector } from "../store/store";
import { employeeSidebarSchema } from "../schema/EmployeeSidebar.schema";

const MainLayouts = () => {
    const appStoreVariable = useAppSelector((state) => state?.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getActiveMenuName = () => {
        const matchedItem = sideBarSchema.find(item => item.link === location.pathname);
        return matchedItem?.name || '';
    };

    const activeMenu = getActiveMenuName();

    const renderMenuItem = (item: sideBarSchemaInterface) => {
        const isActive = activeMenu === item.name;
        const IconComponent = item.icon;

        if (item?.permission && appStoreVariable?.role == "staff" && !appStoreVariable?.permissions?.includes(item?.permission)) return null;
        return (
            <Link
                key={item.link}
                to={item.link}
                className={`flex items-center justify-start px-4 py-3 my-2 cursor-pointer text-sm w-full rounded-md ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
                {/* Icon */}
                {IconComponent && (
                    <IconComponent
                        className={`text-2xl ${isActive ? 'text-white' : 'text-gray-500'
                            }`}
                    />
                )}

                {/* Menu item text */}
                <span className="ml-3 text-start">{item.name}</span>
            </Link>
        );
    };


    const mainMenuItems = (appStoreVariable?.role == "employee" ? employeeSidebarSchema : sideBarSchema).filter(item => item.position === 'main');
    const bottomMenuItems = (appStoreVariable?.role == "employee" ? employeeSidebarSchema : sideBarSchema).filter(item => item.position === 'bottom');
    return (
        <div className="h-screen w-full overflow-hidden flex">

            <div className="w-[264px] h-screen overflow-y-auto bg-white flex flex-col justify-between border-r border-gray-200">

                <div className="p-4 border-b-none border-gray-200">
                    <div className="flex items-center">
                        <img
                            src="/images/Logo.png"
                            alt="My Virtual Mate Logo"
                            className="w-full  object-cover"
                        />

                    </div>
                </div>


                <div className="overflow-y-auto py-2 flex-1">
                    <nav className="px-2 space-y-1">
                        {mainMenuItems.map(renderMenuItem)}
                    </nav>
                </div>


                <div className=" border-t-none border-gray-200 py-2 px-2">
                    {bottomMenuItems.map(renderMenuItem)}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1  overflow-hidden flex flex-col">
                {/* Navbar */}
                <div className="w-full border-b border-gray-200 flex items-center justify-between px-6 py-4 bg-white shadow-sm">
                    {/* Search bar */}
                    <div className="relative w-1/3">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <MdSearch size={20} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring text-sm"
                        />
                    </div>

                    {/* Notification + Profile */}
                    <div className="flex items-center space-x-4">
                        {/* <FiBell className="text-gray-500 text-xl cursor-pointer" /> */}

                        <div className="relative" ref={dropdownRef}>
                            <div
                                onClick={() => setShowDropdown(prev => !prev)}
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <div className="p-2 bg-gray-100 rounded-full">
                                    <IoPerson size={20} />
                                </div>
                                <div className="text-sm text-left">
                                    <div className="font-medium text-gray-700">{appStoreVariable?.full_name || "User"}</div>
                                    <div className="text-gray-400 text-xs capitalize">{appStoreVariable?.role}</div>
                                </div>
                            </div>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                    <button
                                        className="flex gap-2 items-center  w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => {
                                            logoutHelper();
                                            navigate('/')
                                        }}
                                    >
                                        <TbLogout2 /> Logout
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                <div className="flex-1  overflow-y-auto overflow-x-hidden light-background">
                    {activeMenu == "Home" && <div className="px-6 py-3 bg-white">
                        <h1 className="text-2xl font-semibold">Hello {appStoreVariable?.full_name}</h1>
                        <p className="text-gray-500">Manage Your Team Effectively</p>
                    </div>}
                    {/* Page Content */}
                    <div className="p-6 light-background">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayouts;
