import React, { useEffect, useState, Fragment } from 'react'
import { Dialog, Transition, Tab } from '@headlessui/react'
import { useHistory} from 'react-router';
import axios from 'axios';
import axiosInstance from '../../utils/AxiosInstance';
import Spinner from '../authentication/spinner';
import EmailAuth from './emailauth';
import MobileAuth from './mobileauth';




const currTime = new Date().toISOString();
const a = new Date();
const currentDay = a.getDay();
var str = currTime;



export default function TueClick() {
    let [isOpen, setIsOpen] = useState(false);
    let [isLogin, setIsLogin] = useState(false);
    let [isError, setIsError] = useState(false);
    const [slots, setslots] = useState([]);
    const [date, setdate] = useState("");
    const [time, settime] = useState("");
    const [price, setprice] = useState("");
    const [serviceid,setserviceid] = useState("");
    const [eventid,seteventid] = useState("");
    const [orderid,setorderid] = useState("");
    const [loader,setloader] = useState("");
    const history = useHistory();
    const id = sessionStorage.getItem('service_id')
    const expert_id = sessionStorage.getItem('temp_id')
    function closeModal() {
        setIsOpen(false)

    }



    function closeLogin() {
        setIsLogin(false)
    }

    function closeErr() {
        setIsError(false)
    };





    var tue = 2;
    var t;

    if (tue >= currentDay) {
        t = tue - currentDay;
    }
    else {
        t = 7 - currentDay + 2;
    }

    var tuesday = new Date(str);

    tuesday.setDate(tuesday.getDate() + t);
    var t2 = (tuesday.toLocaleString("en-GB",{day:'2-digit',month:'2-digit',year:'numeric'}));


    const getdata1 = async () => {
        await axios.get(`/user/service_detail/${id}/`).then((resp) => {


            setprice(resp.data.price)

        })

        await axios.get(`/events/get_event/${id}/?date=${t2}`).then((resp) => {


            if (Object.keys(resp.data).length === 0){
                setslots([])
               
            }
            else{
                
                const dict = resp.data.slots
                setslots(dict[t2])
                
            }

        })

    }
    useEffect(() => {
        getdata1();
    }, [])


    
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



    const GetOrderid = async() =>{
        setloader('loading')
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        )

        const resp = await axiosInstance.post(`/activity/book_service/${serviceid}/`,{event_id:eventid})

        setorderid(resp.data.order_id)
     
        if(resp.status === 200){
           
            console.log(resp.data.order_id)
            await axiosInstance.post(`/payments/order_create/${resp.data.order_id}/`).then((pay)=>{
                setIsOpen(false)
                setloader('')  
                const options = {
                    "key": process.env.REACT_APP_RAZOR_PAY_KEY, 
                    "amount": `${Number(price)*100}`, 
                    "currency": "INR",
                    "name": "UltraXpert",
                    "description": "Pay for a Slot",
                    "image":`${process.env.REACT_APP_RAZOR_PAY_LOGO}`,
                    "order_id": `${pay.data.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler": async function (response){
                        await axios.post(`/events/slot/`,{"payment_id":response.razorpay_payment_id,"slot_id":eventid}).then((slot)=>{
                            const rep = axiosInstance.patch(`activity/order_status/${resp.data.order_id}/`,{'status':'booked'})
                            const res = axiosInstance.post(`/meet/`,{'service_id':`${id}`,"slot_id":eventid,"expert_id":expert_id}) 
                            const res1 = axiosInstance.post(`/events/event_disable/`,{'expert_id':expert_id,"slot_id":eventid})
                            history.push('/meet')
                        }).catch((err)=>{
                            setIsError(true)
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
         <Transition appear show={isError} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeErr}
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
                                    Booking Failed
                                </Dialog.Title>

                                <p className='text-red-500 text-sm mt-2 font-semibold'>Something Went Wrong! If Your Money is deducted we will be refund you within 48 hours.  </p>
                                <div className="mt-4">

                                    <button
                                        type="button"
                                        className="float-right inline-flex justify-center px-3 py-2 text-sm font-medium text-white bg-blue-800 border border-transparent rounded-xl hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeErr}

                                    >

                                        OK
                                    </button>
                                  
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            
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
                                    Quick Booking
                                </Dialog.Title>
                                <div className="mt-2">

                                    <div className=' text-sm font-semibold text-blue-700 text-justify'>
                                        <h1 className='ml-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-2 py-1 bg-green-200 text-green-700 rounded-full m-2 justify-evenly'>Date : {date}</h1>

                                        <h1 className='ml-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-2 py-1 bg-blue-200 text-blue-700 rounded-full m-2 justify-evenly'>Time Slot : {time}</h1>


                                    </div>



                                </div>

                                <div className="mt-4 justify-center">

                                {loader === 'loading'?<Spinner/>:
                                    <button
                                        type="button"
                                        className=" inline-flex rounded-xl text-center float-right text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={GetOrderid}
                                    >

                                        Pay ₹{price} To Book Slot
                                    </button>}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

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
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Login Required
                                </Dialog.Title>

                                <Tab.Group manual>
                <Tab.List className="flex justify-center mx-auto mt-3 ">
                  <Tab className={({ selected }) => (selected ? 'font-lg bg-blue-500 text-white rounded px-3 py-1 mx-1' : '  text-gray-500 hover:bg-blue-400 hover:text-white px-3  rounded py-1')}>Email</Tab>
                  <Tab className={({ selected }) => (selected ? ' font-lg bg-blue-500 text-white rounded px-3 py-1 mx-1' : 'text-gray-500 hover:bg-blue-400 hover:text-white px-3 rounded py-1')}>Mobile</Tab>

                </Tab.List>
                <Tab.Panels>

                  <Tab.Panel><EmailAuth/></Tab.Panel>
                  <Tab.Panel><MobileAuth/></Tab.Panel>

                </Tab.Panels>
              </Tab.Group>
      
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>




            {slots.length === 0 ? <p className='text-sm font-semibold text-center text-red-500 mt-2 w-full'>Opps! No Slots Available</p> : slots.map((value,idx) => (
                <div className="ml-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-2 py-1 bg-green-200 text-green-700 rounded-full m-2"
                    onClick={() => {
                        setserviceid(id)
                        seteventid(value.id)
                        setdate(t2)
                        settime(Number(`${value.start_time[0]}${value.start_time[1]}`) >= 12 ? `${value.start_time}-${value.end_time} P.M` : `${value.start_time}-${value.end_time} A.M`)
                        { !localStorage.getItem('access_token') ? setIsLogin(true) : setIsOpen(true) }
                    }}
                    key={idx}>
                    {Number(`${value.start_time[0]}${value.start_time[1]}`) >= 12 ? `${value.start_time}-${value.end_time} P.M` : `${value.start_time}-${value.end_time} A.M`}
                </div>))}
       

        </>
    )
}


