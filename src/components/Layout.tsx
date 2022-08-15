import type { Children } from 'react'
import React from 'react'
import Footer from './layout/Footer'
import Navbar from './layout/Navbar'


type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <>
            {/* <Navbar /> */}

            <div className='min-h-screen'>
                {children}
            </div>

            <Footer />

        </>
    )
}

export default Layout