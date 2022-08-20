import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import React, { useEffect, useRef, useState } from 'react'


import QRCode from 'qrcode'
import { io, Socket } from "socket.io-client";
import { server } from '../../../../constants'
import useRoom from '../../../../hooks/useRoom'

import Navbar from '../../../../components/layout/Navbar';
import QrCodeModal from '../../../../components/rooms/admin/QrCodeModal'
import PieChart from '../../../../components/rooms/admin/PieChart'


// This gets called on every request
export async function getServerSideProps({ res, req, query, resolvedUrl }) {

    // console.log(resolvedUrl)
    console.log(`${req.headers.host}${resolvedUrl.slice(0, -6)}`)


    const qrCodeDataUrl = await QRCode.toDataURL(`https://${req.headers.host}${resolvedUrl.slice(0, -6)}`)

    console.log(qrCodeDataUrl)



    // Pass data to the page via props
    return {
        props: {
            qrCode: {
                url: qrCodeDataUrl
            },
            room: {
                id: query.id
            }
        }
    }
}


let socket: Socket

type Props = {
    qrCode: {
        url: string
    },
    room: {
        id: string
    },
}



const RoomAdmin: NextPage = ({ room: { id: room_id }, qrCode: { url: qrCodeDataUrl } }: Props) => {
    // const { room, isLoading, isError } = useRoom(room_id)

    const [showQrCodeModal, setShowQrCodeModal] = useState(false)

    const [users, setUsers] = useState([])
    const [questions, setQuestions] = useState([])



    const getUsersInRoom = async () => {
        const res = await fetch(`${server}/v1/rooms/${room_id}`).then((res) => res.json()).then((json) => json)
        console.log(res)
        setUsers(res)
    }


    const getQuestionsInRoom = async () => {
        const res = await fetch(`${server}/v1/rooms/${room_id}/questions`).then((res) => res.json()).then((json) => json)
        console.log(res)
        setQuestions(res)
    }


    const markQuestion = async (content) => {
        const res = await fetch(`${server}/v1/rooms/${room_id}/questions/mark`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content
            })
        }).then((res) => res.json()).then((json) => json)
        console.log(res)
        getQuestionsInRoom()
    }





    useEffect(() => {
        getUsersInRoom()
        getQuestionsInRoom()


        socket = io(`${server}`, { path: '/v1/ws/socket.io' })

        socket.on("connect", () => {
            console.log('connect', socket.connected); // true

            socket.emit('join-room-admin', {
                room: room_id
            })
        });

        socket.on("user-event", (arg) => {
            console.log("user-event", arg);
            getUsersInRoom()
            getQuestionsInRoom()
            // ...
        });

        socket.on("change-colour", (arg) => {
            console.log('change-colour', arg);
            getUsersInRoom()
            // ...
        });

        return () => {
            socket.close();
        }
    }, [room_id]) // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <>

            <QrCodeModal state={{ show: showQrCodeModal, setShow: setShowQrCodeModal }} url={qrCodeDataUrl} />

            {/* <Navbar /> */}
            <div className='text-center bg-indigo-900 text-white py-6'>
                <div className='flex justify-center'>
                    <div className='flex bg-white text-gray-800 px-10  rounded-lg mr-2'>
                        <div className='my-auto'>
                            <div className='text-sm -mb-1'>
                                Join at <span className='font-bold'>cups.erudiolabs.com!</span>
                            </div>
                            <div className=' font-semibold  '>
                                <div className='-mb-2.5'>
                                    Room Code:
                                </div>
                                <div className='text-4xl font-bold'>
                                    {room_id}
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='transition bg-white hover:bg-gray-200 text-gray-800 rounded-lg'>
                        <div className='p-1 h-full cursor-pointer'
                            data-tippy-content="Expand QR Code"

                            onClick={() => {
                                setShowQrCodeModal(true)
                            }}>
                            <div className='h-full w-24'>
                                <Image src={qrCodeDataUrl} alt="QR Code" width="100%" height="100%" layout="responsive" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-center min-h-screen bg-gray-50">
                <div className="basis-11/12 flex flex-col max-w-6xl text-gray-600 my-auto  pb-28">
                    <div className="flex flex-col justify-center">
                        <div className='mb-10'>
                            {users.length == 0 ? (
                                <>
                                    <div className='text-center'>
                                        <div className='text-3xl font-semibold'>
                                            Waiting for users...

                                        </div>
                                    </div>
                                </>
                            ) :
                                (
                                    <>
                                        <div className='flex w-full justify-between space-x-4 my-10'>
                                            <div className='basis-6/12 text-center'>
                                                {/* {JSON.stringify(users)} */}
                                                <div className='px-2 md:h-[32rem]'>
                                                    <PieChart users={users} />
                                                </div>


                                                <div className='mt-6'>
                                                    <div className=' font-semibold text-xl'>
                                                        Active Users: {users.filter((user) => user.colour).length}

                                                    </div>
                                                    <div className='text-sm text-gray-400'>
                                                        User Count: {users.length}
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='basis-6/12 text-center max-h-full overflow-hidden'>
                                                <div className='text-lg font-semibold mb-4'>
                                                    Questions
                                                </div>

                                                {questions.length > 0 ?
                                                    <>
                                                        {questions.map((question, questionIdx) => (
                                                            <div key={questionIdx} className="py-4 px-6 mb-2 bg-white border border-gray-200 rounded-lg text-left font-semibold text-lg">
                                                                <div className='flex justify-between mb-2'>
                                                                    <div className='text-left text-xs text-gray-600 font-medium my-auto'>
                                                                        Asked by {question.split('#').slice(-1)}
                                                                    </div>
                                                                    <div className='flex font-medium text-xs bg-green-200 text-green-700 px-3 py-1 rounded-lg cursor-pointer'
                                                                        onClick={() => {
                                                                            markQuestion(question)
                                                                        }}>
                                                                        <span className='mr-1.5 '> Mark as Answered </span> <svg xmlns="http://www.w3.org/2000/svg" className=" h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
                                                                </div>

                                                                {question.split('#').slice(0, -1).join(' ')}
                                                            </div>
                                                        )
                                                        )}
                                                    </> : <>
                                                        <div>
                                                            You&apos;ve answered all questions 🎉
                                                        </div>

                                                    </>}


                                            </div>
                                        </div>

                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoomAdmin