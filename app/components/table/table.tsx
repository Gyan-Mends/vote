import React, { ReactNode, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";

interface Column {
    key: string;
    label: ReactNode;
}

interface CustomTableProps {
    columns: Column[];
    children: ReactNode[];
    rowsPerPage: number;
    onRowsPerPageChange: (newRowsPerPage: number) => void;
}

export default function CustomTable({ columns, children, rowsPerPage, onRowsPerPageChange }: CustomTableProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(children.length / rowsPerPage);
    const currentData = children.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody>
                    {currentData}
                </TableBody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Pagination
                    total={totalPages}
                    initialPage={1}
                    onChange={(page) => handlePageChange(page)}
                    currentPage={currentPage}
                />
                <div>
                    Rows per page: 
                    <select
                        value={rowsPerPage}
                        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
