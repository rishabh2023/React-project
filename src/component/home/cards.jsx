import React from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useHistory } from 'react-router-dom';
import {useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setHome } from "../../redux/actions/expertsActions.js";
import CardSkeleton from './cardskeleton';






export default function Card(){
    const experts_home = useSelector((state) => state.home.home);
    const[loding,setloading] = useState("loading")
    const history = useHistory();
    const dispatch = useDispatch();
    localStorage.removeItem('email')
  
    const getExpert = async ()=>{
        
        const res = await axios.get("/user/")
        var data1 = res.data.experts
        sessionStorage.setItem("services_status",true)

        setloading('')
        dispatch(setHome(data1));
        

    }

    useEffect(() => {
        getExpert();
       
    }, [])

   
  
        return (

        <>
        
            <div className="bg-gray-100 scrollbar-hide">
            
           
         
                    <div className="container px-auto py-auto mx-auto bg-gray-100 ">
                        <div className="flex flex-wrap m-auto justify-center">
                            {(loding === 'loading' && sessionStorage.getItem && experts_home.length === 0)?<><CardSkeleton/>,<CardSkeleton/>,<CardSkeleton/></>:
                        
                            experts_home.map((value,idx) => (
                                <div key = {idx} className="lg:w-1/4 md:w-1/2 p-3 border-white border-2 bg-white shadow-2xl  text-center border-r-20 rounded-2xl w-full ml-10 mr-10 mb-6 mt-6" onClick={()=>{history.push(`/profile/${value.expert_profile?.personal_detail[0]?.profile.user_id}`)}}>
                                    <a className="block h-48 rounded overflow-y">
                                   
                                    <LazyLoadImage  alt="Experts img"  className="object-cover  object-center w-40 h-40 rounded-full mx-auto -z-10" src={value.expert_profile?.personal_detail[0]?.profile_img ===''?`https://ui-avatars.com/api/?name=${value.expert_profile?.personal_detail[0]?.first_name}+${value.expert_profile?.personal_detail[0]?.last_name}`:value.expert_profile?.personal_detail[0]?.profile_img} />
                                    </a>
                                    <div className=" container object-center mt-2 " key={idx}>
                                        <h3 className="text-gray-900 title-font text-lg font-bold capitalize">{`${value.expert_profile?.personal_detail[0]?.first_name} ${value.expert_profile?.personal_detail[0]?.last_name}`}</h3>
                                        <div className='container mx-auto row mt-2  text-gray-400 text-center'>
                                            <h1 className=' mx-auto row'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 gap-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>India</h1>
                                        </div>
                                        <div className='my-3'>
                                            <h2 className="text-gray-500 title-font text-sm font-medium capitalize">{value.expert_profile?.personal_detail[0]?.title} </h2>
                                        </div>
                                        <div className='.container object-cover row mx-auto w-auto'>
                                            <h2 className='object-left font-semibold text-gray-400 mx-auto'>RATINGS</h2>
                                            <h2 className='object-right font-semibold text-gray-400 mx-auto'>EXPERIENCE</h2>
                                        </div>
                                        <div className='container w-auto row mt-2'>

                                            <h1 className='font-bold text-yellow-400 row mx-auto '><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 " viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>{value.expert_profile?.ratings?.avg}</h1>

                                            <h1 className='font-medium  text-gray-400 row mx-auto px-3'> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mt-0.5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg> {value.expert_profile?.personal_detail[0]?.experience}yrs</h1>
                                        </div>

                                        {/* <div className='mt-3 object-center'>
                                            <button className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center'
                                          >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                                <span>View</span>
                                            </button>
                                           
                                           
                                        </div> */}
                                    </div>
                                </div>
                                          ))}
                        </div>
                    </div>
                
            </div>
            
        </>)
  
    
}

