import { Button, Input } from "@nextui-org/react"
import CategoryIcon from "~/components/icons/CategoryIcon"
import NumberIcon from "~/components/icons/NumberIcon"
import { SearchIcon } from "~/components/icons/SearchIcon"
import SmileIcon from "~/components/icons/SmileIcon"
import PublicLayout from "~/layout/publicLayout"


const Home = () => {
    return (
        <PublicLayout>
            <div className="lg:grid lg:grid-cols-2  h-[91vh] flex flex-col items-center  p-4">
                <div className="">
                    <p className="lg:text-6xl text-4xl font-poppins font-bold">Vote without Rigging</p>
                    <span className="flex text-center  justify-center">
                        <p className="text-6xl font-poppins font-bold  mt-4 ">Just <span className="text-primary">VoteEase </span></p>
                        <SmileIcon className="lg:text-6xl mt-4 lg:ml-2" />
                    </span>

                    <div className="mt-10 ">
                        <p className="font-poppins text-md">Do you remmember your contestant's short code?</p>
                        <div className="flex mt-6">
                            <Input
                                className=""
                                color="primary"
                                placeholder="Enter contestant code..."
                                variant="bordered"
                                endContent={<SearchIcon className=""/>}
                                classNames={{
                                    inputWrapper: "h-16 max-w-md border border-2 bg-primary-100 dark:bg-opacity-20 border-primary"
                                }}
                            />
                            <Button color="primary" className="h-16 font-poppins text-xl w-40">Search</Button>
                        </div>
                    </div>
                </div>
                <div className="">

                </div>
            </div>
            {/* voting processes */}
            <div className="h-[100vh] bg-slate-800 bg-opacity-40 rounded-xl flex flex-col items-center justify-center w-full">
                <div>
                    <p className="text-center text-2xl text-primary">Voting Processes</p>
                    <p className="font-bold text-2xl lg:text-5xl font-poppins mt-4">How to vote for <span className="text-primary">contestants</span></p>
                </div>
                <div className="lg:grid lg:grid-cols-3 w-full px-10 gap-10 mt-20">
                    {/* contestant search */}
                    <div>
                        <div className="h-[120px] mt-4 lg:mt-0 md:mt-0 rounded-lg transition-all duration-200 bg-white shadow-xl dark:bg-slate-950 dark:bg-opacity-70 flex items-center justify-between px-4 dark:shadow-custom-dark">
                            <div className='flex '>
                                <div className='flex gap-4 justify-between'>
                                    {/* Other content here */}
                                    <div className='bg-primary-50 flex items-center justify-center dark:bg-slate-600 h-[80px] w-[80px] rounded-xl shadow-sm'>
                                        <SearchIcon className="h-10 w-10 text-primary" />
                                    </div>
                                    <div className='flex items-center '>
                                        <span>
                                            <p className='font-poppins text-lg'>Find your</p>
                                            <p className='font-poppins text-lg'>Contestant</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className=" mt-4">Search for your contestant using their short code, name, or navigate through the event list</p>
                        </div>
                    </div>
                    {/* Number of Vote */}
                    <div>
                        <div className="h-[120px] mt-4 lg:mt-0 md:mt-0 rounded-lg transition-all duration-200 bg-white shadow-xl dark:bg-slate-950 dark:bg-opacity-70 flex items-center justify-between px-4 dark:shadow-custom-dark">
                            <div className='flex '>
                                <div className='flex gap-4 justify-between'>
                                    {/* Other content here */}
                                    <div className='bg-primary-50 flex items-center justify-center dark:bg-slate-600 h-[80px] w-[80px] rounded-xl shadow-sm'>
                                        <NumberIcon className="h-12 w-12 text-primary" />
                                    </div>
                                    <div className='flex items-center '>
                                        <span>
                                            <p className='font-poppins text-lg'>Enter the </p>
                                            <p className='font-poppins text-lg'>number of vote</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className=" mt-4">Your vote counts. You may cast as many votes as you like for your contestant.</p>
                        </div>
                    </div>
                    {/* prompmt */}
                    <div>
                        <div className="h-[120px] mt-4 lg:mt-0 md:mt-0 rounded-lg transition-all duration-200 bg-white shadow-xl dark:bg-slate-950 dark:bg-opacity-70 flex items-center justify-between px-4 dark:shadow-custom-dark">
                            <div className='flex '>
                                <div className='flex gap-4 justify-between'>
                                    {/* Other content here */}
                                    <div className='bg-primary-50 flex items-center justify-center dark:bg-slate-600 h-[80px] w-[80px] rounded-xl shadow-sm'>
                                        <CategoryIcon className="h-10 w-10 text-primary" />
                                    </div>
                                    <div className='flex items-center '>
                                        <span>
                                            <p className='font-poppins text-lg'>Find your</p>
                                            <p className='font-poppins text-lg'>Contestant</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className=" mt-4">Search for your contestant using their short code, name, or navigate through the event list</p>
                        </div>
                    </div>
                </div>

            </div>
        </PublicLayout>
    )
}
export default Home
