import React, { useState,Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Expertcard from './expertcard';
import Navbar from '../home/navbar.jsx';
import { useHistory } from 'react-router';
import axiosInstance from '../../utils/AxiosInstance'
import { useEffect } from 'react';
import ProfileSkeleton from '../profile/profile_skeleton';


export default function Mytransaction() {
    let [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const [price,setprice] = useState("")
    const [transactions,settransactions] = useState([])
    const [loading,setloading] = useState("")


    const getWalletdata = async() =>{
        setloading('loading')
        await axiosInstance.get('/vault/').then((res)=>{
            //console.log(res.data)
            setprice(res.data.amount_paid)
            setloading("")

        }).catch((err)=>{
            setIsOpen(true)
        })
    }


    const getTransaction = async() =>{
        setloading('loading')
        await axiosInstance.get('/activity/transaction/').then((res) =>{
           
            settransactions(res.data)
            setloading('')
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
            getWalletdata();
            getTransaction();
    },[])
    
    function closeModal() {
        setIsOpen(false)
        history.push('/dashboard/add/details')

       
    }

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
                                    Failed to load Wallet
                                </Dialog.Title>
                                <div className="mt-2">

                                    <div className='text-red-600 text-base text-justify'>
                                        Your money will not reflect and settle into your account please active your wallet!

                                    </div>



                                </div>

                                <div className="mt-4">

                                    <button
                                        type="button"
                                        className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >

                                        Activate Now
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

        <Navbar/>
            <div className=' row w-full m-0 justify-center'>
                <Expertcard/>
                <div className='mx-7 ml-2 mr-2 bg-gray-100 w-full lg:mx-auto w-2/2 lg:w-2/3 border-gray-300 border-2 rounded-3xl my-8'>
                    <div className='flex justify-center'><h1 className='text-gray-500 font-medium text-2xl'>My Wallet</h1></div>
                    <div className='floar-left ml-2 mt-4 '><h1 className='text-gray-800 font-medium text-md'>Wallet Balance:₹{price}</h1></div>

                    <div className='bg-gray-100 w-full h-96 lg:mx-auto w-2/2 lg:w-3/3 overflow-y-auto rounded-3xl mt-2'>
                    {loading === 'loading' ? <ProfileSkeleton /> : transactions.length === 0 ? <p className='text-center mt-6  font-semibold text-red-600'>opps! No transactions found</p> :
                        transactions.map((value)=>(

                        
                        <div className="flex justify-center top-1/3 mt-2 ">
                            <div className=" grid grid-cols-1  p-2 mb-4 border-2 rounded-xl bg-white w-full mx-2 ">
                                <div className=" flex gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-row justify-between">
                                            <p className="text-gray-900 title-font text-sm font-bold">Recived For Class of</p>
                                            <h1 className='float-right text-xl font-bold text-green-600 mr-2'>+₹{value.price}</h1>

                                        </div>
                                        <p className="text-gray-400 text-sm ">
                                            <div className='.container object-cover row mx-auto w-auto float-left'>
                                                <h2 className='object-left font-semibold text-gray-400 mx-2 '>{value.service_obj.service_name}</h2>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                                <div className='mt-2 mb-1'>
                                <p className="float-left font-semibold text-gray-500 text-sm"> Meet Date</p>
                                <p className="float-right font-semibold text-gray-500 text-sm"> Time Slot</p>
                                </div>

                                <div>
                                <p className='float-left text-blue-600 justify-center text-sm  font-semibold '>{value.slot.schedule.day}</p>
                                <p className='float-right text-sm text-blue-600 justify-center  font-semibold'> {Number(`${value.slot.start_time[0]}${value.slot.start_time[1]}`) >= 12 ? `${value.slot.start_time}-${value.slot.end_time} P.M` : `${value.slot.start_time}-${value.slot.end_time} A.M`}</p>
                                </div>

                                <div>
                                <p className='float-left text-gray-400 justify-center text-xs text-justify font-semibold mt-2'>Client ID: {value.user.user_id}</p>   
                                <p className='float-right text-gray-400 justify-center text-xs text-justify font-semibold mt-2'>{value.order_created}</p>
                                    
                                </div>
                            </div>
                        </div>
                        ))}
{/*                         
                        <div className="flex justify-center top-1/3 mt-4 ">
                            <div className=" grid grid-cols-1 gap-4 p-2 mb-8 border-2 rounded-xl bg-white w-full mx-2 ">
                                <div className=" flex gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-row justify-between">
                                            <p className="text-gray-900 title-font text-sm font-bold">Sended to</p>
                                            <h1 className='float-right text-xl font-bold text-red-600 mr-2'>-₹450</h1>

                                        </div>
                                        <p className="text-gray-400 text-sm ">
                                            <div className='.container object-cover row mx-auto w-auto'>
                                                <h2 className='object-left font-semibold text-gray-400 mx-2 '>RAM</h2>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                                <p className="object-left font-semibold text-gray-600"> 28 Dec 2021 10:39pm</p>

                                <p className='text-sm text-red-600 justify-center ml-2 mt-1 text-justify mr-2'></p>

                            </div>
                        </div> */}






                    </div>
                </div>
            </div>
        </>
    )
}
