import axios from 'axios';
import React, { useState , Fragment } from 'react'
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { EmailShareButton, EmailIcon, FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, TelegramShareButton, TelegramIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
import { Dialog, Transition, Tab } from '@headlessui/react'
import ProfileSkeleton from '../profile/profile_skeleton';

export default function Service_Card() {
    const { id } = useParams();
    const history = useHistory();
    const [loader,setloader] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [title, settile] = useState("")
    const [url, seturl] = useState("")
    const [name, setname] = useState("")
  
    const [servicelst, setservicelst] = useState([])

 

    const GetData = async () => {
        setloader('loading')
        await axios.get(`search/es_service/?search=${id}`).then((res) => {
          
            const data = res.data
            console.log(data)
            setservicelst(data)
            setloader('')



        })
    }

    useEffect(()=>{
        GetData()
    },[id])

    function closeModal() {
        setIsOpen(false)
      }
    
    return (
        <>

        
<Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-900"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Share via
                                </Dialog.Title>
                                <div className="flex mt-2 ">
                                    <div className='mx-auto'>
                                        <button className='justify-between mx-2'><EmailIcon size={32} round={true} /></button>
                                        <button className='justify-between mx-2'><FacebookIcon size={32} round={true} /></button>
                                        <button className='justify-between mx-2'><LinkedinIcon size={32} round={true} /></button>
                                        <button className='justify-between mx-2'><TelegramIcon size={32} round={true} /></button>

                                        <WhatsappShareButton
                                            url={url}
                                            title={`Hello,\n${name} is providing *${title}* service`}
                                            separator=" on the given link so please first book your suitable slot because slots are limited "
                                            className="justify-between mx-2"
                                        >  <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>

                                    </div>



                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            
             {
               loader === 'loading' ? <ProfileSkeleton /> : servicelst.length === 0 ? <p className='text-center mt-6  font-semibold text-red-600'>Opps Sorry! No such services found once check in expert.</p> : 
               servicelst.map((value) => (
            <div className="flex justify-center top-1/3 mt-2">
                <div className=" grid grid-cols-1 gap-4 p-4 mb-2 border-2 rounded-2xl bg-white shadow-lg w-full lg:w-1/2" >
                    <div className=" flex gap-4" 
                    onClick={()=>{
                        history.push(`/service/${value.service_id}`)
                    }}>
                        <img src={value.service_img === '' ? `https://ui-avatars.com/api/?name=${value.service_name}` : value.service_img} className="rounded-lg -top-8 -mb-4 bg-white border h-16 w-16" alt="" />
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
                            onClick={() => { history.push(`/service/${value.service_id}`) }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <span>View Details</span>
                        </button>
                        <button className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded inline-flex float-right'
                          onClick={() => {
                          
                            settile(value.service_name)
                            seturl(`${process.env.REACT_APP_BASE_FRONT_URL}/service/${value.service_id}`)

                            setIsOpen(true)

                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                            </svg>
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>
             ))}
        </>
    )
}
