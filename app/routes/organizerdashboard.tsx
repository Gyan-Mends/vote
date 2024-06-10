import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import OrganizerLayout from "~/layouts/OrganizerLayout";
import Registration from "~/modals/Register";
import { commitSession, getSession } from "~/session";

const OrganizerDashboard = () => {

    return (
        <OrganizerLayout
            header="Dashboard">
                <div className="py-10">
                    <div className="flex gap-10">
                        <div className="h-[100px] w-1/4 bg-white  shadow-md border border-gray-200 rounded-md">

                        </div>
                        <div className="h-[100px] w-1/4 bg-white shadow-sm rounded-md">

                        </div>
                        <div className="h-[100px] w-1/4 bg-white shadow-sm rounded-md">

                        </div>
                        <div className="h-[100px] w-1/4 bg-white shadow-sm rounded-md">

                        </div>

                    </div>
                </div>
        </OrganizerLayout>
    );
}

export default OrganizerDashboard;

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email")
    console.log(token);


    if (!token) {
        return redirect("/login", {
            headers: {
                "Set-Cookie": await commitSession(session)
            }
        })
    }

    // Retrieving username

    const user = await Registration.findOne({ email: token });

    return { user }
} 