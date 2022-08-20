import React, { useEffect, useState } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { server } from '../../../constants'
import Image from 'next/image';
import Head from 'next/head';


import { v4 as uuidv4 } from 'uuid'
import { io, Socket } from "socket.io-client";
import toast from 'react-hot-toast';
import cookie from "cookie"


import Navbar from '../../../components/layout/Navbar';
import Spinner from '../../../components/common/Spinner';
import Cups from '../../../components/rooms/Cups';
import SetUsername from '../../../components/rooms/SetUsername';

let socket: Socket

// This gets called on every request
export async function getServerSideProps({ res, req, query }) {
    // Fetch data from external API
    // const res = await fetch(`https://.../data`)
    // const data = await res.json()

    console.log('rooms index')
    let id = req.cookies.userId
    if (!id) {
        id = uuidv4()
        res.setHeader("set-cookie", cookie.serialize('userId', id, {
            httpOnly: true
        }))
    }

    console.log(req.cookies)

    // Pass data to the page via props
    return {
        props: {
            room: {
                id: query.id
            },
            user: {
                id: id
            }
        }
    }
}


type Props = {
    room: {
        id: string
    },
    user: {
        id: string
    }
}


const Room: NextPage = ({ room: { id: roomId }, user: { id: userId } }: Props, { }) => {

    const [active, setActive] = useState(false)
    const [username, setUsername] = useState('')


    const [socketId, setSocketId] = useState('')
    const [colour, setColour] = useState('')

    useEffect(() => {
        if (active && username) {
            socket = io(`${server}`, { path: '/v1/ws/socket.io' })

            socket.on("connect", () => {
                setColour('')

                console.log('connect', socket.connected); // true

                socket.emit('join-room', {
                    room: roomId
                })
                socket.emit('set-username', {
                    name: username
                })

                toast.success(`Successfully connected to Room ${roomId}`)
                setSocketId(socket.id);
            });

            socket.on("change-colour", (arg) => {
                console.log('change-colour', arg);
                // ...
            });

            socket.on("close-socket", (arg) => {
                if (arg.userId == userId && arg.sid != socket.id) {
                    console.log('New tab opened!')
                    socket.close();
                    setSocketId('')
                }
            });
            return () => {
                socket.close();
                setSocketId('')
            }
        }
    }, [active, username, roomId, userId])

    return (
        <>
            <Head>
                <title>{`Fastcups | Room ${roomId}`}</title>
            </Head>

            <div className={`flex flex-row justify-center min-h-screen ${!active ? 'bg-indigo-900' : 'bg-gray-50'}`}>
                <div className="basis-11/12 flex flex-col max-w-md text-gray-600 my-auto pb-10">

                    {!active ?
                        <>
                            <SetUsername
                                state={{ username, setUsername }}
                                callback={() => {
                                    setActive(true)
                                }} />
                        </> :
                        <>
                            {socket && socketId ?
                                <>
                                    <Cups state={{ colour, setColour }} socket={socket} roomId={roomId} />
                                    <div className='text-xs text-gray-400'>
                                        Joined as {username}
                                    </div>
                                </> :
                                <>
                                    <div className='pb-10'>
                                        <div className='flex justify-center'>
                                            <div
                                                className=' w-56 h-56'
                                                dangerouslySetInnerHTML={{
                                                    __html: `
                    <lottie-player src="https://assets10.lottiefiles.com/datafiles/VrzuKbt6gjYx7B4/data.json" background="transparent" speed="1" style="width: 100%; height: 100%" loop autoplay></lottie-player>
                    `
                                                }} />
                                        </div>
                                        <div className=' font-semibold text-center text-xl text-white'>
                                            Loading...
                                        </div>
                                    </div>
                                </>}
                        </>}
                </div>
            </div>
        </>
    )
}

export default Room