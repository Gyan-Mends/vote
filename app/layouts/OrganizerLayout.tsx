import { Tooltip } from "@nextui-org/react";
import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ReactNode, useState } from "react";
import Registration from "~/modals/Register";

const OrganizerLayout = ({ children, header }: { children: ReactNode, header: string }) => {
    // handling nav dropdown
    const [isDropDown, setIsDropDown] = useState(false)
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const votingToggler = () => {
        setIsDropDown(!isDropDown)
    }

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen)
    }

    const handleMobileToggle = () => {
        setIsMobile(!isMobile)
    }

    const { user } = useLoaderData<{ user: { name: string } }>()

    return (
        <div className="bg-gray-200 h-[100vh] overflow-y-hidden">
            <div >
                {
                    !isNavOpen && (
                        <nav className="h-[100vh] bg-indigo-500 w-60 absolute shadow-sm flex flex-col justify-between">
                            <div>
                                {/* company name */}
                                <div className="h-20 bg-indigo-600 w-full shadow-sm flex justify-between  px-4 items-center">
                                    <div>
                                        <p className="font-poppins text-2xl text-white">VoteEase</p>
                                    </div>
                                    <div>
                                        <button className="mt-2" onClick={handleNavToggle}><svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24"><path fill="currentColor" d="M17 21q-.825 0-1.412-.587T15 19V5q0-.825.588-1.412T17 3h2q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-5 0q-.425 0-.712-.288T11 20t.288-.712T12 19t.713.288T13 20t-.288.713T12 21m-4 0q-.425 0-.712-.288T7 20t.288-.712T8 19t.713.288T9 20t-.288.713T8 21m-4 0q-.425 0-.712-.288T3 20t.288-.712T4 19t.713.288T5 20t-.288.713T4 21m8-16q-.425 0-.712-.288T11 4t.288-.712T12 3t.713.288T13 4t-.288.713T12 5M8 5q-.425 0-.712-.288T7 4t.288-.712T8 3t.713.288T9 4t-.288.713T8 5M4 5q-.425 0-.712-.288T3 4t.288-.712T4 3t.713.288T5 4t-.288.713T4 5m2.825 8l.9.9q.275.275.275.688t-.3.712q-.275.275-.7.275t-.7-.275l-2.6-2.6q-.3-.3-.3-.7t.3-.7l2.6-2.6q.275-.275.688-.287T7.7 8.7q.275.275.275.7t-.275.7l-.875.9H12q.425 0 .713.288T13 12t-.288.713T12 13z" /></svg></button>
                                    </div>
                                </div>

                                {/* navigation links */}
                                <div className="py-10 px-4 ">
                                    <ul>
                                        <Link to="/organizerdashboard"  ><li className="p-2 text-white flex gap-1 hover:bg-indigo-600 hover:rounded-md font-poppins"><svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21.75 4.69v3.88a2.41 2.41 0 0 1-.71 1.72a2.47 2.47 0 0 1-1.72.71H4.68a2.42 2.42 0 0 1-2.43-2.43V4.69a2.44 2.44 0 0 1 2.43-2.44h14.64a2.44 2.44 0 0 1 1.72.72a2.408 2.408 0 0 1 .71 1.72M11 15.43v3.89a2.42 2.42 0 0 1-2.43 2.43H4.68a2.42 2.42 0 0 1-2.43-2.43v-3.88A2.44 2.44 0 0 1 4.68 13h3.89a2.42 2.42 0 0 1 1.71.72a2.46 2.46 0 0 1 .72 1.71m10.75.01v3.88a2.41 2.41 0 0 1-.71 1.72a2.47 2.47 0 0 1-1.72.71h-3.89a2.45 2.45 0 0 1-1.72-.71a2.409 2.409 0 0 1-.71-1.72v-3.88A2.46 2.46 0 0 1 15.43 13h3.89a2.44 2.44 0 0 1 1.72.72a2.407 2.407 0 0 1 .71 1.72" /></svg>
                                            Dashboard</li></Link>

                                        <button className="hover:bg-indigo-600 hover:rounded-md w-full" onClick={votingToggler} ><li className="p-2 text-white flex gap-1  font-poppins"><svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1em" viewBox="0 0 640 512"><path fill="currentColor" d="M608 320h-64v64h22.4c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8H96v-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32m-96 64V64.3c0-17.9-14.5-32.3-32.3-32.3H160.4C142.5 32 128 46.5 128 64.3V384zM211.2 202l25.5-25.3c4.2-4.2 11-4.2 15.2.1l41.3 41.6l95.2-94.4c4.2-4.2 11-4.2 15.2.1l25.3 25.5c4.2 4.2 4.2 11-.1 15.2L300.5 292c-4.2 4.2-11 4.2-15.2-.1l-74.1-74.7c-4.3-4.2-4.2-11 0-15.2" /></svg> Manage Voting</li></button>
                                        {/* dropdown list */}
                                        {
                                            isDropDown && (
                                                <ul className=" bg-indigo-600 rounded-md mt-2 transition-all ease-in-out duration-200 delay-200 pl-8 pr-2 py-3">
                                                    <Link to="/event/$">
                                                        <li className="p-2  text-white flex gap-1 hover:bg-indigo-500 hover:rounded-md font-poppins"><svg className="mt-1 " xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="currentColor" d="M10 10a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1" className="clr-i-solid clr-i-solid-path-1" /><path fill="currentColor" d="M26 10a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1" className="clr-i-solid clr-i-solid-path-2" /><path fill="currentColor" d="M32.25 6h-4v3a2.2 2.2 0 0 1-4.4 0V6H12.2v3a2.2 2.2 0 0 1-4.4 0V6h-4A1.78 1.78 0 0 0 2 7.81v22.38A1.78 1.78 0 0 0 3.75 32h28.5A1.78 1.78 0 0 0 34 30.19V7.81A1.78 1.78 0 0 0 32.25 6m-6.31 10.58l-9.67 9.67L11 20.94A1.36 1.36 0 0 1 12.9 19l3.38 3.38L24 14.66a1.36 1.36 0 1 1 1.93 1.93Z" className="clr-i-solid clr-i-solid-path-3" /><path fill="none" d="M0 0h36v36H0z" /></svg> Event</li>
                                                    </Link>

                                                    <Link to=""><li className="p-2 text-white flex gap-1 hover:bg-indigo-500 hover:rounded-md font-poppins"><svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M17 3a4 4 0 1 0 0 8a4 4 0 0 0 0-8M3 17a4 4 0 1 1 8 0a4 4 0 0 1-8 0m10-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2zM3 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" clip-rule="evenodd" /></svg>Categories</li></Link>

                                                    <Link to="">
                                                        <li className="p-2 text-white flex gap-1 hover:bg-indigo-500 hover:rounded-md font-poppins"><svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m30 10l-15.1 1.8l-6 14m30.2-3.6L30 10M18 38l15.1-1.8l6-14M8.9 25.8L18 38" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m39.1 22.2l-11.4-6.8l-12.8-3.6l-.3 13.3L18 38m0 0l11.6-6.4l9.5-9.4" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m29.6 31.6l-15-6.5l13.1-9.7zM8.9 25.8l5.7-.7m13.1-9.7L30 10m3.1 26.2l-3.5-4.6" /></svg> Edition</li>
                                                    </Link>

                                                    <Link to="">
                                                        <li className="p-2 text-white flex gap-1 hover:bg-indigo-500 hover:rounded-md font-poppins"><svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M15.989 19.129c0-2.246-2.187-3.389-4.317-4.307c-2.123-.914-2.801-1.684-2.801-3.334c0-.989.648-.667.932-2.481c.12-.752.692-.012.802-1.729c0-.684-.313-.854-.313-.854s.159-1.013.221-1.793c.064-.817-.398-2.56-2.301-3.095c-.332-.341-.557-.882.467-1.424c-2.24-.104-2.761 1.068-3.954 1.93c-1.015.756-1.289 1.953-1.24 2.59c.065.78.223 1.793.223 1.793s-.314.17-.314.854c.11 1.718.684.977.803 1.729c.284 1.814.933 1.492.933 2.481c0 1.65-.212 2.21-2.336 3.124C.663 15.53 0 17 .011 19.129C.014 19.766 0 20 0 20h16s-.011-.234-.011-.871m2.539-5.764c-1.135-.457-1.605-1.002-1.605-2.066c0-.641.418-.432.602-1.603c.077-.484.447-.008.518-1.115c0-.441-.202-.551-.202-.551s.103-.656.143-1.159c.05-.627-.364-2.247-2.268-2.247c-1.903 0-2.318 1.62-2.269 2.247c.042.502.144 1.159.144 1.159s-.202.109-.202.551c.071 1.107.441.631.518 1.115c.184 1.172.602.963.602 1.603c0 1.064-.438 1.562-1.809 2.152c-.069.029-.12.068-.183.102c1.64.712 4.226 1.941 4.838 4.447H20v-2.318c0-1-.273-1.834-1.472-2.317" /></svg> Contestants</li>
                                                    </Link>
                                                </ul>
                                            )
                                        }

                                        <Link to="/organizerdashboard"  ><li className="p-2 mt-2 text-white flex gap-1 hover:bg-indigo-600 hover:rounded-md font-poppins"><svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21.75 4.69v3.88a2.41 2.41 0 0 1-.71 1.72a2.47 2.47 0 0 1-1.72.71H4.68a2.42 2.42 0 0 1-2.43-2.43V4.69a2.44 2.44 0 0 1 2.43-2.44h14.64a2.44 2.44 0 0 1 1.72.72a2.408 2.408 0 0 1 .71 1.72M11 15.43v3.89a2.42 2.42 0 0 1-2.43 2.43H4.68a2.42 2.42 0 0 1-2.43-2.43v-3.88A2.44 2.44 0 0 1 4.68 13h3.89a2.42 2.42 0 0 1 1.71.72a2.46 2.46 0 0 1 .72 1.71m10.75.01v3.88a2.41 2.41 0 0 1-.71 1.72a2.47 2.47 0 0 1-1.72.71h-3.89a2.45 2.45 0 0 1-1.72-.71a2.409 2.409 0 0 1-.71-1.72v-3.88A2.46 2.46 0 0 1 15.43 13h3.89a2.44 2.44 0 0 1 1.72.72a2.407 2.407 0 0 1 .71 1.72" /></svg>
                                            Dashboard</li></Link>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-0">
                                <p>Logout</p>
                            </div>
                        </nav>
                    )

                }

                {/* toggle nave to show only icons */}
                {
                    isNavOpen && (
                        <nav className="h-[100vh] bg-indigo-500 w-20 absolute shadow-sm flex flex-col justify-between">
                            <div>
                                {/* company name */}
                                <div className="h-20 bg-indigo-600 w-full shadow-sm flex justify-between  px-4 items-center">

                                    <div className="flex items-center justify-center">
                                        <button className="mt-2" onClick={handleNavToggle}><svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24"><path fill="currentColor" d="M17 21q-.825 0-1.412-.587T15 19V5q0-.825.588-1.412T17 3h2q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-5 0q-.425 0-.712-.288T11 20t.288-.712T12 19t.713.288T13 20t-.288.713T12 21m-4 0q-.425 0-.712-.288T7 20t.288-.712T8 19t.713.288T9 20t-.288.713T8 21m-4 0q-.425 0-.712-.288T3 20t.288-.712T4 19t.713.288T5 20t-.288.713T4 21m8-16q-.425 0-.712-.288T11 4t.288-.712T12 3t.713.288T13 4t-.288.713T12 5M8 5q-.425 0-.712-.288T7 4t.288-.712T8 3t.713.288T9 4t-.288.713T8 5M4 5q-.425 0-.712-.288T3 4t.288-.712T4 3t.713.288T5 4t-.288.713T4 5m2.825 8l.9.9q.275.275.275.688t-.3.712q-.275.275-.7.275t-.7-.275l-2.6-2.6q-.3-.3-.3-.7t.3-.7l2.6-2.6q.275-.275.688-.287T7.7 8.7q.275.275.275.7t-.275.7l-.875.9H12q.425 0 .713.288T13 12t-.288.713T12 13z" /></svg></button>
                                    </div>
                                </div>

                                {/* navigation links */}
                                <div className="py-10 px-4 ">
                                    <ul>
                                        <Tooltip content="Dashboard" className="flex items-center justify-center">
                                            <Link to="/organizerdashboard"  ><li className="p-2 text-white flex gap-1 hover:bg-indigo-600 hover:rounded-md font-poppins"><svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24"><path fill="currentColor" d="M21.75 4.69v3.88a2.41 2.41 0 0 1-.71 1.72a2.47 2.47 0 0 1-1.72.71H4.68a2.42 2.42 0 0 1-2.43-2.43V4.69a2.44 2.44 0 0 1 2.43-2.44h14.64a2.44 2.44 0 0 1 1.72.72a2.408 2.408 0 0 1 .71 1.72M11 15.43v3.89a2.42 2.42 0 0 1-2.43 2.43H4.68a2.42 2.42 0 0 1-2.43-2.43v-3.88A2.44 2.44 0 0 1 4.68 13h3.89a2.42 2.42 0 0 1 1.71.72a2.46 2.46 0 0 1 .72 1.71m10.75.01v3.88a2.41 2.41 0 0 1-.71 1.72a2.47 2.47 0 0 1-1.72.71h-3.89a2.45 2.45 0 0 1-1.72-.71a2.409 2.409 0 0 1-.71-1.72v-3.88A2.46 2.46 0 0 1 15.43 13h3.89a2.44 2.44 0 0 1 1.72.72a2.407 2.407 0 0 1 .71 1.72" /></svg>
                                            </li></Link>
                                        </Tooltip>

                                        <Tooltip content="Manage Voting" className="flex items-center justify-center">
                                            <button className="hover:bg-indigo-600 hover:rounded-md w-full" onClick={votingToggler} ><li className="p-2 text-white flex gap-1  font-poppins"><svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 640 512"><path fill="currentColor" d="M608 320h-64v64h22.4c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8H96v-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32m-96 64V64.3c0-17.9-14.5-32.3-32.3-32.3H160.4C142.5 32 128 46.5 128 64.3V384zM211.2 202l25.5-25.3c4.2-4.2 11-4.2 15.2.1l41.3 41.6l95.2-94.4c4.2-4.2 11-4.2 15.2.1l25.3 25.5c4.2 4.2 4.2 11-.1 15.2L300.5 292c-4.2 4.2-11 4.2-15.2-.1l-74.1-74.7c-4.3-4.2-4.2-11 0-15.2" /></svg></li></button>
                                        </Tooltip>


                                        <Link to="/organizerdashboard"  ><li className="p-2 mt-2 text-white flex gap-1 hover:bg-indigo-600 hover:rounded-md font-poppins"><svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24"><path fill="currentColor" d="M21.75 4.69v3.88a2.41 2.41 0 0 1-.71 1.72a2.47 2.47 0 0 1-1.72.71H4.68a2.42 2.42 0 0 1-2.43-2.43V4.69a2.44 2.44 0 0 1 2.43-2.44h14.64a2.44 2.44 0 0 1 1.72.72a2.408 2.408 0 0 1 .71 1.72M11 15.43v3.89a2.42 2.42 0 0 1-2.43 2.43H4.68a2.42 2.42 0 0 1-2.43-2.43v-3.88A2.44 2.44 0 0 1 4.68 13h3.89a2.42 2.42 0 0 1 1.71.72a2.46 2.46 0 0 1 .72 1.71m10.75.01v3.88a2.41 2.41 0 0 1-.71 1.72a2.47 2.47 0 0 1-1.72.71h-3.89a2.45 2.45 0 0 1-1.72-.71a2.409 2.409 0 0 1-.71-1.72v-3.88A2.46 2.46 0 0 1 15.43 13h3.89a2.44 2.44 0 0 1 1.72.72a2.407 2.407 0 0 1 .71 1.72" /></svg>
                                        </li></Link>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-0">
                                <p>Logout</p>
                            </div>
                        </nav>
                    )
                }


                {/* mobile toggler */}
                
            </div>

            <main className={` px-4 py-6  ${isNavOpen ? 'ml-20' : 'ml-64'}`}>
                <div className="w-full h-14 rounded-md bg-indigo-500 flex items-center px-10 justify-between ">
                    <div className="flex gap-2">
                       
                        <p className="text-white text-2xl font-poppins">{header}</p>
                    </div>
                    <div className="flex gap-4">
                        <img className="h-10 w-10 rounded-md bg-slate-500" src="" alt="" />
                        {user && <p className="text-md text-white font-poppins">{user.name}</p>}
                    </div>
                </div>
                {children}
            </main>
        </div>
    );
}

export default OrganizerLayout;
