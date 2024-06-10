import { Button, Checkbox, Input } from "@nextui-org/react";
import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Link } from "react-router-dom";
import Registration from "~/modals/Register";
 

const Login = () => {
    return (
        <div className="bg-slate-50 lg:grid lg:grid-cols-2">
            {/* Login illustration */}
            <div className="">
                {/* You can add an illustration here if needed */}
            </div>
            {/* Login inputs */}
            <div className="h-[100vh] flex items-center justify-center py-4 px-2">
                <div>
                    <p className="font-poppins text-xl lg:text-4xl text-center">Register To VoteEase</p>
                    <p className="font-poppins text-sm mt-4 text-center">
                        Register to be part of our organizers <span className="text-blue-500"><Link to="/login">Already have an account</Link></span>
                    </p>
                    <div className="py-10">
                        <Form method="post">
                            <Input
                                label="Name"
                                isRequired
                                isClearable
                                labelPlacement="outside"
                                placeholder=" "
                                name="name"
                                className="font-poppins"
                                classNames={{
                                    label: "font-poppins font-medium text-sm -mt-4",
                                    inputWrapper: "border-blue-500 h-16 !max-w-xl mt-4",
                                }}
                                type="text"
                                variant="bordered"
                                color="primary"
                                required
                            />
                            <Input
                                label="Email"
                                isRequired
                                isClearable
                                labelPlacement="outside"
                                placeholder=" "
                                name="email"
                                className="font-poppins"
                                classNames={{
                                    label: "font-poppins font-medium text-sm -mt-4",
                                    inputWrapper: "border-blue-500 h-16 !max-w-xl mt-8",
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
                                    label: "font-poppins font-medium text-sm -mt-4",
                                    inputWrapper: "border-blue-500 h-16 max-w-lg mt-8",
                                }}
                                type="password"
                                variant="bordered"
                                color="primary"
                                required
                            />
                            <div className="flex justify-between mt-8">
                                <Checkbox><span className="text-sm font-poppins">Remember me</span></Checkbox>
                                <Link to="/d" className="text-red-500 text-sm font-poppins">Forget password?</Link>
                            </div>
                            <div>
                                <Button type="submit" color="primary" className="text-white text-xl font-poppins w-full h-12 mt-8">Register</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

export const action: ActionFunction = async ({ request }) => {
    try {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const user = new Registration({
            name,
            email,
            password,
        });

        const response = await user.save();

        if (response) {
            return redirect("/login");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        return new Response("Registration failed", { status: 500 });
    }
};
