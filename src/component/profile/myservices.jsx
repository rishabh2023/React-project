import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import axios from 'axios';
import { useState, Fragment } from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react'
import { EmailShareButton, EmailIcon, FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, TelegramShareButton, TelegramIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
import ProfileSkeleton from './profile_skeleton';
import Spinner from '../authentication/spinner';
import axiosInstance from '../../utils/AxiosInstance';
import EmailAuth from '../service_details/emailauth';
import MobileAuth from '../service_details/mobileauth';




export default function Myservices() {
    const { id } = useParams();
    const [services, setservices] = useState([])
    const [loading, setloading] = useState('loading')
    const [isOpen, setIsOpen] = useState(false)
    const [isBook, setIsBook] = useState(false)
    const [title, settile] = useState("")
    const [url, seturl] = useState("")
    const [name, setname] = useState("")
    const [img, setimg] = useState("")
    const [dates, set_dates] = useState([])
    const [loader, setloader] = useState("");
    const [orderid, setorderid] = useState("");
    const [all_slot, setall_slot] = useState({})
    const [slot, setslot] = useState([])
    const [selectedid, setselectedid] = useState('')
    const [service_id, setservice_id] = useState('')
    const [expert_id, set_expertid] = useState('')
    const [price, setprice] = useState('')
    const [bookloader, setbookloader] = useState("")
    let [isLogin, setIsLogin] = useState(false)



    const history = useHistory();

    function closeLogin() {
        setIsLogin(false)
      }

    const getMyService = async () => {


        await axios.get(`/user/expert/${id}/`).then((resp) => {


            const data = resp.data.expert_profile.sevices
            setservices(data)
            setloading('')
            setname(`${resp.data.expert_profile.personal_detail[0].first_name + ' ' + resp.data.expert_profile.personal_detail[0].last_name}`)



        })
    }





    useEffect(() => {

        getMyService();

    }, [])


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
       
        setIsOpen(true)
    }
    function closeBookModal() {
        setloader('')
        setIsBook(false)
    }




    const OpenEvent = async () => {
        setbookloader("loading")



        await axios.get(`/events/get_event/${sessionStorage.getItem("service_id")}/`).then((resp) => {



            var ddata = resp.data.slots
            ddata = ddata === undefined ? {} : ddata
            const dates = Object.keys(ddata)
            setall_slot(ddata === {} ? '' : ddata)
            set_dates(dates)

            if  (!localStorage.getItem('access_token')){
                 setIsLogin(true) 
            }else{
                setIsBook(true)
            }

            





        })

    }








    const handleDates = (e) => {



        setslot(all_slot[e])
        //console.log(all_slot[e])


    }
    //console.log(all_slot[selecteddate])
    //console.log(all_slot)

    const handleSlots = (e) => {
        setselectedid(e)
        //console.log(e)
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }


    const BookSlot = async () => {


        setloader('loading')
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        )

        const resp = await axiosInstance.post(`/activity/book_service/${sessionStorage.getItem('service_id')}/`, { event_id: selectedid })

        setorderid(resp.data.order_id)

        if (resp.status === 200) {
            await axiosInstance.post(`/payments/order_create/${resp.data.order_id}/`).then((pay) => {
                setIsBook(false)
                setloader('')
                const options = {
                    "key": process.env.REACT_APP_RAZOR_PAY_KEY,
                    "amount": `${Number(price) * 100}`,
                    "currency": "INR",
                    "name": "UltraXpert",
                    "description": "Pay for a Slot",
                    "image": `${process.env.REACT_APP_RAZOR_PAY_LOGO}`,
                    "order_id": `${pay.data.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler": async function (response) {
                        await axios.post(`/events/slot/`, { "payment_id": response.razorpay_payment_id, "slot_id": selectedid }).then((slot) => {
                            const rep = axiosInstance.patch(`activity/order_status/${resp.data.order_id}/`, { 'status': 'booked' })
                            const res = axiosInstance.post(`/meet/`, { 'service_id': `${service_id}`, "slot_id": selectedid, "expert_id": id })
                            const res1 = axiosInstance.post(`/events/event_disable/`,{'expert_id':id,"slot_id":selectedid})
                            history.push('/meet')
                        }).catch((err) => {

                            console.log(err)
                        })

                    },
                    "prefill": {
                        "name": "",
                        "email": "",
                        "contact": ""
                    },
                    "notes": {
                        "address": ""
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };

                var rzp = new window.Razorpay(options);
                rzp.open();

            })

        }
    }


    function openBookModal() {

        OpenEvent();






    }




    return (
        <>
         <Transition appear show={isLogin} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeLogin}
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
                  className="text-lg font-medium leading-6 text-red-500"
                >
                  Login Required
                </Dialog.Title>



                <Tab.Group manual>
                  <Tab.List className="flex justify-center mx-auto mt-3 ">
                    <Tab className={({ selected }) => (selected ? 'font-lg bg-blue-500 text-white rounded px-3 py-1 mx-1' : '  text-gray-500 hover:bg-blue-400 hover:text-white px-3  rounded py-1')}>Email</Tab>
                    <Tab className={({ selected }) => (selected ? ' font-lg bg-blue-500 text-white rounded px-3 py-1 mx-1' : 'text-gray-500 hover:bg-blue-400 hover:text-white px-3 rounded py-1')}>Mobile</Tab>

                  </Tab.List>
                  <Tab.Panels>

                    <Tab.Panel><EmailAuth /></Tab.Panel>
                    <Tab.Panel><MobileAuth /></Tab.Panel>

                  </Tab.Panels>
                </Tab.Group>




              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

            <Transition appear show={isBook} as={Fragment}>

                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeBookModal}
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
                                    Confirm Booking
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className=" container text-gray-600 flex justify-between">
                                        <h1 className='float-left  mx-auto'>Date</h1>
                                        <h1 className='float-right mx-auto'>Slot</h1>
                                    </div>
                                    <div className='container flex mx-auto justify-between'>
                                        <div className='float-left mx-auto'>


                                            <select className="block appearance-none  w-auto  pl-2 lg:ml-5 mt-2  bg-blue-500 border border-gray-200 text-white py-1 lg:px-4 lg:pr-8 rounded-lg leading-tight focus:outline-none focus:bg-blue-400 focus:border-gray-500" id="grid-state"
                                                onChange={(e) => handleDates(e.target.value)}>
                                                <option selected disabled hidden>
                                                    Date
                                                </option>
                                                {dates.map((values) => (
                                                    <option value={values}>{values}</option>
                                                ))}


                                            </select>
                                        </div>
                                        <div className='float-right'>
                                            <select className="  block appearance-none w-auto pr-2 pl-2  mt-2   bg-blue-500 border border-gray-200 text-white py-1 lg:px-4 lg:pr-8 rounded-lg leading-tight focus:outline-none focus:bg-blue-400 focus:border-gray-500" id="grid-state"
                                                onChange={(e) => handleSlots(e.target.value)}
                                            >
                                                <option selected disabled hidden>
                                                    Slots
                                                </option>

                                                {slot !== undefined ? slot.map((values) => (
                                                    <option value={values.id}> {Number(`${values.start_time[0]}${values.start_time[1]}`) >= 12 ? `${values.start_time}-${values.end_time} P.M` : `${values.start_time}-${values.end_time} A.M`}</option>
                                                )) : ""}


                                            </select>
                                        </div>
                                    </div>



                                </div>

                                <div className="container mt-3">
                                    {loader === 'loading' ? <Spinner /> :
                                        <button
                                            type="button"
                                            className="px-2 py-1 text-sm float-right font-medium text-white bg-blue-800 border border-transparent rounded-xl hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={BookSlot}

                                        >

                                            Pay ₹{price} To Book Slot
                                        </button>}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>


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

            <div className="mx-6  lg:mx-auto h-96 overflow-y-auto scrollbar-hide lg:w-2/3 border-gray-300 border-2  rounded-3xl my-10">
                {loading === 'loading' ? <ProfileSkeleton /> : services.length === 0 ? <p className='text-center mt-6  font-semibold text-red-600'>opps! no active services found</p> :
                    services.map((value) => (
                        <div className="flex justify-center top-1/3 mt-3">
                            <div className="-py-2 bg-white shadow-lg overflow-x-hidden mx-1 grid grid-cols-1 gap-4 w-full    rounded-xl  lg:w-full md:mx-4">
                                <div className=" flex gap-4 bg-white ">
                                    <img src={value.service_img === '' ? `https://ui-avatars.com/api/?name=${value.service_name}` : value.service_img} className="rounded-xl -top-8 -mb-4 mt-1 ml-1 bg-white border h-12 w-12 " alt="" />
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-row justify-between">
                                            <p className="text-gray-900 text-sm mt-2 font-semibold text-justify capitalize text-ellipsis overflow-hidden ..." onClick={() => {
                                                history.push(`/service/${value.service_id}`)
                                            }}>{value.service_name}</p>

                                        </div>
                                        <p className="text-gray-400 text-sm mt-2">
                                            <div className='.container object-cover row mx-auto w-auto'>
                                                <h2 className='object-left font-semibold text-sm text-gray-500 '>Created on {value.date_created}</h2>

                                            </div>

                                        </p>
                                    </div>
                                </div>
                                <div className='ml-1 mr-1 mb-1 mt-1 bg-white'>


                                    <button className='  bg-green-400 hover:bg-green-500 text-white font-medium py-1 px-2 ml-1 rounded inline-flex float-left object-cover object-center'
                                        onClick={() => {
                                            sessionStorage.setItem('service_id', value.service_id)
                                            sessionStorage.setItem('price', value.price)


                                            console.log(sessionStorage.getItem('service_id'))
                                            setprice(value.price)
                                            OpenEvent();



                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                        Book
                                    </button>

                                    <button className='bg-blue-600 hover:bg-blue-500 text-white font-medium py-1 px-2 mr-1 rounded inline-flex float-right object-cover object-center mb-2'
                                        onClick={() => {
                                            setimg(value.service_img)
                                            settile(value.service_name)
                                            seturl(`${process.env.REACT_APP_URL}/service/${value.service_id}`)

                                            setIsOpen(true)

                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                        </svg>
                                        Share
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}



            </div>
        </>

    )




}
