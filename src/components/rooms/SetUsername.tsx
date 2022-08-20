import React, { useState } from 'react'
import { Socket } from "socket.io-client";



type SetUsernameProps = {
    state: {
        username: string
        setUsername: React.Dispatch<React.SetStateAction<string>>
    }
    callback: Function
}

const SetUsername = ({ state: { username, setUsername }, callback }: SetUsernameProps) => {


    return (
        <>
            <div className="flex justify-center">
                <div className="basis-full max-w-xs">
                    <div className="bg-white p-4 rounded-lg">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            callback();
                        }}>

                            <div className="mb-2">
                                <input
                                    type="text"
                                    id="room-code"
                                    className="bg-white border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full px-3 py-2.5 "
                                    placeholder="Nickname"
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value) }}
                                    required
                                />
                            </div>

                            <div className="">

                                <button
                                    className="rounded-lg py-2 px-4 w-full text-white font-semibold bg-gray-700 hover:bg-gray-800"
                                    type="submit"
                                >
                                    OK, go!
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SetUsername