import React,{useState,useEffect} from 'react';
import ExpertCardSkeleton from '../experts/expertcardskeleton';
import axiosInstance from '../../utils/AxiosInstance';
import { useHistory } from 'react-router';


function Order_card(){
    const [orderdata,setorderdata] = useState([])
    const [loader,setloader] = useState("")
    const history = useHistory()

    const getData = async() =>{
        setloader('loading')
        await axiosInstance.get('activity/order_history/').then((res)=>{
            setorderdata(res.data)
            setloader("")


        })
}
useEffect(()=>{
    getData()
},[])



   
        
        return (
        <>
            
          <h1 className="flex justify-center text-2xl text-gray-800 font-bold">My Orders</h1>
            <div>
            {loader === "loading"? <><ExpertCardSkeleton/> <ExpertCardSkeleton/></>:orderdata.length === 0?<p className='text-center mt-6  font-semibold text-red-600'>opps! no orders found</p>:
            orderdata.map((value,idx) => ( 
                <div className="flex justify-center top-1/3 mt-4"
                onClick={()=>{
                    history.push(`/orders/${value.order_id}`)
                }}
                key={idx}>
                    <div className=" grid grid-cols-1 gap-4 p-4 mb-8 border-2 rounded-2xl bg-white shadow-lg w-full lg:w-1/2">
                        <div className=" flex gap-4">
                            <img src={value.service_obj.service_img===''?`https://ui-avatars.com/api/?name=${value.service_obj.service_name}`:value.service_obj.service_img} className="rounded-lg -top-8 -mb-4 bg-white border h-16 w-16" alt="" />
                            <div className="flex flex-col w-full">
                                <div className="flex flex-row justify-between">
                                    <p className="text-gray-900 title-font text-sm font-bold">{value.service_obj.service_name}</p>
                                    <a className="text-gray-500 text-xl" href="#"><i className="fa-solid fa-trash"></i></a>
                                </div>
                                <div className="text-gray-400 text-sm mt-2">
                                    <div className='.container object-cover row mx-auto w-auto'>
                                        <h2 className='object-left font-semibold text-gray-400 '>Meet Date</h2>
                                        <h2 className='object-right font-semibold text-gray-400 mx-auto'>Time</h2>
                                    </div>
                                    <div className='container w-auto row mt-2'>

                                        <h1 className='font-bold row mx-2'>{value.slot?.schedule?.day}</h1>

                                        <h1 className='font-medium  text-gray-400 row mx-auto px-3'> 
                                           
                                         {Number(`${value.slot.start_time[0]}${value.slot.start_time[1]}`) >= 12 ? `${value.slot.start_time}-${value.slot.end_time} P.M` : `${value.slot.start_time}-${value.slot.end_time} A.M`}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
{/* 
                        <div className='mt-1'>
                            <button className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded inline-flex float-left'
                            onClick={()=>{
                                history.push(`/orders/${value.order_id}`)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                <span>View Details</span>
                            </button>
                           
                        </div> */}
                        <p className='text-sm text-left text-gray-600'>{value.order_created}</p>
                    </div>
                </div>))}
            
            </div>

        </>
    );
        
}
export default Order_card;