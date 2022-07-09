import React, { useEffect, useState } from 'react'
import Navbar from '../home/navbar'
import { useParams,useHistory } from 'react-router';
import { Tab } from '@headlessui/react'
import axios from 'axios';
import Service_Card from './service_data_card';
import Expert_Card from './expert_data_card';
export default function Results() {
    const { id } = useParams();
    const [expert_data, setexpert_data] = useState('')
    const [service_data, setservice_data] = useState('')
    const [servicelst, setservicelst] = useState([])
    const [expertlst, setexpertlst] = useState([])
    const [notfound,setnotfound] = useState('')
    const history = useHistory()

    // const GetData = async () => {
    //     await axios.get(`search/es_expert/?search=${id}`).then((res) => {
          
    //         const data = res.data
    //         if (data.length !== 0) {
              
    //             setexpert_data('true')
               
    //             setexpertlst(data)
                

    //         }
            
    //         else {
    //             setexpert_data('')
               
    //         }



    //     })

    //     await axios.get(`/search/es_service/?search=${id}`).then((res) => {
          
    //         const data = res.data
           
    //         if (data.data !== 'Not Found!') {
             
    //             setservice_data('true')
              
    //             setservicelst(data)

                

    //         } else {
    //             setservice_data('')
                
    //         }


    //     })

    //     if ((service_data === '' && expert_data === '')){
           
    //         setnotfound('')
    //     }

   
        
    // }

    // useEffect(() => {
       
    //     GetData();

    // }, [id])


    return (
        <>
          
            <Navbar />
            <h1 className='text-gray-700 text-md pt-2 pb-1 font-semibold mx-1 shadow-md border-b-2 border-gray-100'>Results for <q className='text-[#b45309]'>{id}</q> </h1>
            
            <div className='md:row object-cover object-center mt-3'>
                            <Tab.Group manual>
                                <Tab.List className="flex justify-center mx-auto">
                                    <Tab className={({ selected }) => (selected ? 'font-medium bg-blue-400 text-white rounded px-3 lg:mx-10' : '  text-gray-500 hover:bg-blue-400 hover:text-white px-3 lg:mx-10 rounded')}>SERVICES</Tab>
                                    <Tab className={({ selected }) => (selected ? ' font-medium bg-blue-400 text-white rounded px-3 lg:mx-10' : 'text-gray-500 hover:bg-blue-400 hover:text-white px-3 lg:mx-10 rounded')}>EXPERTS</Tab>
                                    
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel><Service_Card/></Tab.Panel>
                                    <Tab.Panel><Expert_Card /></Tab.Panel>
                                   
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
            
            {/* {(expert_data === 'true') ?


                expertlst.map((value) => (
                    

                    <div className="flex justify-center top-1/3 mt-4">
                        <div className=" grid grid-cols-1 gap-4 p-4 mb-2 border-2 rounded-2xl bg-white shadow-lg w-full lg:w-1/2" >
                            <div className=" flex gap-4">
                                <img src={value.profile_img === '' ? `https://ui-avatars.com/api/?name=${value.first_name}+${value.last_name}` : value.profile_img} className="rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="Loading..." />
                                <div className="flex flex-col w-full">
                                    <div className="flex flex-row justify-between">
                                        <p className="whitespace-nowrap truncate overflow-hidden text-gray-900 title-font text-lg font-bold capitalize">{`${value.first_name} ${value.last_name}`}</p>
                                        <a className="text-gray-500 text-xl" href="#"><i className="fa-solid fa-trash"></i></a>
                                    </div>
                                    <p className="text-gray-400 text-sm mt-2">
                                        <div className='.container object-cover row mx-auto w-auto'>
                                            <h2 className='object-left font-semibold text-gray-400 '>RATINGS</h2>
                                            <h2 className='object-right font-semibold text-gray-400 mx-auto'>Experience</h2>
                                        </div>
                                        <div className='container w-auto row mt-2'>

                                            <h1 className='font-bold text-yellow-400 row mx-2'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 " viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>{`${value.ratings?.avg}(${value.ratings?.reviews})`}</h1>

                                            <h1 className='font-medium  text-gray-400 row mx-auto px-3'> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg> {value.experience}yrs</h1>
                                        </div>
                                    </p>
                                </div>
                            </div>
                            <p className="-mt-2  text-gray-500 title-font text-sm font-medium ">{value.expert_profile?.personal_detail[0]?.title}</p>
                            <div className='mt-1 justify-items-center'>

                                <button className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-8 rounded inline-flex float-none'
                                    onClick={()=>{history.push(`/profile/${value.user_id}`)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                    <span>View Full</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )
                )

       
            
                :
              

                servicelst.map((value) => (
                  
                    <div className="flex justify-center top-1/3 mt-2">
                        <div className=" grid grid-cols-1 gap-4 p-4 mb-2 border-2 rounded-2xl bg-white shadow-lg w-full lg:w-1/2" >
                            <div className=" flex gap-4" >
                                <img src={value.service_img===''?`https://ui-avatars.com/api/?name=${value.service_name}`:value.service_img} className="rounded-lg -top-8 -mb-4 bg-white border h-16 w-16" alt="" />
                                <div className="flex flex-col w-full">
                                    <div className="flex flex-row justify-between">
                                        <p className="text-gray-900 title-font text-sm font-bold text-justify capitalize"
                                      >{value.service_name}</p>
                                        
                                    </div>
                                    <p className="text-gray-400 text-sm mt-2">
                                        <div className='.container object-cover row mx-auto w-auto'>
                                            <h2 className='object-left font-semibold text-gray-500 '>Service Created on {value.date_created}</h2>
                                            
                                        </div>
                                      
                                    </p>
                                </div>
                            </div>
                          
                            <div className='mt-2'>
                                <button className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded inline-flex float-left object-center'
                                onClick={()=>{history.push(`/service/${value.service_id}`)}}
                               >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                    <span>View Details</span>
                                </button>
                                <button className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded inline-flex float-right'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                    </svg>
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))} */}
                  

    {/* <h1 className='text-center font-semibold text-red-600'>{notfound}</h1> */}






        </>
    )
}
