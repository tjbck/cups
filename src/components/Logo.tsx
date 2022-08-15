import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


import favicon from '../assets/images/favicon.png'

const Logo = () => {
    return (
        <Link href="/">
            <a>
                <div className="flex min-w-fit">
                    <div className="mr-1 -mt-0.5 self-center w-7">
                        <Image src={favicon} layout="responsive" alt="cup" />
                    </div>

                    <div className=" font-bold text-xl text-gray-500 hover:text-gray-600">Fastcups</div>
                </div>
            </a>

        </Link>

    )
}

export default Logo