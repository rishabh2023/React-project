import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect} from "react";
import {useHistory} from 'react-router'
import { useDispatch, useSelector } from "react-redux";
import { setExperts } from "../../redux/actions/expertsActions.js";
import ExpertCardSkeleton from "./expertcardskeleton";
import { useState } from "react";


function Expert_card(){
    const[loding,setloading] = useState('loading')
    const experts = useSelector((state) => state.allExperts.experts);
    const dispatch = useDispatch();
    const history = useHistory();
    const getExperts = async ()=>{
       
        const res = await axios.get('/user/')
        var data1 = res.data.experts
        sessionStorage.setItem("expert_status",true)
        setloading('')
        dispatch(setExperts(data1));
       

    };

    useEffect(() => {
        getExperts();
       
    }, []);
     
   
    return (
        <>
         
            <div className = "bg-gray-100">
            <h1 className="flex justify-center text-2xl text-gray-800 font-bold "> Experts</h1>
               

                {(loding === 'loading'&& sessionStorage.getItem && experts.length === 0)?<> <ExpertCardSkeleton/> <ExpertCardSkeleton/></>:
               
                experts.map((value) => (

                <div className="flex justify-center top-1/3 mt-4">
                    <div className=" grid grid-cols-1 gap-4 p-4 mb-2 border-2 rounded-2xl bg-white shadow-lg w-full lg:w-1/2" onClick={()=>{history.push(`/profile/${value.expert_profile?.personal_detail[0]?.profile.user_id}`)}}>
                        <div className=" flex gap-4">
                        <img src={value.expert_profile?.personal_detail[0]?.profile_img ===''?`https://ui-avatars.com/api/?name=${value.expert_profile?.personal_detail[0]?.first_name}+${value.expert_profile?.personal_detail[0]?.last_name}`:value.expert_profile?.personal_detail[0]?.profile_img} className="rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="Loading..." />
                            <div className="flex flex-col w-full">
                                <div className="flex flex-row justify-between">
                                    <p className="whitespace-nowrap truncate overflow-hidden text-gray-900 title-font text-lg font-bold capitalize">{`${value.expert_profile?.personal_detail[0]?.first_name} ${value.expert_profile?.personal_detail[0]?.last_name}`}</p>
                                    <a className="text-gray-500 text-xl" href="#"><i className="fa-solid fa-trash"></i></a>
                                </div>
                                <p className="text-gray-400 text-sm mt-2">
                                    <div className='.container object-cover row mx-auto w-auto'>
                                        <h2 className='object-left font-semibold text-gray-400 '>RATINGS</h2>
                                        <h2 className='object-right font-semibold text-gray-400 mx-auto'>Experience</h2>
                                    </div>
                                    <div className='container w-auto row mt-2'>

                                        <h1 className='font-bold text-yellow-400 row mx-2'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 " viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>{`${value.expert_profile?.ratings?.avg}(${value.expert_profile?.ratings?.reviews})`}</h1>

                                        <h1 className='font-medium  text-gray-400 row mx-auto px-3'> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg> {value.expert_profile?.personal_detail[0].experience}yrs</h1>
                                    </div>
                                </p>
                            </div>
                        </div>
                        <p className="-mt-2  text-gray-500 title-font text-sm font-medium ">{value.expert_profile?.personal_detail[0]?.title}</p>
                        <div className='mt-1 justify-items-center'>
                      
                            <button className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-8 rounded inline-flex float-none'
                            onClick={()=>{
                                history.push(`/profile/${value.expert_profile?.personal_detail[0]?.profile.user_id}`)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                <span>View Full</span>
                            </button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </>
    )
    }


export default Expert_card