import React, { useState} from 'react'
import Servicecard from './servicecard'
import Servicedetail from './servicedetail'
import { Tab } from '@headlessui/react'

import Navbar from '../home/navbar'
export default function Serviceinfo() {
   
    return (

        <>
        

            <Navbar />

            <div className=' row w-full justify-center m-0 bg-gray-100'>
                <Servicecard />

                <div className=' ml-1 mr-1 mx-7 bg-white w-full lg:mx-auto w-2/2 lg:w-2/3  shadow-2xl border-2 rounded-3xl my-8'>
                    <div className='md:row w-full  object-cover object-center m-0'>
                        <Tab.Group manual>

                            <Tab.List className=" mt-2 flex justify-center  ">
                                <Tab className={({ selected }) => (selected ? 'font-medium bg-blue-500 text-white rounded px-5 lg:mx-10' : '  text-gray-500 hover:bg-blue-400 hover:text-white px-6 lg:mx-10 rounded')}>Service Detail</Tab>
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel><Servicedetail /></Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>

            </div>
        </>
    )

}
