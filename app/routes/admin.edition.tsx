import React, { useEffect, useState } from "react";
import CustomTable from "~/components/table/table";
import AdminLayout from "~/layout/adminLayout";
import { EditionColumns } from "~/components/table/data";
import { TableRow, TableCell, User, Chip, Input, Button, Checkbox, Textarea, Tooltip, Avatar, SelectItem, Select } from "@nextui-org/react";
import { Form, Link, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import CreateModal from "~/components/modal/createModal";
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { getSession } from "~/session";
import { CategoryInterface, EditionInterface, EventInterface } from "~/modal/interface";
import { EyeIcon } from "~/components/icons/EyeIcon";
import { EditIcon } from "~/components/icons/EditIcon";
import { DeleteIcon } from "~/components/icons/DeleteIcon";
import { Toaster } from "react-hot-toast";
import { errorToast, successToast } from "~/components/toast";
import Categories from "~/modal/category";
import Events from "~/modal/events";
import Edition from "~/modal/edition";


const Category = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { token } = useLoaderData<{ token: string }>()
    const { event } = useLoaderData<{ event: EventInterface[] }>()
    const { edition } = useLoaderData<{ edition: EditionInterface[] }>()
    const [base64Image, setBase64Image] = useState('');
    const actionData = useActionData<any>()
    const navigate = useNavigate()

    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                navigate("/admin/edition");
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
        <AdminLayout pageName="Edition">
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
                        <CreateModal className="" name="Create Edition" modalTitle="Create New Edition">
                            {(onClose) => (
                                <Form method="post" className="flex flex-col gap-4">
                                    <Select
                                        items={event}
                                        label="Event"
                                        placeholder="Select a event"
                                        variant="bordered"
                                        name="event"
                                    >
                                        {(event) => (
                                            <SelectItem key={event.name} textValue={event.name}>
                                                <div className="flex gap-2 items-center">
                                                    <Avatar alt={event.name} className="flex-shrink-0" size="sm" src={event.logo} />
                                                    <div className="flex flex-col">
                                                        <span className="text-small">{event.name}</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        )}
                                    </Select>


                                    <Input
                                        autoFocus
                                        label="name"
                                        placeholder="Golden Edition || 2024"
                                        variant="bordered"
                                        name="name"
                                    />

                                    <Input
                                        autoFocus
                                        label="price"
                                        placeholder="GHC1 per vote"
                                        variant="bordered"
                                        name="price"
                                    />
                                    <Textarea
                                        autoFocus
                                        label="Description"
                                        placeholder="what the nomination is about"
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
                <CustomTable columns={EditionColumns} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleRowsPerPageChange}>
                    {edition.map((editions: EditionInterface, index: number) => (
                        <TableRow key={index}>
                            <TableCell>
                            <User
                                    avatarProps={{ radius: "lg", src: editions.logo }}
                                    name={editions.name}
                                />
                            </TableCell>
                            <TableCell>
                                {editions.event}
                            </TableCell>
                            <TableCell>
                                {editions.price}
                            </TableCell>
                            <TableCell>{editions.description}</TableCell>
                            <TableCell><Button>{editions.status}</Button></TableCell>
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
                                        <Link to={`${editions._id}`}>
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

export default Category;

// loader function
export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");
    console.log(token);


    if (!token) {
        return redirect("/login");
    }
    // events to populate select
    const event = await Events.find({ email: token })
    // categories to populate the table
    const edition = await Edition.find({ email: token })


    return { token, event, edition }
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const event = formData.get("event") as string;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const base64Image = formData.get("base64Image") as string; // Handle file upload properly
    const email = formData.get("email")

    // Check if event exists
    try {
        const newEvent = new Edition({
            event,
            price,
            name,
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
