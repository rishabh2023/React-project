import Expertcard from './expertcard'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState, useEffect } from 'react'
import axiosInstance from '../../utils/AxiosInstance';
import Navbar from '../home/navbar'
import { useHistory } from 'react-router';
import Spinner from '../authentication/spinner';
import ProfileSkeleton from '../profile/profile_skeleton';

export default function Meetings() {
    const [meetData, setmeetData] = useState([]);
    //should be false with current datetime
    const [joinbtn, setjoinbtn] = useState(false)
    //should be false with backend
    const [activatebtn, setactivatebtn] = useState(false);
    const [note, setnote] = useState('');
    const [price, setprice] = useState("");
    const [duration, setduration] = useState("");
    const [loader, setloader] = useState("")
    const [plan_no, setplan_no] = useState("")
    const [meeting_id, setmeeting_id] = useState("")
    const [loading1, setloading] = useState("loading")
    const [showAlert, setShowAlert] = React.useState(true);

    const history = useHistory();

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setloader('')
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)

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







    const GetOrderid = async () => {




        setloader('loading')
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        )

        const resp = await axiosInstance.post('user/user_plan_selection/', { "select_plan": plan_no })





        if (resp.status === 200) {
            await axiosInstance.post(`/payments/meeting_order_create/${resp.data.subs_id}/`, { "meetings": 1 }).then((pay) => {

                setIsOpen(false)
                setloader('')
                const options = {
                    "key": process.env.REACT_APP_RAZOR_PAY_KEY,
                    "amount": `${price}`,
                    "currency": "INR",
                    "name": "UltraXpert",
                    "description": "Buy Slot",
                    "image": process.env.REACT_APP_RAZOR_PAY_LOGO,
                    "order_id": `${pay.data.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler": async function (response) {

                      
                        const resp = axiosInstance.post('/meet/book_quike_meeting/', { "meeting_id": meeting_id,"payment_id":response.razorpay_payment_id })
                        const res = axiosInstance.put(`/meet/meeting_vault/`,{"payment_id":response.razorpay_payment_id,"meetings":1,"select_plan":duration})




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


    const GetData = async () => {
        await axiosInstance.get(`/meet/expert_meeting/`).then((res) => {
            setmeetData(res.data)
            setloading("")

        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            GetData();
        }, 3000);

        return () => clearInterval(interval);
    }, [])

    const joined = async () => {
        await axiosInstance.post("/meet/joined/")
    }




    return (
        <>
            <Navbar />
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
                                    Add Meeting
                                </Dialog.Title>
                                <div className="mt-2">

                                    <div className=''>
                                        Meeting Duration {duration} min


                                    </div>



                                </div>

                                <div className="mt-4">
                                    {loader === 'loading' ? <Spinner /> :
                                        <button
                                            type="button"
                                            className="float-right inline-flex justify-center px-2 py-2 text-sm font-medium text-white bg-blue-800 border border-transparent rounded-lg hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={GetOrderid}

                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                            Pay ₹{price} to Add
                                        </button>}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>


            <div className=' row w-full m-0 justify-center bg-gray-100'>
                <Expertcard />
                <div className='mx-7 ml-2 mr-2 bg-white w-full lg:mx-auto w-2/2 lg:w-2/3 shadow-2xl border-2 rounded-3xl my-8'>
                    <h1 className='text-gray-500 font-medium text-2xl mb-2 mt-1 text-center'>Your Meetings</h1>

                    {/* <p className='text-sm text-yellow-500 justify-center ml-4 mt-1 text-justify mr-2'>Note: Join button will automatically enable at meeting time.And if you do not join the meeting,the client will get a refund</p>
                         */}
                    {showAlert ? (
                        <div
                            className={
                                "text-blue-700 px-2 py-1 border-2 relative mb-1 bg-blue-100 mx-1 text-sm rounded-2xl border-blue-600"

                            }
                        >
                            <button
                                className="float-right  text-sm font-semibold "
                                onClick={() => setShowAlert(false)}
                            >
                              X
                            </button>
                           
                            <p className="mr-4 text-justify items-center">

                            ⓘJoin button will automatically enable at meeting time and if you do not join the meeting,the client will get a refund

                            </p>
                        

                        </div>
                    ) : null}


                    <div className=' w-full h-96 lg:mx-auto  lg:w-3/3 overflow-y-auto rounded-3xl mt-2 scrollbar-hide'>


                        {loading1 === "loading" ? <ProfileSkeleton /> : meetData.length === 0?<p className='text-center mt-6  font-semibold text-red-600'>opps! no meetings found</p>:meetData.map((value) => (
                            <div className="flex justify-center top-1/3 mt-2 ">
                                <div className=" grid grid-cols-1 gap-4 p-1 mb-4 border-2 rounded-xl bg-white w-full mx-2 shadow-xl ">
                                    <div className=" flex gap-4">
                                        <img src={value.service.service_img === '' ? `https://ui-avatars.com/api/?name=${value.service.service_name}` : value.service.service_img} className="rounded-lg -top-8 -mb-4 bg-white border h-16 w-16" alt="" />
                                        <div className="flex flex-col w-full">
                                            <div className="flex flex-row justify-between">
                                                <p className="text-gray-900 title-font text-sm font-bold">{value.service.service_name}</p>
                                            
                                            </div>
                                            <p className="text-gray-400 text-sm mt-2">
                                                <div className='.container object-cover row mx-auto w-auto'>
                                                    <h2 className='object-left font-semibold text-gray-400 mx-2 '>Date</h2>
                                                    <h2 className='object-right font-semibold text-gray-400 mx-auto'>Time Slot</h2>
                                                </div>
                                                <div className='container w-auto row mt-2'>

                                                    <h1 className='font-bold row mx-1'>{value.event?.schedule?.day}</h1>

                                                    <h1 className='font-medium  text-gray-400 row mx-auto px-3'> {Number(`${value.event?.start_time[0]}${value.event?.start_time[1]}`) >= 12 ? `${value.event?.start_time}-${value.event?.end_time} P.M` : `${value.event?.start_time}-${value.event?.end_time} A.M`}</h1>
                                                </div>
                                            </p>
                                        </div>
                                    </div>
                                    <p className="-mt-2  object-left font-semibold text-gray-400"> Client Id {`${value.user.user_id}`} </p>
                                    <div className='mt-1'>
                                  
                                        
                                        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded inline-flex float-left disabled:bg-gray-400 disabled:cursor-not-allowed'
                                            disabled={!value.join_btn}
                                            onClick={
                                                () => {
                                                    
                                                    const resp = axiosInstance.post("/meet/joined/", { 'meeting_id': value.meeting_id })
                                                    sessionStorage.setItem('cat',"expert")
                                                    sessionStorage.setItem('time',`${value.event?.end_time}`)
                                                    sessionStorage.setItem('service_name', `${value.service_name}`)
                                                    sessionStorage.setItem('name', `${value.expert.first_name} ${value.expert.last_name}`)
                
                                                    history.push(`/meet/live/expert/${value.meeting_id}`)
                                                }
                                            }>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                            <span>Join Now</span>
                                        </button>
                                        {
                                            value.refund_enable === true ? 
                                            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded inline-flex float-right disabled:bg-gray-400 disabled:cursor-not-allowed'
                                            disabled={value.refunded === true?true:false}
                                            onClick={
                                                () => {
                                                    const resp = axiosInstance.post("/meet/joined/", { 'meeting_id': value.meeting_id })
                                                  
                                                    history.push('/dashboard/current-pack')
                                                }
                                            }>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                            <span>{value.refunded === true?"Refunded":"Refund Meet"}</span>
                                        </button>
                                        :
                                      
                                        <button className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded inline-flex float-right disabled:bg-gray-400 disabled:cursor-not-allowed'
                                            disabled={!value.add_meeting_btn}
                                            onClick={() => {

                                                setduration(value.event.duration)
                                                setmeeting_id(value.meeting_id)



                                                if (value.event.duration === 30) {
                                                    setprice(process.env.REACT_APP_SLOT30_PRICE)
                                                    setplan_no("3")
                                                } else if (value.event.duration === 45) {
                                                    setprice(process.env.REACT_APP_SLOT45_PRICE)
                                                    setplan_no("2")
                                                } else if (value.event.duration === 60) {
                                                    setprice(process.env.REACT_APP_SLOT60_PRICE)
                                                    setplan_no("1")
                                                }
                                                openModal();
                                            }}>

                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                                            </svg>
                                            <span>Add Meeting</span>
                                        </button>
                                                }

                                    </div>
                                    <p className='text-sm text-red-600 justify-center ml-2 mt-1 text-justify mr-2'>{note}</p>

                                </div>
                            </div>))}






                    </div>
                </div>
            </div>
        </>
    )
}
