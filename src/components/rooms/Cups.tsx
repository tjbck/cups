import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Socket } from "socket.io-client";

import smilingEmoji from '../../assets/images/smiling.png'
import thinkingEmoji from '../../assets/images/thinking.png'
import pensiveEmoji from '../../assets/images/pensive.png'
import wavingEmoji from '../../assets/images/waving.png'


type CupsProps = {
    state: {
        colour: string
        setColour: React.Dispatch<React.SetStateAction<string>>
    }
    socket: Socket
    roomId: string
}

const Cups = ({ state: { colour, setColour }, socket, roomId }: CupsProps) => {
    return (
        <>
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

                <div className='mt-3 text-xs text-gray-500'>room: {roomId} sid: {socket.id}</div>
            </div></>
    )
}

export default Cups