import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react'
import CardSkeleton from '../home/cardskeleton';

export default function Expertcard() {
    const { id } = useParams();
    const [Name, setName] = useState("");
    const [title, settitle] = useState("");
    const [rating, setrating] = useState("");
    const [imgsrc, setimgsrc] = useState("");
    const [experience, setexperience] = useState("");
    const [education,seteducation] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const [load,setload] = useState('')



    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const getExpert = async () => {
        setload('loading')
        await axios.get(`/user/expert/${id}/`).then((resp) => {

            setimgsrc(`${resp.data.expert_profile?.personal_detail[0]?.profile_img ===''?`https://ui-avatars.com/api/?name=${resp.data.expert_profile?.personal_detail[0]?.first_name}+${resp.data.expert_profile?.personal_detail[0]?.last_name}`:resp.data.expert_profile?.personal_detail[0]?.profile_img}`)
            setName(`${resp.data.expert_profile?.personal_detail[0]?.first_name} ${resp.data.expert_profile?.personal_detail[0]?.last_name}`)
            settitle(resp.data.expert_profile?.personal_detail[0]?.title)
            setexperience(` ${resp.data.expert_profile?.personal_detail[0]?.experience} yrs`)
            seteducation(resp.data.expert_profile?.personal_detail[0]?.education)
            setrating(`${resp.data.expert_profile?.ratings?.avg}(${resp.data.expert_profile?.ratings?.reviews})`)
            setload('')


        })
    }



    useEffect(() => {
        getExpert();

    }, [])







    return (
        <>


            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    //as="div"
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
                                    Education and Experience
                                </Dialog.Title>
                                <div className="mt-4">

                                    <div className=' text-base text-justify'>
                                        <div className='.container object-cover row mx-auto w-auto'>
                                            <h2 className='object-left font-semibold text-gray-600 mx-auto'>EDUCATION</h2>
                                            <h2 className='object-right font-semibold text-gray-600 mx-auto'>EXPERIENCE</h2>
                                        </div>
                                        <div className='container w-auto row mt-2'>

                                            <h1 className='font-bold  text-gray-500 row mx-auto px-3 '>{education}</h1>

                                            <h1 className='font-medium   text-gray-500 row mx-auto px-4'> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>{experience}</h1>
                                        </div>
                                    </div>



                                </div>

                                <div className="mt-4">

                                    <button
                                        type="button"
                                        className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >

                                        OK
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            {
            load === 'loading'?<CardSkeleton/>:
            <div className="lg:w-1/4 md:w-1/2 p-3 border-white border-2 bg-white shadow-xl text-center border-r-20 rounded-3xl w-full ml-10 mr-10 mb-10 mt-8">
                <a className="block h-48 rounded overflow-y">
                    <img alt="Expert" className="object-cover object-center w-40 h-40 rounded-full mx-auto " src={imgsrc} />
                </a>
                <div className=" container object-center -mt-2">
                    <h3 className="text-gray-900 title-font text-lg font-bold capitalize">{Name}</h3>
                    <div className='container mx-auto row mt-2  text-gray-400 text-center'>
                        <h1 className='-mt-1 mx-auto row'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 left-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>India</h1>

                    </div>
                    <div className='my-4'>
                        <h2 className="text-gray-500 title-font text-sm font-medium "> {title} </h2>
                    </div>
                    <div className='.container object-cover row mx-auto w-auto'>
                        <h2 className='object-left font-semibold text-gray-400 mx-auto'>RATINGS</h2>
                        <h2 className='object-right font-semibold text-gray-400 mx-auto'>EXPERIENCE</h2>
                    </div>
                    <div className='container w-auto row mt-2'>

                        <h1 className='font-bold text-yellow-400 row mx-auto '><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 " viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>{rating}</h1>

                        <h1 className='font-medium   text-gray-400 row mx-auto px-3'> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>{experience}</h1>
                    </div>

                    <div className='mt-3 object-center'>
                        <button className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center'
                            onClick={openModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <span>View 2E's</span>
                        </button>
                    </div>
                </div>
            </div>
            }



        </>


    )
}
