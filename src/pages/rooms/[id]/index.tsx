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


import smilingEmoji from '../../../assets/images/smiling.png'
import thinkingEmoji from '../../../assets/images/thinking.png'
import pensiveEmoji from '../../../assets/images/pensive.png'
import wavingEmoji from '../../../assets/images/waving.png'



import Navbar from '../../../components/layout/Navbar';

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


    const [colour, setColour] = useState('')
    const [socketId, setSocketId] = useState('')


    useEffect(() => {
        socket = io(`${server}`, { path: '/v1/ws/socket.io' })

        socket.on("connect", () => {
            setSocketId(socket.id);
            console.log('connect', socket.connected); // true

            socket.emit('join-room', {
                room: room_id
            })

            toast.success(`Successfully connected to Room ${room_id}`)
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
            <Navbar />

            <div className="flex flex-row justify-center min-h-screen bg-gray-50">
                <div className="basis-11/12 flex flex-col max-w-md text-gray-600 my-auto  pb-28">
                    <div className="flex flex-col justify-center">
                        <div className='hidden bg-red-400'></div>
                        <div className='hidden bg-green-400'></div>
                        <div className='hidden bg-yellow-400'></div>

                        <div className={`${colour ? `bg-${colour}-400` : 'bg-gray-200'} flex flex-col justify-center h-[36rem] max-h-[70vh] w-full rounded-lg`}>
                            <div className=''>
                                <div className=' text-center px-10 text-white text-xl font-medium'>
                                    {(colour === 'green') ? <>
                                        <div className='flex flex-col justify-center '>
                                            <div className='w-full flex justify-center'>
                                                <div className='w-32'>
                                                    <Image src={smilingEmoji} layout="responsive" alt="Smiling Emoji" />
                                                </div>

                                            </div>
                                            <div className='mt-6'>
                                                I am comfortable with my understanding and pacing of the lesson
                                            </div>
                                        </div>

                                    </> : (colour === 'yellow') ? <>

                                        <div className='flex flex-col justify-center '>
                                            <div className='w-full flex justify-center'>
                                                <div className='w-32'>
                                                    <Image src={thinkingEmoji} layout="responsive" alt="Thinking Emoji" />
                                                </div>

                                            </div>
                                            <div className='mt-6'>
                                                I am working through my understanding, I would benefit from the teacher slowing down or revisiting the current concept
                                            </div>
                                        </div>


                                    </> : (colour === 'red') ? <>

                                        <div className='flex flex-col justify-center '>
                                            <div className='w-full flex justify-center'>
                                                <div className='w-32'>
                                                    <Image src={pensiveEmoji} layout="responsive" alt="Pensive Emoji" />
                                                </div>

                                            </div>
                                            <div className='mt-6'>
                                                STOP!<br />I am not understanding and I have a question
                                            </div>
                                        </div>



                                    </> : <>
                                        <div className='flex flex-col justify-center '>
                                            <div className='w-full flex justify-center'>
                                                <div className='w-32'>
                                                    <Image src={wavingEmoji} layout="responsive" alt="Waving Emoji" />
                                                </div>

                                            </div>
                                            <div className='mt-6 text-gray-800'>
                                                Please select the colour

                                            </div>
                                        </div>
                                    </>
                                    }
                                </div>

                            </div>






                        </div>

                        <div className="flex flex-row justify-center w-full mt-4">
                            <div className='basis-1/3 mr-0.5'>
                                <button
                                    className="rounded-lg py-2 px-4 w-full text-green-600 font-semibold bg-green-100 hover:bg-green-200"

                                    data-tippy-content="I am comfortable with my understanding and pacing of the lesson"
                                    onClick={() => {
                                        console.log('GREEN')
                                        setColour('green')

                                        socket.emit('change-colour', {
                                            colour: 'green'
                                        })
                                    }}
                                >
                                    GREEN
                                </button>
                            </div>
                            <div className='basis-1/3 mx-0.5'>
                                <button
                                    className="rounded-lg py-2 px-4 w-full text-yellow-600 font-semibold bg-yellow-100 hover:bg-yellow-200"
                                    data-tippy-content="I am working through my understanding, I would benefit from the teacher slowing down or revisiting the current concept"
                                    onClick={() => {
                                        console.log('YELLOW')
                                        setColour('yellow')

                                        socket.emit('change-colour', {
                                            colour: 'yellow'
                                        })
                                    }}
                                >
                                    YELLOW
                                </button>
                            </div>
                            <div className='basis-1/3 ml-0.5'>

                                <button
                                    className="rounded-lg py-2 px-4 w-full text-red-600 font-semibold bg-red-100 hover:bg-red-200"
                                    data-tippy-content="STOP! I am not understanding and I have a question"
                                    onClick={() => {
                                        console.log('RED')
                                        setColour('red')
                                        socket.emit('change-colour', {
                                            colour: 'red'
                                        })
                                    }}
                                >
                                    RED
                                </button>
                            </div>
                        </div>

                        <div className='mt-3 text-xs text-gray-500'>room: {room_id} sid: {socketId}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Room