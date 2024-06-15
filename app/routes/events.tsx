import React, { useState } from "react";
import CustomTable from "~/components/table/table";
import AdminLayout from "~/layout/adminLayout";
import { productColumns } from "~/components/table/data";
import { TableRow, TableCell, User, Chip, Input, Button, Checkbox } from "@nextui-org/react";
import { Form, Link } from "@remix-run/react";
import CreateModal from "~/components/modal/createModal";
import { LockIcon } from "~/components/icons/LockIcon";
import { MailIcon } from "~/components/icons/MailIcon";
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { getSession } from "~/session";
import Events from "~/modal/events";

const Event = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const data = [
        { name: "John Doe", status: "Active", role: "Admin", avatar: "avatar1.jpg", email: "john@example.com" },
        { name: "Jane Smith", status: "Inactive", role: "User", avatar: "avatar2.jpg", email: "jane@example.com" },
        { name: "Mike Johnson", status: "Active", role: "Editor", avatar: "avatar3.jpg", email: "mike@example.com" },
        { name: "John Doe", status: "Active", role: "Admin", avatar: "avatar1.jpg", email: "john@example.com" },
        { name: "Jane Smith", status: "Inactive", role: "User", avatar: "avatar2.jpg", email: "jane@example.com" },
        { name: "Mike Johnson", status: "Active", role: "Editor", avatar: "avatar3.jpg", email: "mike@example.com" },
        { name: "John Doe", status: "Active", role: "Admin", avatar: "avatar1.jpg", email: "john@example.com" },
        { name: "Jane Smith", status: "Inactive", role: "User", avatar: "avatar2.jpg", email: "jane@example.com" },
        { name: "Mike Johnson", status: "Active", role: "Editor", avatar: "avatar3.jpg", email: "mike@example.com" },
        { name: "John Doe", status: "Active", role: "Admin", avatar: "avatar1.jpg", email: "john@example.com" },
        { name: "Jane Smith", status: "Inactive", role: "User", avatar: "avatar2.jpg", email: "jane@example.com" },
        { name: "Mike Johnson", status: "Active", role: "Editor", avatar: "avatar3.jpg", email: "mike@example.com" },
        // ...other rows
    ];

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
    };

    return (
        <AdminLayout pageName="Events">
            <div className="flex justify-between mb-4">
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
                                    placeholder="Enter your email"
                                    variant="bordered"
                                    name="name"
                                />
                                <Input
                                    autoFocus
                                    label="Type"
                                    placeholder="Enter your email"
                                    variant="bordered"
                                    name="type"
                                />
                                <Input
                                    autoFocus
                                    label="Description"
                                    placeholder="Enter your email"
                                    variant="bordered"
                                />
                                <input name="logo" type="file" />
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
            <CustomTable columns={productColumns} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleRowsPerPageChange}>
                {data.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <User
                                avatarProps={{ radius: "lg", src: row.avatar }}
                                description={row.email}
                                name={row.name}
                            />
                        </TableCell>
                        <TableCell>
                            <Chip>{row.status}</Chip>
                        </TableCell>
                        <TableCell>{row.role}</TableCell>
                    </TableRow>
                ))}
            </CustomTable>
        </AdminLayout>
    );
};

export default Event;

// loader function
export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");

    if (!token) {
        return redirect("/login");
    }

    return true
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const logo = formData.get("logo") as string;

    console.log(name, type, description, logo);
    

    // Check if event exists
    try {
        const newEvent = new Events({
            name,
            type,
            description,
            logo
        });

        const response = await newEvent.save();

        if (response) {
            return json({ message: "Event created successfully", success: true }, { status: 200 });
        }else{
            return json({ message: "An error occurred", success: false }, { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return redirect("/events");
    }
}
