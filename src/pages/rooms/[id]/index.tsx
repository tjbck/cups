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
    let id = req.cookies.user_id
    if (!id) {
        id = uuidv4()
        res.setHeader("set-cookie", cookie.serialize('user_id', id, {
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


const Room: NextPage = ({ room: { id: room_id }, user: { id: user_id } }: Props, { }) => {
    const router = useRouter()
    // const { id } = router.query

    const [username, setUsername] = useState('')
    const [active, setActive] = useState(false)

    const [socketId, setSocketId] = useState('')


    useEffect(() => {
        socket = io(`${server}`, { path: '/v1/ws/socket.io' })



        socket.on("connect", () => {
            console.log('connect', socket.connected); // true

            socket.emit('join-room', {
                room: room_id
            })
            toast.success(`Successfully connected to Room ${room_id}`)

            setSocketId(socket.id);
        });

        socket.on("change-colour", (arg) => {
            console.log('change-colour', arg);
            // ...
        });

        socket.on("close-socket", (arg) => {
            if (arg.user_id == user_id && arg.sid != socket.id) {
                console.log('New tab opened!')
                socket.close();
                setSocketId('')
            }
        });

        return () => {
            socket.close();
        }
    }, [room_id, user_id])

    return (
        <>
            <Head>
                <title>{`Fastcups | Room ${room_id}`}</title>
            </Head>

            <div className={`flex flex-row justify-center min-h-screen ${!active ? 'bg-indigo-900' : 'bg-gray-50'}`}>
                <div className="basis-11/12 flex flex-col max-w-md text-gray-600 my-auto pb-10">

                    {socket && socketId ?
                        <>
                            {!active ?
                                <>
                                    <SetUsername
                                        state={{ username, setUsername }}
                                        callback={() => {
                                            socket.emit('set-username', {
                                                name: username
                                            })
                                            setActive(true)
                                        }} />
                                </> :
                                <>
                                    <Cups socket={socket} roomId={room_id} />
                                </>}
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
                </div>
            </div>
        </>
    )
}

export default Room