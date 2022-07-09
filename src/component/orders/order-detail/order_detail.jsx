import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router'
import axiosInstance from '../../../utils/AxiosInstance';
import Navbar from '../../home/navbar'
export default function Order_detail() {
    const [data,setdata] = useState({});
    const [status,setstatus] = useState();
   

    const { id } = useParams();
    const history = useHistory();
  

    const getData = async() =>{

        await axiosInstance.get(`activity/order_status/${id}/`).then((res)=>{
            setstatus(res.data.paid)
            setdata(res.data)


            


        })
}
useEffect(()=>{
    getData()
},[])



    return (
        <>
        <Navbar/>
            <div className='mx-4  h-auto overflow-x-hidden shadow-xl rounded-3xl my-8 px-2 mt-2'>
                <div className='flex justify-center'>
                    <h1 className='text-gray-800 text-2xl font-bold mt-4'>
                        Order Details
                    </h1>
                </div>

           
             
                  
                <p className='text-gray-500 text-sm font-medium mt-2'>{`Order Created on ${data.order_created}`}</p>
                <p className="text-gray-500 text-sm font-medium mt-1">{`Order id ux${data.order_id}`}</p>

                <div className=' bg-white h-48 w-auto shadow-2xl  border-2 rounded-xl m-2 mt-4 px-2'>

                    {/* <div className='  text-left ml-2 mt-2 font-semibold text-sm'>
                        <p className='text-gray-900 flex  text-left mx-auto float-left font-semibold text-base'>Payment Method</p>
                        <p className=' flex mx-auto text-right float-right text-gray-500 text-sm font-medium'>10:40 AM</p>
                    </div>


                    <div className='col float-left flex-auto text-left ml-2 mt-1 font-medium text-sm'>


                        <h1 className='text-gray-600 text-justify text-sm font-medium'>BHIM UPI</h1>


                    </div > */}

                    <div className='text-left ml-2 mt-2'>
                        <h1 className='text-gray-900 flex text-left mx-auto float-left mt-4 font-semibold'>Order Summary</h1>

                    </div>
                    <div className='col float-left flex-auto text-left ml-2 mt-1 font-medium text-sm'>


                        <h1 className='text-gray-600 text-justify text-sm font-medium'>Subtotal :₹{data.price}</h1>
                        <h1 className='text-gray-600 text-justify text-sm font-medium'>Total :₹{data.price}</h1>
                        <h1 className='text-gray-600 text-justify text-md font-md font-medium'>Grand Total :₹{data.price}</h1>


                        <h1 className={`${status === false?`text-red-500`:`text-green-400`} flex text-left mx-auto font-semibold float-right`}>{`Payment Status ${status === false?`Not Paid`:`Paid`}`}</h1>
                    </div >

                  


                </div>
              
               
              
                <div className="flex shadow-xl justify-center top-1/3 mt-4 ">
                            <div className=" grid grid-cols-1 gap-4 p-2 mb-8  rounded-xl bg-white shadow-2xl  border-2 w-full mx-2">
                                <div className=" flex gap-4"
                                onClick={()=>{history.push(`/service/${data.service_id}/`)}}>
                                    <img src={data?.service_obj?.service_img===''?`https://ui-avatars.com/api/?name=${data?.service_obj?.service_name}`:data?.service_obj?.service_img} className="rounded-lg -top-8 -mb-4 bg-white border h-16 w-16" alt="" />
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-row justify-between">
                                            <p className="text-gray-900 title-font text-sm font-bold">{data.service_obj?.service_name}</p>
                                            
                                        </div>
                                        <p className="text-gray-400 text-sm mt-2">
                                            <div className='.container object-cover row mx-auto w-auto'>
                                                <h2 className='object-left font-semibold text-gray-400 mx-2 '>Date</h2>
                                                <h2 className='object-right font-semibold text-gray-400 mx-auto'>Time Slot</h2>
                                            </div>
                                            <div className='container w-auto row mt-2'>

                                                <h1 className='font-bold row mx-1'>{data.slot?.schedule?.day}</h1>

                                                <h1 className='font-medium  text-gray-400 row mx-auto px-3'> {Number(`${data?.slot?.start_time[0]}${data?.slot?.start_time[1]}`) >= 12 ? `${data?.slot?.start_time}-${data?.slot?.end_time} P.M` : `${data?.slot?.start_time}-${data?.slot?.end_time} A.M`}</h1>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                                
                                <div className='mt-1'>
                                    <button className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded inline-flex float-left'
                                    onClick={()=>{history.push(`/service/${data.service_id}/`)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                        <span>View Service</span>
                                    </button>
                                    {status === false ? '':
                                    <button className='bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-2 rounded inline-flex float-right'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                        <span>Cancel</span>
                                    </button>}
                                   

                                </div>
                                {status === false ? '':
                                <p className='text-sm text-red-600 mt-1'>If you Cancel it you will get only 50% refund of total money.</p>}
                            </div>
                        </div>




       

            </div>
        </>
    )
}
