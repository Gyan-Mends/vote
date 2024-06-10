import { Button, Checkbox, Input } from "@nextui-org/react";
import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Link } from "react-router-dom";
import { getSession, commitSession } from "~/session";
import Registration from "~/modals/Register";



const Login = () => {

    return (
        <div className="bg-slate-50 lg:grid lg:grid-cols-2 ">
            {/* Login illustration */}
            <div className="">
            </div>
            {/* Login inputs */}
            <div className=" h-[100vh] flex items-center justify-center py-4 px-2">
                <div>
                    <p className=" font-poppins text-xl lg:text-4xl text-center">Welcome To VoteEase</p>
                    <p className=" font-poppins text-sm mt-4 text-center">Please login to access your dasboard. <span className="text-blue-500"><Link to="/signup" >Do not have account</Link></span></p>
                    <div className="py-10">
                        <Form method="post">
                            <Input
                                label="Email"
                                isRequired
                                isClearable
                                labelPlacement="outside"
                                placeholder=" "
                                name="email"
                                className="font-poppins"
                                classNames={{
                                    label: "font-poppins font-medium  text-sm -mt-4",
                                    inputWrapper: "border-blue-500 h-16  !max-w-xl  mt-4",
                                }}
                                type="email"
                                variant="bordered"
                                color="primary"
                                required

                            />
                            <Input
                                label="Password"
                                isRequired
                                isClearable
                                labelPlacement="outside"
                                placeholder=" "
                                name="password"
                                className="font-poppins"
                                classNames={{
                                    label: "font-poppins font-medium  text-sm -mt-4",
                                    inputWrapper: "border-blue-500 h-16  max-w-lg  mt-8",
                                }}
                                type="password"
                                variant="bordered"
                                color="primary"
                                required

                            />

                            <div className=" flex justify-between mt-8">
                                <Checkbox><span className=" text-sm font-poppins">Remember me</span></Checkbox>

                                {/* forget password */}
                                <Link to="/d" className="text-red-500 text-sm font-poppins">Forget password?</Link>
                            </div>

                            <div>
                                <Button type="submit" color="primary" className=" text-white text-xl font-poppins w-full h-12 mt-8">Login</Button>
                            </div>
                        </Form>
                    </div>
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

    // check if user exist
    const user = await Registration.findOne({ email, password });

    //checking if user is found
    if (user) {
        const session = await getSession(request.headers.get("Cookie"));
        session.set("email", email);

        return redirect("/organizerdashboard", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    } else {

        return redirect("/login", {
            headers: {
                "Set-Cookie": " ",
            },
        }
        )

    }
}
