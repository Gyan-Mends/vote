import { User } from "@nextui-org/react";
import { Link } from "@remix-run/react";
import { useTheme } from "next-themes";
import { ReactNode, useState } from "react";
import CategoryIcon from "~/components/icons/CategoryIcon";
import CloseIcon from "~/components/icons/CloseIcon";
import DashboardIcon from "~/components/icons/DashboardIcon";
import EditionIcon from "~/components/icons/EditionIcon";
import EventIcon from "~/components/icons/EventsIcon";
import LogoutIcon from "~/components/icons/LogoutIcon";
import MoonIcon from "~/components/icons/MoonIcon";
import NavTogglerIcon from "~/components/icons/NavTogglerIcon";
import ResultIcon from "~/components/icons/ResultIcon";
import SunIcon from "~/components/icons/SunIcon";
import UserIcon from "~/components/icons/UserIcon";
import logo from "~/components/illustration/logo.png"

interface AdminLayoutProps {
    children:  ReactNode;
    pageName: string;
}

const AdminLayout = ({ children, pageName }: AdminLayoutProps) => {
    const { theme, setTheme } = useTheme();
    const [desktopNav, setDesktopNav] = useState(true);
    const [mobileNavOpen, setMobileNavOpen] = useState(false); // Hide mobile nav by default

    const desktopNavToggle = () => {
        setDesktopNav(!desktopNav);
    };

    const mobileNavToggle = () => {
        setMobileNavOpen(!mobileNavOpen);
    };

    return (
        <div className={`lg:h-[100vh]  transition duration-500 ${theme === "light" ? "bg-gray-200" : "bg-slate-950"}`}>
            {/* Desktop Side Navigation Bar */}
            <div className={`h-full hidden lg:block md:block w-64 bg-primary text-white fixed transition-transform duration-500 p-6 ${desktopNav ? "transform-none" : "-translate-x-full"}`}>
                {/* logo */}
                <div className="flex items-center gap-2">
                    <div>
                        <img className="bg-white rounded-full h-10 w-10 " src={logo} alt="logo" />
                    </div>
                    <div className="font-poppins text-3xl">VoteEase</div>
                </div>
                {/* profile */}
                <div className=" mt-10">
                    <User
                        name="Jane Doe"
                        description="Product Designer"
                        avatarProps={{
                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                        }}
                    ></User>
                </div>
                {/* Side Nav Content */}
                <ul className="mt-10">
                    <Link className="" to="/admin">               
                         <li className="hover:bg-primary-400 text-lg font-poppins p-2 rounded-lg flex gap-2">
                            <DashboardIcon className="h-6 w-6"/>
                            Dashboard
                            </li>
                    </Link>
                    <Link className=" " to="/admin/events">               
                         <li className="hover:bg-primary-400 text-lg font-poppins p-2 rounded-lg flex gap-2">
                            <EventIcon className="h-6 w-6"/>
                            Events
                            </li>
                    </Link>
                    <Link className=" " to="/admin/category">               
                         <li className="hover:bg-primary-400 text-lg font-poppins p-2 rounded-lg flex gap-2">
                            <CategoryIcon className="h-6 w-6"/>
                            Nomination
                            </li>
                    </Link>
                    <Link className=" " to="/admin/edition">               
                         <li className="hover:bg-primary-400 text-lg font-poppins p-2 rounded-lg flex gap-2">
                            <EditionIcon className="h-6 w-6"/>
                            Edition/Year
                            </li>
                    </Link>
                    <Link className=" " to="/admin/contestants">               
                         <li className="hover:bg-primary-400 text-lg font-poppins p-2 rounded-lg flex gap-2">
                            <UserIcon className="h-6 w-6"/>
                            Contestant
                            </li>
                    </Link>
                    <Link className=" " to="">               
                         <li className="hover:bg-primary-400 text-lg font-poppins p-2 rounded-lg flex gap-2">
                            <ResultIcon className="h-6 w-6"/>
                            Results
                            </li>
                    </Link>
                </ul>
            </div>

            {/* Mobile Side Navigation Bar */}
            <div className={`h-full lg:hidden top-0 left-0 z-index-100 absolute md:hidden w-64 bg-primary bg-opacity-40 fixed text-white backdrop-blur transition-transform duration-500 p-6 ${mobileNavOpen ? "transform-none" : "-translate-x-full"}`}>
                {/* Side Nav Content */}
                <button onClick={mobileNavToggle} className="block md:hidden ml-auto lg:hidden">
                    <CloseIcon className="text-danger-300" />
                </button>

                {/* logo */}
                <div className="flex items-center gap-2">
                    <div>
                        <img className="bg-white rounded-full h-10 w-10 " src={logo} alt="logo" />
                    </div>
                    <div className="font-poppins text-3xl">VoteEase</div>
                </div>
                {/* profile */}
                <div className=" mt-10">
                    <User
                        name="Jane Doe"
                        description="Product Designer"
                        avatarProps={{
                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                        }}
                    ></User>
                </div>
                {/* Side Nav Content */}
                <ul className="mt-10">
                    <Link className=" " to="/admin">               
                         <li className="hover:bg-primary-400 text-lg font-poppins p-2 rounded-lg flex gap-2">
                            <DashboardIcon className="h-6 w-6"/>
                            Dashboard
                            </li>
                    </Link>
                    <Link className=" " to="admin/events/$">               
                         <li className="hover:bg-primary-400 text-lg font-poppins p-2 rounded-lg flex gap-2">
                            <EventIcon className="h-6 w-6"/>
                            Events
                            </li>
                    </Link>
                    <Link className=" " to="/admin/category">               
                         <li className="hover:bg-primary-400 text-lg font-poppins p-2 rounded-lg flex gap-2">
                            <CategoryIcon className="h-6 w-6"/>
                            Nominations
                            </li>
                    </Link>
                    <Link className=" " to="/admin/edition">               
                         <li className="hover:bg-primary-400 text-lg font-poppins p-2 rounded-lg flex gap-2">
                            <EditionIcon className="h-6 w-6"/>
                            Edition/Year
                            </li>
                    </Link>
                    <Link className=" " to="/admin/contestants">               
                         <li className="hover:bg-primary-400 text-lg font-poppins p-2 rounded-lg flex gap-2">
                            <UserIcon className="h-6 w-6"/>
                            Contestant
                            </li>
                    </Link>
                    <Link className=" " to="">               
                         <li className="hover:bg-primary-400 text-lg font-poppins p-2 rounded-lg flex gap-2">
                            <ResultIcon className="h-6 w-6"/>
                            Results
                            </li>
                    </Link>
                </ul>
            </div>


            {/* Page Content */}
            <div className={`p-4 transition-all duration-500 overflow-x-hidden z-1 ${desktopNav ? "lg:ml-64 md:ml-64" : ""}`}>
                {/* Top Nav */}
                <div className="h-16 rounded-2xl w-full bg-primary px-6 flex items-center justify-between">
                    {/* Overview */}
                    <div className="flex items-center gap-2 lg:gap-4">
                        {/* Mobile Nav Toggle */}
                        <button onClick={mobileNavToggle} className="block md:hidden lg:hidden">
                            <NavTogglerIcon className="text-white" />
                        </button>
                        {/* Desktop Nav Toggle */}
                        <button onClick={desktopNavToggle} className="hidden md:block lg:block">
                            <NavTogglerIcon className="text-white" />
                        </button>
                        <p className="font-poppins text-2xl text-white">{pageName}</p>
                    </div>

                    {/* Mode Switch and Logout */}
                    <div className="flex gap-4">
                        <button>
                            <LogoutIcon className="text-danger-300" />
                        </button>
                        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                            {theme === "light" ? (
                                <SunIcon className="text-white" />
                            ) : (
                                <MoonIcon className="text-slate-950" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
