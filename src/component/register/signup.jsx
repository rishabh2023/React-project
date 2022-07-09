import React from 'react'
import { Tab } from '@headlessui/react'
import Email from './email'
import Mobile from './mobile'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
export default function Signup(){

  const history = useHistory();
  useEffect(()=>{
    if(localStorage.getItem('access_token')){
      history.push('/')
    }
  })
    return (
      <>
     
        <div className=' bg-blue-700 h-screen flex flex-col items-start text-gray-900 antialiased relative'>
          <div className='container flex flex-col my-auto items-center bg-cover bg-blue-700'>
          <h1 className=' mt-1 text-3xl text-white mb-4'>UltraXpert</h1>
            <div className=' lg:px-6 w-auto mt-2 bg-white shadow-md border-gray-300 border-2 text-center rounded-xl  mb-8  mx-auto items-center'>
              <div className=''>
                <h1 className='text-blue-700 text-xl font-semibold mb-3 mt-3'>Register in UltraXpert with</h1>
              </div>
              <div className='md:row object-cover object-center'>
                <Tab.Group manual>
                  <Tab.List className="row-span m-auto lg:m-4 ">
                    <Tab className={({ selected }) => (selected ? 'font-lg bg-blue-500 text-white rounded px-3 py-1 mx-4' : '  text-gray-500 hover:bg-blue-400 hover:text-white px-3  rounded py-1 mx-4')}>Email</Tab>
                    {/* <Tab className={({ selected }) => (selected ? ' font-lg bg-blue-500 text-white rounded px-3 py-1 mx-4' : 'text-gray-500 hover:bg-blue-400 hover:text-white px-3 rounded py-1 mx-4')}>Mobile</Tab> */}
                    
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel><Email/></Tab.Panel>
                    <Tab.Panel><Mobile/></Tab.Panel>
  
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
       
      </>
    )
  
}
