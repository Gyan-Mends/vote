import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import OrganizerLayout from "~/layouts/OrganizerLayout";
import Registration from "~/modals/Register";
import { commitSession, getSession } from "~/session";
import { Input, Button, Checkbox, useDisclosure, Select, SelectItem, Textarea, Card, CardHeader, CardFooter, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Form, useLoaderData } from "@remix-run/react";
import CreateModal from "~/components/createmodal";
import Event, { UserInterface } from "~/modals/event";
import { useState } from "react";


const Events = () => {
    const { user } = useLoaderData<{ user: { email: string } }>();
    const { events } = useLoaderData<{ events: UserInterface[] }>()
    const createRecordDisclosure = useDisclosure();
    const [Image, setImage] = useState()

    const handleImageChange = (event) => {
        // target
        const target = event.target.files[0];

        if (target) {
            //reading the image
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result)
            };

            reader.readAsDataURL(target)
        }
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <OrganizerLayout header="Events">
            <div className="py-10">
                <div className="flex justify-between">
                    <div>
                        <Input
                            isClearable
                            placeholder=" Search for events"
                            className="font-poppins"
                            classNames={{
                                inputWrapper: "bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm h-12 !max-w-lg mt-4",
                            }}

                            type="text"
                            variant="bordered"
                        />
                    </div>
                    <div>
                        <Button

                            className="font-poppins bg-indigo-500 text-white"
                            onPress={() => createRecordDisclosure.onOpen()}
                        >
                            Add Event
                        </Button>
                    </div>
                </div>

                <div className="py-10 flex gap-4 flex-wrap overflow-y-scroll h-[74vh] rounded-lg">
                    {
                        events.map((event: UserInterface, index: number) => (
                            <Card key={index} isFooterBlurred className="w-[25vw] h-[300px] col-span-12 sm:col-span-7">
                                <img
                                    alt="Relaxing app background"
                                    className="z-0 "
                                    src={event.image}
                                />
                                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                                    <div className="flex flex-grow gap-2 items-center">
                                        <img
                                            alt="Breathing app icon"
                                            className="rounded-full w-10 h-11 bg-black"
                                            src={event.image}
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-tiny text-white/60">{event.name}</p>
                                            <p className="text-tiny text-white/60">{event.type}</p>
                                        </div>
                                    </div>
                                    <Dropdown className="bg-gray-300 shadow-lg w-4">
                                        <DropdownTrigger>
                                            <button className="text-black flex justify-center items-center bg-slate-300 w-8 rounded-md h-8">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 20 20"><path fill="currentColor" d="M9 15.25a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0m0-5a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0m0-5a1.249 1.249 0 1 1 2.5 0a1.25 1.25 0 1 1-2.5 0" /></svg>
                                            </button>
                                        </DropdownTrigger>
                                        <DropdownMenu className="">
                                            <DropdownItem className="flex hover:bg-primary-500">
                                                <div className="flex">
                                                    <div className="">
                                                        <svg className="text-danger-500" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" /></svg>
                                                    </div>
                                                    <div>
                                                        Delete
                                                    </div>
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <div className="flex">
                                                    <div className="">
                                                        <svg className="text-danger-500" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" /></svg>
                                                    </div>
                                                    <div>
                                                        Delete
                                                    </div>
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem>
                                            <div className="flex">
                                                <div className="">
                                                    <svg className="text-danger-500" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" /></svg>
                                                </div>
                                                <div>
                                                    Delete
                                                </div>
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem>
                                            <div className="flex">
                                                <div className="">
                                                    <svg className="text-danger-500" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" /></svg>
                                                </div>
                                                <div>
                                                    Delete
                                                </div>
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem>
                                            <div className="flex">
                                                <div className="">
                                                    <svg className="text-danger-500" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" /></svg>
                                                </div>
                                                <div>
                                                    Delete
                                                </div>
                                                </div>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </CardFooter>
                            </Card>
                        ))
                    }
                </div>
            </div>

            <CreateModal
                isOpen={createRecordDisclosure.isOpen}
                onOpenChange={createRecordDisclosure.onOpenChange}
                onCloseModal={createRecordDisclosure.onClose}
                title="Add New Event"
                actionText="Save"
                size="xl"
            >
                <Form method="post">
                    <Input
                        label="Name"
                        isClearable
                        labelPlacement="outside"
                        placeholder=" "
                        name="name"
                        classNames={{
                            label: "font-poppins font-medium text-black text-sm",
                            inputWrapper: "h-12 max-w-lg  mt-1",
                        }}
                        type="text"
                        variant="bordered"
                    />

                    <Input
                        label="Type"
                        readOnly
                        defaultValue="Award"
                        labelPlacement="outside"
                        placeholder=" "
                        name="type"
                        classNames={{
                            label: "font-poppins font-medium text-black text-sm",
                            inputWrapper: "h-12 max-w-lg  mt-4",
                        }}
                        type="text"
                        variant="bordered"
                    />

                    <Textarea
                        label="Description"
                        labelPlacement="outside"
                        placeholder=" "
                        name="description"
                        classNames={{
                            label: "font-poppins font-medium text-black text-sm mt-4",
                            inputWrapper: " max-w-lg  ",
                        }}
                        type="text"
                        variant="bordered"
                    />

                    <div className="">
                        <label className="mt-4 block" htmlFor="image">Image</label>
                        <input
                            placeholder=" "
                            name="image"
                            className=" border border-2 rounded-lg h-12 w-[35vw] hover:border-gray-200"
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div>

                    {
                        Image && (
                            <div className="w-20 h-20 rounded-lg">
                                <img src={Image} className="w-20 h-20 rounded-lgw-20 h-20 rounded-lg" alt="" />
                            </div>
                        )
                    }

                    <input className="hidden" name="base64Image" value={Image} />
                    <Input
                        label="Email"
                        readOnly
                        labelPlacement="outside"
                        placeholder=" "
                        defaultValue={user.email}
                        name="email"
                        className=""
                        classNames={{
                            label: "font-poppins font-medium text-black text-sm",
                            inputWrapper: "h-12 max-w-lg  mt-4",
                        }}
                        type="text"
                        variant="bordered"
                    />

                    <button className="float-right mt-10 text-white bg-primary-500 p-2 rounded-lg">
                        Create
                    </button>
                </Form>
            </CreateModal>
        </OrganizerLayout>
    );
};

export default Events;

export const loader: LoaderFunction = async ({param, request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("email")
    const {eventId} = param
    

    if (!token) {
        return redirect("/login", {
            headers: {
                "Set-Cookie": await commitSession(session)
            }
        })
    }

    // Retrieving username
    const user = await Registration.findOne({ email: token });
    const events = await Event.find({ email: token })

    return { user, events }
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const base64Image = formData.get("base64Image") as string;
    const email = formData.get("email") as string;

    const user = new Event({
        name,
        type,
        description,
        image: base64Image,
        email,
    });

    const response = await user.save()

    return true
}