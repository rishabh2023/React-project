import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router';
import axiosInstance from '../../utils/AxiosInstance'
import ProfileSkeleton from '../profile/profile_skeleton';

const Meetcard = () => {
    const[meetdata,setmeetdata] = useState([])
    const history = useHistory();
    const [loader,setloader] = useState("loading")

   


    const getData = async() =>{
        

        
            await axiosInstance.get('/meet/').then((res)=>{
                console.log(res);
                setmeetdata(res.data)
                setloader("")

            })
    }
    useEffect(()=>{
       
        const interval = setInterval(() => {
           getData();
          }, 3000);
        
          return () => clearInterval(interval);
       
    })


    

   
      
        return (
            <>
                <div className='h-screen'>
                    <h1 className="flex justify-center text-gray-600 font-semibold text-2xl">My Meetings</h1>
                    <div className=''>
                      {loader === "loading"?<ProfileSkeleton/>:meetdata.length === 0?<p className='text-center mt-6  font-semibold text-red-600'>opps! no meetings found please book the suitable service slot</p>:
                    meetdata.map((value,idx) => (
                        <div className="flex justify-center top-1/3 mt-4 "
                        key={idx}>
                            <div className=" grid grid-cols-1 gap-4 p-2 mb-8 border-2 rounded-xl  bg-white shadow-lg w-full mx-2 lg:w-1/2">
                                <div className=" flex gap-4" onClick={()=>{
                                    history.push(`/service/${value.service.service_id}`)
                                }}>
                                    <img src={value.service.service_img===''?`https://ui-avatars.com/api/?name=${value.service.service_name}`:value.service.service_img} className="rounded-lg -top-8 -mb-4 bg-white border h-16 w-16" alt="" />
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-row justify-between">
                                            <p className="text-gray-900 title-font text-sm font-bold">{value.service.service_name}</p>
                                            <a className="text-gray-500 text-xl" href="#"><i className="fa-solid fa-trash"></i></a>
                                        </div>
                                        <div className="text-gray-400 text-sm mt-2">
                                            <div className='.container object-cover row mx-auto w-auto'>
                                                <h2 className='object-left font-semibold text-gray-400 mx-2 '>Date</h2>
                                                <h2 className='object-right font-semibold text-gray-400 mx-auto'>Time Slot</h2>
                                            </div>
                                            <div className='container w-auto row mt-2'>

                                                <h1 className='font-bold row mx-1'>{value.event?.schedule?.day}</h1>

                                                <h1 className='font-medium  text-gray-400 row mx-auto px-3'> {Number(`${value.event?.start_time[0]}${value.event?.start_time[1]}`) >= 12 ? `${value.event?.start_time}-${value.event?.end_time} P.M` : `${value.event?.start_time}-${value.event?.end_time} A.M`}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-1'>
                                    <button className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded inline-flex float-left disabled:bg-gray-400 disabled:cursor-not-allowed'
                                    disabled = {!value.join_btn}
                                    onClick={()=>{
                                        sessionStorage.setItem('msg',value.service.user.user_id)
                                        sessionStorage.setItem('cat',"consumer")
                                        sessionStorage.setItem('service_name',value.service.service_name)
                                        sessionStorage.setItem('time',value.event?.end_time)
                                        localStorage.setItem("ID",value.meeting_id)

                                        history.push(`/meet/live/expert/${value.meeting_id}`)
                                    //    document.location = `${process.env.REACT_APP_BASE_URL}/meet/${value.meeting_id}/`
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                        <span>Join Now</span>
                                    </button>
                                    <button className='bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded inline-flex float-right disabled:bg-gray-400 disabled:cursor-not-allowed'

                                    disabled = {(!value.rating_btn||value.rated)}
                                    onClick={()=>{
                                        sessionStorage.setItem('msg',value.service.user.user_id)
                                        localStorage.setItem("ID",value.meeting_id)

                                                history.push(`/profile/${value.service.user.user_id}/rating/`)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                        </svg>
                                        <span>{value.rated !== true?`Give Rating`:"Already Rated"}</span>
                                    </button>

                                </div>
                            </div>
                        </div>))}


                     





                    </div>
                </div>
            </>
        )
    
}

export default Meetcard;
