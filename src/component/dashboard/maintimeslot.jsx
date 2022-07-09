import React from 'react'
import Expertcard from './expertcard'
import Timeslot from './timeslot'
import Navbar from '../home/navbar'
export default function Maintimeform() {
    return (
        <>
              <Navbar/>
            <div className=' row w-full m-0 justify-center bg-gray-100'>
                <Expertcard />
                <div className=' mx-7 ml-2 mr-2 w-full lg:mx-auto w-2/2 lg:w-2/3 shadow-2xl border-2 rounded-3xl my-8 bg-white'>
                    <div className='flex justify-center'><h1 className='text-gray-500 font-medium text-2xl '>Create Your Time Slots</h1></div>
                        <Timeslot/>
                </div>
            </div>
        </>
    )
}
