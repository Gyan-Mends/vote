import React, { useEffect, useState } from "react";
import CustomTable from "~/components/table/table";
import AdminLayout from "~/layout/adminLayout";
import { EventColumns, productColumns } from "~/components/table/data";
import { TableRow, TableCell, User, Chip, Input, Button, Checkbox, Textarea, Tooltip } from "@nextui-org/react";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import CreateModal from "~/components/modal/createModal";
import { LockIcon } from "~/components/icons/LockIcon";
import { MailIcon } from "~/components/icons/MailIcon";
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { getSession } from "~/session";
import Events from "~/modal/events";
import { EventInterface } from "~/modal/interface";
import { EyeIcon } from "~/components/icons/EyeIcon";
import { EditIcon } from "~/components/icons/EditIcon";
import { DeleteIcon } from "~/components/icons/DeleteIcon";
import { Toaster } from "react-hot-toast";
import { errorToast, successToast } from "~/components/toast";


const Event = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [base64Image, setBase64Image] = useState('');
    const { token } = useLoaderData<{ token: string }>()
    const { event } = useLoaderData<{ event: EventInterface[] }>()
    const actionData = useActionData<any>()

    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                successToast(actionData.message);
            } else {
                errorToast(actionData.message);
            }
        }
    }, [actionData]);

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
    };

    return (
        <AdminLayout pageName="Events">
            <div className="relative z-0">
                <Toaster position="top-center" />

                <div className="flex relative z-0 justify-between mb-4">
                    <div>
                        <Input
                            classNames={{
                                inputWrapper: "lg:w-96 h-12",
                            }}
                            placeholder="Search..."
                        />
                    </div>
                    <div>
                        <CreateModal className="" name="Create Event" modalTitle="Create New Event">
                            {(onClose) => (
                                <Form method="post" className="flex flex-col gap-4">
                                    <Input
                                        autoFocus
                                        label="Name"
                                        placeholder="Enter your event name"
                                        variant="bordered"
                                        name="name"
                                    />
                                    <Input
                                        autoFocus
                                        label="Type"
                                        placeholder="Enter your event type"
                                        variant="bordered"
                                        name="type"
                                    />
                                    <Textarea
                                        autoFocus
                                        placeholder="Enter your event description"
                                        variant="bordered"
                                        name="description"
                                    />
                                    <input
                                        name="logo"
                                        type="file"
                                        className="border border-gray-500 border-2 h-12 rounded-lg"
                                        onChange={handleImageChange}
                                    />
                                    {base64Image && (
                                        <div className="mt-4">
                                            <img src={base64Image} alt="Selected" className="w-26 rounded-lg h-40 bg-slate-800" />
                                        </div>
                                    )}

                                    <input type="hidden" name="base64Image" value={base64Image} />
                                    <input hidden type="" name="email" value={token} />

                                    <div className="flex justify-end gap-2">
                                        <Button color="danger" variant="flat" onPress={onClose}>
                                            Close
                                        </Button>
                                        <button color="primary" >
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </CreateModal>
                    </div>
                </div>
                <CustomTable columns={EventColumns} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleRowsPerPageChange}>
                    {event.map((events: EventInterface, index: number) => (
                        <TableRow key={index}>
                            <TableCell>
                                <User
                                    avatarProps={{ radius: "lg", src: events.logo }}
                                    name={events.name}
                                />
                            </TableCell>
                            <TableCell>
                                {events.description}
                            </TableCell>
                            <TableCell>{events.type}</TableCell>
                            <TableCell className="relative flex items-center gap-4">
                                <Tooltip content="Details">
                                    <span className="text-lg text-primary-400 cursor-pointer active:opacity-50">
                                        <EyeIcon />
                                    </span>
                                </Tooltip>
                                <Tooltip content="Edit user">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <EditIcon />
                                    </span>
                                </Tooltip>
                                <Tooltip color="danger" content="Delete user">
                                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                        <Link to={`${events._id}`}>
                                            <DeleteIcon />
                                        </Link>
                                    </span>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </CustomTable>
            </div>
        </AdminLayout>
    );
};

export default Event;

// loader function
export const loader: LoaderFunction = async ({ request,params }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");
    console.log(token);
    

    if (!token) {
        return redirect("/login");
    }
    const event = await Events.find({ email: token })


    return { token, event }
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const base64Image = formData.get("base64Image") as string; // Handle file upload properly
    const email = formData.get("email")

    // Check if event exists
    try {
        const newEvent = new Events({
            name,
            type,
            description,
            logo: base64Image,
            email
        });

        const response = await newEvent.save();

        if (response) {
            return json({ message: "Event created successfully", success: true }, { status: 200 });
        } else {
            return json({ message: "An error occurred", success: false }, { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return redirect("/events");
    }
}
