import React, { Component } from 'react'
import { Tab } from '@headlessui/react'
import Email from './email'
import Mobile from './mobile'
import EmailPass from './emailpass'
import Mobilepass from './mobilepass'
export default class Login extends Component {
  render() {
    return (
      <>
        <div className=' bg-blue-700 flex flex-col items-start text-gray-900 antialiased relative'>
          <div className='container flex flex-col h-screen my-auto items-center bg-cover'>
            <h1 className=' mt-8 text-5xl text-white mb-4'>UltraXpert</h1>
            <div className=' lg:px-6 w-auto  bg-white shadow-md border-gray-300 border-2 text-center rounded-xl  mb-10  mx-auto items-center'>
              <div className=''>
                <h1 className='text-blue-700 text-xl font-semibold mb-4 mt-4'>Reset your account password</h1>
              </div>
              <div className='md:row object-cover object-center'>
                <Tab.Group manual>
                  <Tab.List className="row-span m-auto lg:m-4 ">
                    <Tab className={({ selected }) => (selected ? 'font-lg bg-blue-500 text-white rounded px-3 py-1' : '  text-gray-500 hover:bg-blue-400 hover:text-white px-3  rounded py-1')}>Reset with Email</Tab>
                    {/* <Tab className={({ selected }) => (selected ? ' font-lg bg-blue-500 text-white rounded px-3 py-1' : 'text-gray-500 hover:bg-blue-400 hover:text-white px-3 rounded py-1')}>Reset with Mobile</Tab> */}
                    
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel><EmailPass/></Tab.Panel>
                    <Tab.Panel><Mobilepass/></Tab.Panel>
  
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
