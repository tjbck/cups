import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../../components/layout/Navbar";

const RoomCreate: NextPage = () => {


    const router = useRouter()
    const [roomCodeValue, setRoomCodeValue] = useState('')

    return (
        <div>
            <Head>
                <title>Fastcups | Stay in sync with your students</title>
                <meta
                    name="description"
                    content="Fastcups allows you to stay in sync with your students while you teach."
                />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Navbar />

            <div className="flex flex-row justify-center min-h-screen bg-gray-100">
                <div className="basis-11/12 md:basis-6/12 max-w-xl  text-gray-600 pt-20 pb-8 sm:pb-16 md:pb-48">

                    <div className="text-center">
                        <div className=" text-gray-800 text-4xl font-bold">
                            Fastcups


                        </div>

                        <div className="text-gray-500 mt-3"><span className="text-gray-700 font-semibold">Stay in sync</span> with your students while you teach.</div>

                        <hr className="my-3" />
                        <div>
                            To learn more about this method of interacting with your students and the positive impact it can have please watch <a className=" underline hover:text-gray-900" href="https://www.youtube.com/watch?t=2249&v=J25d9aC1GZA&feature=youtu.be">this youtube video.</a>
                        </div>
                    </div>

                    <div className="mt-16 flex justify-center">
                        <div className="flex flex-col space-y-2 basis-full md:basis-1/2 bg-white p-4 rounded-lg">
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                router.push(`/rooms/${roomCodeValue}/admin`)
                            }}>
                                <div className="">
                                    <input
                                        type="text"
                                        id="room-name"
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full px-3 py-2.5 "
                                        placeholder="Room Name"
                                        autoComplete="room-name"

                                        value={roomCodeValue}
                                        onChange={(e) => { setRoomCodeValue(e.target.value) }}
                                    />
                                </div>
                                <div className="mt-3">

                                    <button
                                        className="rounded-lg py-2 px-4 w-full text-white font-semibold bg-gray-700 hover:bg-gray-800"
                                        type="submit"
                                    >
                                        Create Room
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="mt-16  md:text-base">

                        <div className=" text-gray-800 text-xl font-semibold"> Usage instructions
                        </div>
                        <div className="text-xs mx-5 my-3">

                            <ol className=" list-decimal">
                                <li>Come up with a name for your class. For the purposes of this example we will go with &apos;stargazing_101&apos;.</li>
                                <li>Fill out the input area by typing &apos;stargazing_101&apos; then click the create room button below.</li>
                                <li>Send your students to https://cups.erudiolabs.com/rooms/stargazing_101 and ask them to let you know how they are doing while the class is in progress.</li>
                                <li>Keep the tab with the teacher interface open while you teach and glance at it periodically.</li>
                            </ol>
                        </div>

                        <div className="text-xs md:text-sm text-gray-500 mt-4">
                            Note: If you are reusing your class name (a valid strategy) DO ask your students to go to the provided URL (or reload an already open page) at the start of each class! This will ensure they are properly registered on the system.
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RoomCreate;
