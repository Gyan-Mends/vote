import React, { useEffect, useState } from "react";
import CustomTable from "~/components/table/table";
import AdminLayout from "~/layout/adminLayout";
import { CategoryColumns } from "~/components/table/data";
import { TableRow, TableCell, User, Chip, Input, Button, Checkbox, Textarea, Tooltip, Avatar, SelectItem, Select } from "@nextui-org/react";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import CreateModal from "~/components/modal/createModal";
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { getSession } from "~/session";
import { CategoryInterface, EventInterface } from "~/modal/interface";
import { EyeIcon } from "~/components/icons/EyeIcon";
import { EditIcon } from "~/components/icons/EditIcon";
import { DeleteIcon } from "~/components/icons/DeleteIcon";
import { Toaster } from "react-hot-toast";
import { errorToast, successToast } from "~/components/toast";
import Categories from "~/modal/category";
import Events from "~/modal/events";


const Category = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { token } = useLoaderData<{ token: string }>()
    const { event } = useLoaderData<{ event: EventInterface[] }>()
    const { category } = useLoaderData<{ category: CategoryInterface[] }>()
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


    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage);
    };

    return (
        <AdminLayout pageName="Nominations">
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
                        <CreateModal className="" name="Create Nomination" modalTitle="Create New Nomination">
                            {(onClose) => (
                                <Form method="post" className="flex flex-col gap-4">
                                    <Select
                                        items={event}
                                        label="Event"
                                        placeholder="Select a event"
                                        variant="bordered"
                                        name="event"
                                        isRequired
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
                                        label="Nomination"
                                        placeholder="Perfect Gentilman"
                                        variant="bordered"
                                        name="category"
                                        isRequired
                                    />
                                    <Textarea
                                        autoFocus
                                        label="Description"
                                        placeholder="what the nomination is about"
                                        variant="bordered"
                                        name="description"
                                    />

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
                <CustomTable columns={CategoryColumns} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleRowsPerPageChange}>
                    {category.map((categories: CategoryInterface, index: number) => (
                        <TableRow key={index}>
                            <TableCell>
                                <User
                                    avatarProps={{ radius: "lg", src: categories.category }}
                                    name={categories.event}
                                />
                            </TableCell>
                            <TableCell>
                                {categories.category}
                            </TableCell>
                            <TableCell>{categories.description}</TableCell>
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
                                        <Link to={`${categories._id}`}>
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
    const category = await Categories.find({ email: token })


    return { token, event, category }
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const event = formData.get("event") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const email = formData.get("email")
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");

    try {
        // check if event exist before nominations can be added
        const eventExistanceCheck = await Events.findOne({ email: token, name: event })

        if (eventExistanceCheck) {
            const newEvent = new Categories({
                event,
                category,
                description,
                email
            });

            const response = await newEvent.save();

            if (response) {
                return json({ message: "Event created successfully", success: true }, { status: 200 });
            } else {
                return json({ message: "An error occurred", success: false }, { status: 500 });
            }
        } else {
            return json({ message: "Event must be created before you can add nominations", success: false }, { status: 200 });

        }

    } catch (error) {
        console.error(error);
        return redirect("/events");
    }
}
