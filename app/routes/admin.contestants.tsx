import React, { useEffect, useState } from "react";
import CustomTable from "~/components/table/table";
import AdminLayout from "~/layout/adminLayout";
import { ContestantColumns } from "~/components/table/data";
import { TableRow, TableCell, User, Chip, Input, Button, Checkbox, Textarea, Tooltip, Avatar, SelectItem, Select } from "@nextui-org/react";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import CreateModal from "~/components/modal/createModal";
import { ActionFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { getSession } from "~/session";
import { CategoryInterface, ContestantInterface, EditionInterface, EventInterface } from "~/modal/interface";
import { EyeIcon } from "~/components/icons/EyeIcon";
import { EditIcon } from "~/components/icons/EditIcon";
import { DeleteIcon } from "~/components/icons/DeleteIcon";
import { Toaster } from "react-hot-toast";
import { errorToast, successToast } from "~/components/toast";
import Categories from "~/modal/category";
import Events from "~/modal/events";
import Edition from "~/modal/edition";
import Contestant from "~/modal/contestant";


const Category = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { token } = useLoaderData<{ token: string }>()
    const { event } = useLoaderData<{ event: EventInterface[] }>()
    const { edition } = useLoaderData<{ edition: EditionInterface[] }>()
    const { category } = useLoaderData<{ category: CategoryInterface[] }>()
    const {contestant} = useLoaderData<{contestant:ContestantInterface[]}>()
    const [base64Image, setBase64Image] = useState('');
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
        <AdminLayout pageName="Contestants">
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
                        <CreateModal className="" name="Create Contestant" modalTitle="Create New Contestant">
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

                                    <Select
                                        items={edition}
                                        label="Edition"
                                        placeholder="Select a edition"
                                        variant="bordered"
                                        name="edition"
                                        isRequired
                                    >
                                        {(edition) => (
                                            <SelectItem key={edition.name} textValue={edition.name}>
                                                <div className="flex gap-2 items-center">
                                                    <Avatar alt={edition.name} className="flex-shrink-0" size="sm" src={edition.logo} />
                                                    <div className="flex flex-col">
                                                        <span className="text-small">{edition.name}</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        )}
                                    </Select>

                                    <Select
                                        items={category}
                                        label="Nomination"
                                        placeholder="Select a nomination"
                                        variant="bordered"
                                        name="nomination"
                                        isRequired
                                    >
                                        {(category) => (
                                            <SelectItem key={category.category} textValue={category.category}>
                                                <div className="flex gap-2 items-center">
                                                    <Avatar alt={category.category} className="flex-shrink-0" size="sm" src={category.category} />
                                                    <div className="flex flex-col">
                                                        <span className="text-small">{category.category}</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        )}
                                    </Select>


                                    <Input
                                        autoFocus
                                        label="name"
                                        placeholder="Enter stage name"
                                        variant="bordered"
                                        name="name"
                                    />

                                    <Input
                                        autoFocus
                                        label="code"
                                        placeholder=""
                                        variant="bordered"
                                        name="code"
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
                                    <input hidden type="text" name="email" value={token} />

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
                <CustomTable columns={ContestantColumns} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleRowsPerPageChange}>
                    {contestant.map((contestants: ContestantInterface, index: number) => (
                        <TableRow key={index}>
                            <TableCell>
                                <User
                                    avatarProps={{ radius: "lg", src: contestants.image }}
                                    name={contestants.name}
                                />
                            </TableCell>
                            <TableCell>
                                {contestants.event}
                            </TableCell>
                            <TableCell>
                                {contestants.edition}
                            </TableCell>
                            <TableCell>
                                {contestants.nomination}
                            </TableCell>
                            <TableCell>{contestants.code}</TableCell>
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
                                        <Link to={`${contestants._id}`}>
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


    if (!token) {
        return redirect("/login");
    }
    // events to populate select
    const event = await Events.find({ email: token });
    // edition to populate the table
    const edition = await Edition.find({ email: token });
    //category to populate select
    const category = await Categories.find({ email: token })
    // contestants to populate the table
    const contestant = await Contestant.find({ email: token })



    return { token, event, edition, category,contestant }
}

export const action: ActionFunction = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email");
    const formData = await request.formData();
    const event = formData.get("event") as string;
    const edition = formData.get("edition") as string;
    const nomination = formData.get("nomination") as string;
    const name = formData.get("name") as string;
    const code = formData.get("code") as string;
    const base64Image = formData.get("base64Image") as string; 
    const email = formData.get("email") as string;

    
    try {
        // Check if nomination form is closed or opened
        const editionStatusCheck = await Edition.find({email:token,status:"Closed",event:event})
        if(editionStatusCheck){
            return json({message:"Form is not opened, contact your organizer", success:false},{status:200})
        }

        const newEvent = new Contestant({
            event,
            edition,
            nomination,
            name,
            code,
            image: base64Image,
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
