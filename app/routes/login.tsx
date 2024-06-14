import { Button, Checkbox, Input } from "@nextui-org/react"
import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { useTheme } from "next-themes"
import illustration from "~/components/illustration/Voting-amico-removebg.png"
import MoonIcon from "~/components/icons/MoonIcon";
import SunIcon from "~/components/icons/SunIcon";
import { commitSession, getSession } from "~/session";
import Registration from "~/modal/registration";
import { errorToast, successToast } from "~/components/toast";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import bcrypt from "bcryptjs";


const Login = () => {
    const { theme, setTheme } = useTheme();
    const actionData = useActionData<any>();

    useEffect(() => {
        if (actionData) {
            if (actionData.error) {
                successToast(actionData.message);
            } else {
                errorToast(actionData.message);
            }
        }
    }, [actionData]);

    return (
        <div className={`lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 transition duration-500 lg:h-[100vh] lg:overflow-y-hidden  ${theme === "dark" ? "bg-slate-950" : "bg-white"}`}>
            {/* login form */}
            <Toaster position="top-center" />

            <div className="flex flex-col justify-center items-center relative px-2 py-40 lg:px-0 lg:py-0">
                <div>
                    {/* dark and light theme toggler */}
                    <Button
                        className={`transition duration-500 absolute z-10 top-0 left-0 mt-4 ml-2 ${theme === "dark" ? "bg-primary-500" : "bg-primary-500 text-white"}`}
                        onPress={() => {
                            setTheme(theme === "dark" ? "light" : "dark");
                        }}
                    >
                        {
                            theme === "light" ? (
                                <>
                                    <SunIcon className="" />

                                </>
                            ) : (
                                <>
                                    <MoonIcon className="text-slate-950" />
                                </>
                            )
                        }
                    </Button>
                </div>
                <h1 className="font-poppins font-bold text-6xl " >Login To</h1>
                <h1 className="font-poppins font-bold text-6xl mt-4" >VoteEase </h1>
                {/* forms */}
                <Form method="post" className="w-full lg:w-[28vw]" >
                    <Input
                        className={`max-w-md mt-10 text-center font-poppins`}
                        label="Email"
                        placeholder="example@gmail.com"
                        isClearable
                        isRequired
                        name="email"
                        color="primary"
                    />
                    <Input
                        className={`max-w-md mt-6 font-poppins`}
                        label="Password"
                        placeholder="*************************"
                        isClearable
                        isRequired
                        name="password"
                        color="primary"
                    />

                    <div className={`mt-6 flex justify-between`}>
                        <div className="text-poppins text-sm">
                            <Checkbox > Remember me</Checkbox>
                        </div>

                        <div>
                            <Link to="#"><p className="font-poppins text-danger text-sm">Forgot Password?</p></Link>
                        </div>

                    </div>
                    <button className={`text-white h-12 w-full lg:w-[28vw] font-poppins text-xl mt-6 bg-primary rounded-lg`} >
                        Login
                    </button>

                    <p className="text-center mt-6 font-poppins text-lg">OR</p>

                    <p className="mt-6 text-center font-poppins">Do not have an account? <Link to="/register"><span className="text-primary">Signup Here</span></Link></p>
                </Form>

            </div>
            {/* illustration */}
            <div className="hidden lg:block md:block">
                <div>
                    <img className="h-full" src={illustration} alt="" />
                </div>

            </div>


        </div>
    )
}

export default Login


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Check if user exists
    try {
        const user = await Registration.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            const session = await getSession(request.headers.get("Cookie"));
            session.set("email", email);

            // Redirect to a protected route or home page after successful login
            return redirect("/admin/", {
                headers: {
                    "Set-Cookie": await commitSession(session),
                },

            });
        } else {
            return json({ message: "Invalid email or password", success: false }, { status: 400 });
        }
    } catch (error) {
        return json({ message: "An error occurred", success: false }, { status: 500 });
    }
};