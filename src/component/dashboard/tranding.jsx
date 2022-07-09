import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../home/navbar'
import Expertcard from './expertcard'

export default function TrandingSearches() {
    const[searchData,setsearchData] = useState([])
    const GetData = async()=>{
        await axios.get('/search/search_save/').then((res)=>{
            setsearchData(res.data)
        })
    }

    useEffect(()=>{
        GetData();
    },[]);
    return (
    <>
    <Navbar />
    <div className=' row w-full justify-center m-0'>
            <Expertcard/>
            <div className=' mx-7 ml-2 mr-2 justify-center bg-gray-100 w-full lg:mx-auto w-2/2 lg:w-2/3 border-gray-300 border-2 rounded-3xl my-8'>
                <div className='flex justify-center'><h1 className='text-green-500 font-medium text-2xl'>Top Searches</h1></div>
                <div className=' w-full   my-8  h-96  lg:w-3/3 overflow-y-auto mt-2'>
                    {
                        searchData.map((value)=>(
                            <li className='m-4 text-justify text-base text-indigo-800 text-opacity-60 capitalize'>{value}</li>
                        ))
                    }
                  
                    

                </div>

            </div>
        </div>

    </>
    )
}
