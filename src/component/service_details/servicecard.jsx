import { Dialog, Transition, Tab } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import axiosInstance from '../../utils/AxiosInstance';
import Spinner from '../authentication/spinner';
import Email from '../authentication/email';
import Mobile from "../authentication/mobile";
import EmailAuth from './emailauth';
import MobileAuth from './mobileauth';
import PageNotFound from '../pages/pageNotFound';

function Servicecard() {
  const { id } = useParams();
  const [title, settitle] = useState("")
  const [created_date, setcreated_date] = useState("")
  const [expertid, set_expertid] = useState("")
  const [img, setimg] = useState("")
  const [user, setuser] = useState("")
  const [price, setprice] = useState('')
  let [isOpen, setIsOpen] = useState(false)
  let [isLogin, setIsLogin] = useState(false)
  const [dates, set_dates] = useState([])
  const [loader, setloader] = useState("");
  const [orderid, setorderid] = useState("");
  const [all_slot, setall_slot] = useState({})
  const [slot, setslot] = useState([])
  const [selectedid, setselectedid] = useState('')
  const [notfound,setnotfound] = useState(false)
  const history = useHistory();
  sessionStorage.setItem('service_id', id)






  let [login, setlogin] = useState("")







  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    (!localStorage.getItem('access_token')) ? setIsLogin(true) :

      setIsOpen(true)
  }

  function closeLogin() {
    setlogin("")
    setIsLogin(false)
  }



  const getService = async () => {
    await axios.get(`/user/service_detail/${id}/`).then((resp) => {
     

      


      set_expertid(resp.data.user.user_id)
      setimg(`${resp.data.service_img === '' ? `https://ui-avatars.com/api/?name=${resp.data.service_name}` : resp.data.service_img}`)
      settitle(`${resp.data.service_name}`)
      setcreated_date(`${resp.data.date_created}`)
      setuser(resp.data.user.user_id)
      setprice(resp.data.price)




    }).catch((err)=>{
    
        setnotfound(true)
     
    })
  }



  useEffect(() => {
    getService();
    OpenEvent();

  }, [])


  const OpenEvent = async () => {

    await axios.get(`/events/get_event/${id}/`).then((resp) => {

      var ddata = resp.data.slots
      ddata = ddata === undefined ? {} : ddata
      const dates = Object.keys(ddata)
      setall_slot(ddata === {} ? '' : ddata)
      set_dates(dates)



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

    const resp = await axiosInstance.post(`/activity/book_service/${id}/`, { event_id: selectedid })

    setorderid(resp.data.order_id)

    if (resp.status === 200) {
      await axiosInstance.post(`/payments/order_create/${resp.data.order_id}/`).then((pay) => {
        setIsOpen(false)
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
              const res = axiosInstance.post(`/meet/`, { 'service_id': `${id}`, "slot_id": selectedid, "expert_id": expertid })
              const res1 = axiosInstance.post(`/events/event_disable/`,{'expert_id':expertid,"slot_id":selectedid})
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

      {notfound === true?<PageNotFound/>:
      <div className="lg:w-1/4 md:w-1/2 p-3 shadow-2xl border-2 bg-white text-center border-r-20 rounded-3xl w-full ml-10 mr-10 mb-10 mt-8">
        <a className="block h-48 rounded overflow-y">
          <img alt="Expert" className="object-cover object-center w-40 h-40 rounded-full mx-auto " src={img} />
        </a>
        <div className=" container object-center -mt-2">
          <h3 className="text-gray-900 title-font text-lg font-semibold capitalize">{title}</h3>
          <div className='container mx-auto row mt-2  text-gray-400 text-center'>
            <h1 className='-mt-1 mx-auto row'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 left-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>India</h1>

          </div>
          <div className='.container object-center'>
            <h2 className='object-left font-semibold text-gray-500 mt-3 '>Service Created on {created_date}</h2>

          </div>


          <div className='container w-auto row mt-3'>

            <button className='font-medium text-gray-500 row mx-auto mt-2 text-justify hover:underline hover:text-blue-800 transition-colors duration-200'
              onClick={() => {
                history.push(`/profile/${user}`)
              }}>
              View Service Provider
            </button>


          </div>

          <div className='mt-8'>
            <button className='bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-2 mt-4 rounded inline-flex items-center float-left'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span>Ask Que</span>
            </button>
            <button className='bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-3  mt-4 rounded inline-flex items-center float-right'
              onClick={openModal}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span>Book</span>
            </button>


          </div>
        </div>
      </div>}
      
      

    </>
  )

}
export default Servicecard;