import React from 'react'
import Expertcard from './expertcard'
import Serviceform from './serviceform'
import Navbar from '../home/navbar.jsx'
export default function Mainserviceform() {
    return (
        <>
           <Navbar/>

            <div className=' row w-full m-0 justify-center'>
                <Expertcard />
                <div className='  mx-7 ml-2 mr-2 bg-gray-100 w-full lg:mx-auto w-2/2 lg:w-2/3 border-gray-300 border-2 rounded-3xl my-8'>
                    <div className='flex justify-center'><h1 className='text-gray-500 font-medium text-2xl'>Create Your Service</h1></div>
                    
                    <Serviceform />
                </div>
            </div>
        </>
    )
}
