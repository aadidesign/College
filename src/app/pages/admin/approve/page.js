import React from 'react'
import Navbar from 'root/components/navbar'
import Sidebar from 'root/components/home/sidebar'
import DocumentFormat from './letter'

const page = () => {
    return (
        <div className='bg-white'>
            <Navbar />
            {/* <Sidebar /> */}
            <DocumentFormat />
        </div>
    )
}

export default page