import React, { Component } from 'react'
import Expertcard from './expertcard'
import { useHistory } from 'react-router-dom'



export default function Expertinfo() {
    
    
    const history = useHistory();
        return (
           
            <>
           
                
                <div className=' row w-full justify-center m-0 bg-gray-100'>
                    <Expertcard/>
                    <div className=' mx-7 ml-2 mr-2  bg-white shadow-2xl w-full lg:mx-auto w-2/2 lg:w-2/3 justify-center border-gray-300 border-2  rounded-3xl my-8 container sm:grid-col-1 overflow-x-hidden '>
                       
                    <h1 className='text-gray-500 font-medium text-2xl  flex justify-center'>Your Dashboard</h1>
                            <div className='container justify-center text-center'>

                                <button className="w-44 lg:w-1/4 m-4 p-3 shadow-2xl border-gray-300  bg-white text-center border-r-20 rounded-3xl"
                                onClick={()=> history.push('/dashboard/services')}>
                                <div className='flex justify-center'>
                                <img src="https://img.icons8.com/color/48/000000/services--v1.png"/>
                                </div>
                                    <div>
                                    <h1 className='text-gray-500  text-base'>My Services  (Add,Edit,Delete)</h1>
                                    </div>
                                </button>
                         
                       

                                <button className=" w-44 lg:w-1/4 m-4  p-3 border-gray-300 shadow-2xl bg-white text-center border-r-20 rounded-3xl "
                                onClick={()=> history.push('/dashboard/meet')}>
                                <div className='flex justify-center'>
                                <img src="https://img.icons8.com/stickers/48/000000/video-call.png"/>
                                </div>
                                    <div>
                                    <h1 className='text-gray-500 text-base'>My Meetings <span>(Join,Add and more)</span></h1>
                                    </div>
                                </button>

                                <button className=" w-44 lg:w-1/4 m-4 p-3 border-gray-300 shadow-2xl bg-white text-center border-r-20 rounded-3xl "
                                onClick={()=> history.push(`/dashboard/about/edit/${JSON.parse(localStorage.getItem('profile_id'))}`)}>
                                <div className='flex justify-center'>
                                <img src="https://img.icons8.com/office/48/000000/edit-user-female.png"/>
                                </div>
                                    <div>
                                    <h1 className='text-gray-500 text-base'><span>About Me</span><span>(Add,Edit and more)</span></h1>
                                    </div>
                                </button>
                                 
                                <button className=" w-44 lg:w-1/4 m-4 p-3 border-gray-300 shadow-2xl bg-white text-center border-r-20 rounded-3xl "
                                 onClick={()=> history.push('/dashboard/current-pack')}>
                                <div className='flex justify-center'>
                                <img src="https://img.icons8.com/external-tal-revivo-tritone-tal-revivo/48/000000/external-approved-tick-mark-button-to-choose-correct-basic-tritone-tal-revivo.png"/>
                                </div>
                                    <div>
                                    <h1 className='text-gray-500 text-base'><span>Current Pack(Add and View)</span></h1>
                                    </div>
                                </button>
                                 
                                {/* <button className=" w-44 lg:w-1/4 m-4  p-3 border-gray-300 shadow-2xl bg-white text-center border-r-20 rounded-3xl "
                                onClick={()=> history.push('/dashboard/price')}>
                                <div className='flex justify-center'>
                                <img src="https://img.icons8.com/nolan/48/add-dollar.png"/>
                                </div>
                                    <div>
                                    <h1 className='text-gray-500 text-base'><span>Add Pack(View,add and more)</span></h1>
                                    </div>
                                </button> */}
                                <button className=" w-44 lg:w-1/4 m-4  p-3 border-gray-300 shadow-2xl bg-white text-center border-r-20 rounded-3xl"
                                onClick={()=> history.push('/dashboard/wallet')}>
                                <div className='flex justify-center'>
                                <img src="https://img.icons8.com/plasticine/48/000000/payment-history.png"/>
                                </div>
                                    <div>
                                    <h1 className='text-gray-500 text-base'><span>Transactions(View and more)</span></h1>
                                    </div>
                                </button>
                                <button className=" w-44 lg:w-1/4 m-4  p-3 border-gray-300 shadow-2xl bg-white text-center border-r-20 rounded-3xl"
                                onClick={()=> history.push('/dashboard/top-searches')}>
                                <div className='flex justify-center'>
                                <img src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/48/000000/external-search-online-learning-kmg-design-outline-color-kmg-design.png"/>
                                </div>
                                    <div>
                                    <h1 className='text-gray-500 text-base'><span>Search Tool(view tranding searches)</span></h1>
                                    </div>
                                </button>
                                <button className=" w-44 lg:w-1/4 m-4  p-3 border-gray-300 shadow-2xl bg-white text-center border-r-20 rounded-3xl"
                                onClick={()=> history.push('/dashboard/add/details')}>
                                <div className='flex justify-center'>
                                <img src="https://img.icons8.com/ios/48/000000/add--v1.png"/>
                                </div>
                                    <div>
                                    <h1 className='text-gray-500 text-base'><span>Bank Details(Add and more)</span></h1>
                                    </div>
                                </button>

                            </div>
                            </div>
                        
                </div>
            </>
        )
    
}
