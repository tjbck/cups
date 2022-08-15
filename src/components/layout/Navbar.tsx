import Link from 'next/link'
import React from 'react'
import Logo from '../Logo'

const Navbar = () => {
    return (
        <div className="flex flex-row justify-center w-full bg-white">
            <div className="basis-10/12 md:basis-9/12 max-w-7xl">
                <div className='flex justify-between py-3.5'>
                    <div>

                        <Logo />
                    </div>

                    {/* <div className="flex flex-row items-center ml-auto text-center">
                        <div className="hidden md:flex mx-2 md:mx-5">
                            <Link href='/rooms/create'>
                                <a>

                                    <span className="text-bold text-sm font-semibold text-gray-500 hover:text-gray-600"
                                    >Create Room</span>
                                </a>
                            </Link>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Navbar