import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Socket } from 'socket.io-client'

type AskQuestionProps = {
    socket: Socket
}

const AskQuestion = ({ socket }: AskQuestionProps) => {

    const [content, setContent] = useState('')

    const submit = () => {
        socket.emit('ask-question', {
            content: content
        })

        toast.success('Your question has been sent to your instructor!')
    }

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
                submit()
                setContent('')
            }}>
                <div className='flex w-full space-x-1'>
                    <div className='basis-10/12'>
                        <textarea
                            id="additional-details"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full px-3 py-2.5 "
                            placeholder="Feel free to ask questions to your instructor directly... "
                            rows={3}
                            value={content}
                            required
                            onChange={(e) => { setContent(e.target.value) }}
                        >
                        </textarea>

                    </div>
                    <div className='basis-2/12'>
                        <button
                            className="rounded-lg py-2 px-4 w-full h-full text-white font-semibold bg-gray-700 hover:bg-gray-800"
                            type="submit"
                        >
                            Ask
                        </button>
                    </div>
                </div>
            </form>

        </>
    )
}

export default AskQuestion