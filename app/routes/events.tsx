import React, { useState } from "react";
import CustomTable from "~/components/table/table";
import AdminLayout from "~/layout/adminLayout";
import { productColumns } from "~/components/table/data";
import { TableRow, TableCell, User, Chip } from "@nextui-org/react";

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
        { name: "John Doe", status: "Active", role: "Admin", avatar: "avatar1.jpg", email: "john@example.com" },
        { name: "Jane Smith", status: "Inactive", role: "User", avatar: "avatar2.jpg", email: "jane@example.com" },
        { name: "Mike Johnson", status: "Active", role: "Editor", avatar: "avatar3.jpg", email: "mike@example.com" },
    ];

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
    };

    return (
        <AdminLayout pageName="Events">
            <div>
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
            </div>
        </AdminLayout>
    );
};

export default Event;
