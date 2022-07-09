import React, { Component } from 'react'
import Aboutme from './aboutme'
import Myservices from './myservices'
import Rating from './rating'
import Expertcard from './expertcard'
import { Tab } from '@headlessui/react'

export default class UserInfo extends Component {


    render() {
        return (
            <>

                <div className=' row w-full justify-center m-0 bg-gray-100'>
                    <Expertcard />
                    <div className=' mx-7 mr-1 ml-1 bg-white w-full lg:mx-auto w-2/2 lg:w-2/3 border-white shadow-xl border-2 rounded-3xl my-8'>
                        <div className='md:row object-cover object-center'>
                            <Tab.Group manual>
                                <Tab.List className="flex justify-center mx-auto">
                                    <Tab className={({ selected }) => (selected ? 'font-medium bg-blue-400 text-white rounded px-3 lg:mx-10' : '  text-gray-500 hover:bg-blue-400 hover:text-white px-3 lg:mx-10 rounded')}>ABOUT ME</Tab>
                                    <Tab className={({ selected }) => (selected ? ' font-medium bg-blue-400 text-white rounded px-3 lg:mx-10' : 'text-gray-500 hover:bg-blue-400 hover:text-white px-3 lg:mx-10 rounded')}>SERVICES</Tab>
                                    <Tab className={({ selected }) => (selected ? ' font-medium bg-blue-400 text-white rounded px-3 lg:mx-10' : ' text-gray-500 hover:bg-blue-400 hover:text-white px-3 lg:mx-10 rounded')} >RATINGS</Tab>
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel><Aboutme /></Tab.Panel>
                                    <Tab.Panel><Myservices /></Tab.Panel>
                                    <Tab.Panel><Rating /></Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}