"use client";
import { ReactNode, useState } from "react";
import { HeroHighlight } from "~/components/ui/hero-highlight";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { Link } from "@remix-run/react";
import { useTheme } from "next-themes";
import SunIcon from "~/components/icons/SunIcon";
import MoonIcon from "~/components/icons/MoonIcon";



export default function PublicLayout({ children }: { children: ReactNode }) {
    const { theme, setTheme } = useTheme()

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Home",
        "Portfolio",
        "Contact",
    ];
    return (
        <HeroHighlight className="transition duration-500">
            {/* navigation bar */}
            <Navbar
                className=" shadow-sm bg-white shadow-lg transition duration-500 font-poppins dark:bg-slate-800 dark:opacity-70 rounded-b-lg"
                onMenuOpenChange={setIsMenuOpen}
            >
                {/* Navbar content */}

                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand>
                        <p className=" text-inherit text-xl font-poppins">Logo</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="center">

                    <NavbarItem >
                        <Link to="/" className="font-poppins hover:text-blue-200" aria-current="page">
                            Home
                        </Link>
                    </NavbarItem>

                    <NavbarItem>
                        <Link to="/cartDetails" color="foreground" className="font-poppins hover:text-blue-200">
                            About
                        </Link>
                    </NavbarItem>

                    <NavbarItem>
                        <Link to="/" color="foreground" className="font-poppins hover:text-blue-200">
                            Services
                        </Link>
                    </NavbarItem>

                    <NavbarItem>
                        <Link to="/" color="foreground" className="font-poppins hover:text-blue-200">
                            Contact
                        </Link>
                    </NavbarItem>

                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem className="flex gap-6">
                        <Link to="/login">
                            <div className="bg-default-300 h-12 w-20 rounded-lg flex items-center justify-center  text-white font-poppins transition duration-300 delay-300 ease-in-out hover:scale-105 hover:bg-indigo-500 shadow-md gap-2" >
                                <p>Login</p>
                            </div>
                        </Link>
                        <Link to="/">
                            <Button className="h-12 w-20" color="primary"
                                onClick={() => (
                                    setTheme(theme === "dark" ? "light" : "dark")
                                )}
                            >
                                {
                                    theme === "dark" ? (
                                        <>
                                            <MoonIcon className="text-slate-950" />

                                        </>
                                    ) : (
                                        <>
                                            <SunIcon className="" />

                                        </>
                                    )
                                }

                            </Button>
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu className="opacity-70 bg-primary-200">
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                to={index === 0 ? '/' : index === 1 ? '/portfolio' : '/contact'}
                                color={
                                    index === 0 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                className="w-full"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}

                </NavbarMenu>
            </Navbar>
            <div>
                {children}
            </div>
            
            {/* footer */}
            <footer>
                
            </footer>
        </HeroHighlight>
    );
}
