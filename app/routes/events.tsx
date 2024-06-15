import React, { useState } from "react";
import CustomTable from "~/components/table/table";
import AdminLayout from "~/layout/adminLayout";
import { productColumns } from "~/components/table/data";
import { TableRow, TableCell, User, Chip, Input, Button, Checkbox } from "@nextui-org/react";
import { Form, Link } from "@remix-run/react";
import CreateModal from "~/components/modal/createModal";
import { LockIcon } from "~/components/icons/LockIcon";
import { MailIcon } from "~/components/icons/MailIcon";

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
                                    endContent={
                                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Email"
                                    placeholder="Enter your email"
                                    variant="bordered"
                                />
                                <div className="flex justify-end gap-2">
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" >
                                        Submit
                                    </Button>
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
