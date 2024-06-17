import { Button, Checkbox, Input } from "@nextui-org/react";
import { ActionFunction } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { useTheme } from "next-themes";
import { Toaster } from 'react-hot-toast';
import illustration from "~/components/illustration/Voting-amico-removebg.png";
import SunIcon from "~/components/icons/SunIcon";
import registrationService from "~/components/controller";


const Login = () => {
    const { theme, setTheme } = useTheme();
    const actionData = useActionData<any>();

    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                successToast(actionData.message);
            } else {
                errorToast(actionData.message);
            }
        }
    }, [actionData]);

    return (
        <div className={`lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 transition duration-500 lg:h-[100vh] lg:overflow-y-hidden ${theme === "dark" ? "bg-slate-950" : "bg-white"}`}>
            <Toaster position="top-center" />
            {/* login form */}
            <div className="flex flex-col justify-center items-center relative px-2 py-40 lg:px-0 lg:py-0">
                <div>
                    {/* dark and light theme toggler */}
                    <Button
                        className={`transition duration-500 absolute z-10 top-0 left-0 mt-4 ml-2 ${theme === "dark" ? "bg-primary-500 text-slate-950" : "bg-primary-500 text-white"}`}
                        onClick={() => {
                            setTheme(theme === "dark" ? "light" : "dark");
                        }}
                    >
                        {theme === "light" ? (
                            <>
                                <SunIcon className="" />
                                <p className="font-poppins">LightMode</p>
                            </>
                        ) : (
                            < >
                                <MoonIcon className="text-slate-950" />
                                <p className="font-poppins">DarkMode</p>
                            </>
                        )}
                    </Button>

                </div>
                <h1 className="font-poppins font-bold text-6xl">Register To</h1>
                <h1 className="font-poppins font-bold text-6xl mt-4">VoteEase</h1>
                {/* forms */}
                <Form method="post" className="w-full lg:w-[28vw]">
                    <Input
                        className="max-w-md mt-10 text-center font-poppins"
                        label="Name"
                        placeholder="Mends Gyan"
                        isClearable
                        isRequired
                        type="text"
                        name="name"
                        color="primary"
                    />
                    <Input
                        className="max-w-md mt-6 text-center font-poppins"
                        label="Email"
                        placeholder="example@gmail.com"
                        isClearable
                        isRequired
                        type="email"
                        name="email"
                        color="primary"
                    />
                    <Input
                        className="max-w-md mt-6 font-poppins"
                        label="Password"
                        placeholder="*************************"
                        isClearable
                        isRequired
                        name="password"
                        color="primary"
                    />
                    <button type="submit" className="h-12 w-full lg:w-[28vw] font-poppins text-xl text-white mt-6 bg-primary rounded-lg">
                        Register
                    </button>

                    <p className="text-center mt-6 font-poppins text-lg">OR</p>

                    <p className="mt-6 text-center font-poppins">Already have an account? <Link to="/login"><span className="text-primary">Login</span></Link></p>
                </Form>
            </div>
            {/* illustration */}
            <div className="hidden lg:block md:block">
                <div>
                    <img className="h-full" src={illustration} alt="Illustration" />
                </div>
            </div>
        </div>
    );
};

export default Login;

import { json } from "@remix-run/node"; // Import the json helper
import { errorToast, successToast } from "~/components/toast";
import { useEffect } from "react";
import MoonIcon from "~/components/icons/MoonIcon";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;


    try {
        const response = await registrationService.saveRegistration(name, email, password);
        return json({ success: true, message: "Registration successful" }, { status: 200 });
    } catch (error: any) {
        return json({ success: false, message: error.message }, { status: 500 });
    }
};
