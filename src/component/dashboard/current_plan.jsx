import React, { Fragment, useState ,useEffect } from "react";
import Expertcard from "./expertcard";
import Navbar from "../home/navbar";
import { Dialog, Transition } from "@headlessui/react";
import axiosInstance from "../../utils/AxiosInstance";
import Spinner from "../authentication/spinner";

export default function Current_plan() {
    let [isOpen, setIsOpen] = useState(false);
    const [counter, setCounter] = useState(1);
    const incrementCounter = () => setCounter(counter + 1);
    let decrementCounter = () => setCounter(counter - 1);
    const [meeting, setmeeting] = useState("");
    const [duration,setduration] = useState("");
    const [orderid,setorderid] = useState("");
    const [price,setprice] = useState("");
    const[loader,setloader] = useState("")
    const [min_duration,setmin_duration] = useState("");
    const [price_meet,setprice_meet] = useState("")
    const [meet_60,setmeet_60] = useState("")
    const [meet_45,setmeet_45] = useState("")
    const [meet_30,setmeet_30] = useState("")
    const [no_of_meet,setno_of_meet] = useState("")


    const getData = async()=>{
        await axiosInstance.get("/meet/meeting_vault/").then((res)=>{
            console.log(res.data)
            setmeet_30(res.data.meet_30)
            setmeet_45(res.data.meet_45)
            setmeet_60(res.data.meet_60)
        })
    }

    useEffect(()=>{
        getData()
    },[])

    

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

        const resp = await axiosInstance.post('user/user_plan_selection/',{ "select_plan": duration})

        setorderid(resp.data.subs_id)

       
     
        if(resp.status === 200){
            await axiosInstance.post(`/payments/meeting_order_create/${resp.data.subs_id}/`,{"meetings":meeting}).then((pay)=>{
               
                setIsOpen(false)
                setloader('')  
                const options = {
                    "key":  process.env.REACT_APP_RAZOR_PAY_KEY, 
                    "amount": `${Number(((price)*100)*Number(meeting))}`, 
                    "currency": "INR",
                    "name": "UltraXpert",
                    "description": "Buy Meeting Slots",
                    "image": process.env.REACT_APP_RAZOR_PAY_LOGO,
                    "order_id": `${pay.data.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler": async function (response){
                       
                        await axiosInstance.put(`/meet/meeting_vault/`,{"payment_id":response.razorpay_payment_id,"meetings":meeting,"select_plan":duration}).then((response)=>{
                                console.log(response)
                                if (duration === "1"){
                                    setmeet_60(meet_60+meeting)
                                   
                                  
                                }else if (duration === "2"){
                                    setmeet_45(meet_45+meeting)
                                 
                                }else{
                                    setmeet_30(meet_30+meeting)
                                    
                                }
                            
                      
                        }).catch((err)=>{
                           
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


    if (counter <= 1) {
        decrementCounter = () => setCounter(1);
    }

    function openModal() {
        setIsOpen(true)

    }
    function closeModal() {
        setloader('')
        setIsOpen(false)

    }

    function ButtonIncrement(props) {

        return (

            <button
                onClick={props.onClickFunc}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-flex w-8 h-8 text-green-600 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>


        )
    }


    function ButtonDecrement(props) {

        return (
            <button onClick={props.onClickFunc}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-flex w-8 h-8 text-red-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
        )
    }
    function Display(props) {
        setmeeting(props.message)
        return (
            <input
                type="text"
                name="qty"
                value={props.message}
                readOnly
                className="w-16 text-center bg-blue-200 outline-none rounded-xl shadow-lg font-semibold text-lg"


            />


        )
    }


    // console.log(meeting);
    // console.log(duration);

    const handleDuration = (e)=>{
        //console.log(e.target.value)
        setduration(e.target.value)
        const min_duration = e.target.value
        
        if (min_duration === "1"){
           
            setmin_duration(60)
            setprice_meet(process.env.REACT_APP_SLOT60_PRICE)
          
        }else if (min_duration === "2"){
            
            setmin_duration(45)
            setprice_meet(process.env.REACT_APP_SLOT45_PRICE)
        }else{
          
            setmin_duration(30)
            setprice_meet(process.env.REACT_APP_SLOT30_PRICE)
        }
    
       

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
                                    Add Meetings
                                </Dialog.Title>
                                <div className="mt-2">

                                    <div className=''>
                                        <select
                                            className="flex w-1/2 bg-gray-300 border-2 border-gray-300 my-6 px-1 focus:bg-white focus:outline-none focus:shadow-outline"
                                            onChange={(e) => { handleDuration(e)}}>
                                            <option selected disabled hidden>
                                                Duration
                                            </option>
                                            <option value="3">30 Min</option>
                                            <option value="2">45 Min</option>
                                            <option value="1">60 Min</option>
                                        </select>

                                    </div>

                                    <div>
                                        <ButtonDecrement onClickFunc={decrementCounter} />
                                        <Display message={counter} />

                                        <ButtonIncrement onClickFunc={incrementCounter} />
                                    </div>



                                </div>

                                <div className="mt-4">
                                {loader === 'loading'?<Spinner/>:
                                    <button
                                        type="button"
                                        className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={GetOrderid}
                                    >

                                        {`Pay ₹${price_meet*meeting} to add`}
                                    </button>}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
            <Navbar />
            <div className=" row w-full m-0 justify-center">
                <Expertcard />
                <div className="mx-7 ml-2 mr-2 bg-gray-100 w-full lg:mx-auto w-2/2 lg:w-2/3 border-gray-300 border-2 rounded-3xl my-8">
                    <div className="">
                        <h1 className=" text-gray-500 font-medium text-2xl container flex justify-center mb-2 ">
                            My Activated Plan
                        </h1>
                    </div>

                    <div className="bg-gray-100 h-96 lg:mx-auto w-2/2 lg:w-3/3 rounded-3xl mt-2  mx-2 px-1">

                        {/* <div className=" grid grid-cols-1 gap-4 p-2 mb-8 border-2 rounded-xl bg-blue-200 w-full mx-2 mt-5 ">
                            <div className=" flex gap-4">
                                <div className="flex flex-col w-full">
                                    <div className="flex flex-row justify-between">
                                        <p className="text-gray-900 title-font text-sm font-bold mx-auto">Plan Name</p>
                                        <p className='float-right title-font text-sm font-bold mx-auto'>Start Date</p>
                                        <p className='float-right title-font text-sm font-bold mx-auto'>Price</p>


                                    </div>

                                    <div className="flex flex-row justify-between">
                                        <p className="text-gray-700 title-font text-sm text-md font-semibold mx-auto">Custom</p>
                                        <p className='float-right title-font font-semibold mx-auto text-gray-700 text-sm '>30 Dec</p>
                                        <p className='float-right title-font font-semibold mx-auto text-gray-700 text-sm'>Depends</p>


                                    </div>


                                </div>
                            </div>
                        </div> */}

                        <div >
                            <button className='bg-green-500 hover:bg-blue-500 text-white font-bold py-1 px-2  inline-flex float-right mt-5 mb-3 rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed'
                                onClick={openModal}>

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                                </svg>
                                <span>Add More Meetings</span>
                            </button>


                        </div>


                        <div className="container text-gray-800 font-semibold text-lg mx-auto float-left mt-4 my-2 mb-5">
                            <h1>
                                Remaining Meetings
                            </h1>



                            <div className=" row mt-2 ">
                                <div className=" border-2 border-gray-900 m-3 px-3  mx-auto lg:float-left bg-blue-700 text-white rounded-xl shadow-2xl">
                                    <h1 className="mt-5">30 Min Meeting</h1>
                                    <h1 className=" mb-5 flex justify-center mt-1 text-2xl font-bold">{meet_30+no_of_meet}</h1>
                                </div>
                                <div className="border-2 border-gray-900 m-3 px-3  mx-auto lg:float-left bg-blue-700 text-white rounded-xl shadow-2xl">
                                    <h1 className="mt-5 ">45 Min Meeting</h1>
                                    <h1 className=" mb-5 flex justify-center mt-1 text-2xl font-bold">{meet_45+no_of_meet}</h1>
                                </div>
                                <div className="border-2 border-gray-900  m-3 px-3 mx-auto float-right bg-blue-700 text-white rounded-xl shadow-2xl">
                                    <h1 className="mt-5">60 Min Meeting</h1>
                                    <h1 className=" mb-5 flex justify-center mt-1 text-2xl font-bold">{meet_60+no_of_meet}</h1>
                                </div>




                            </div>
                        </div>




                    </div>
                </div>

            </div>
        </>
    );
}
