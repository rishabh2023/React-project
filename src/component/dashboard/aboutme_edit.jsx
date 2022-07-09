import React, { useEffect } from 'react'
import { useParams,useHistory } from 'react-router'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import jwt_decode from 'jwt-decode';
import Expertcard from './expertcard'
import Navbar from '../home/navbar'
import axiosInstance from '../../utils/AxiosInstance'
import Spinner from '../authentication/spinner'

export default function Aboutme_edit() {
    const { id } = useParams();
    const[des,setdes] = useState('')
    const[title,settitle] = useState('')
    let [send,setsend] = useState('')
    const { register, handleSubmit, setValue } = useForm({ mode:'all'} )
    const history = useHistory();
    

    const onSubmit = async (data, e) => {
        setsend('sending')
        var decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));
        await axiosInstance.patch(`/user/profile/${decoded.user_id}/`,data).then((resp) => {
           setsend('')
           history.push('/dashboard')

        })
    }
   
   



    const getdata = async() =>{
        var decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));
        await axiosInstance.get(`/user/profile/${decoded.user_id}/`).then((resp) => {
            console.log(resp.data)
            setdes(resp.data.description)
            settitle(resp.data.title)
        })
    }
  
    
    useEffect(() => {
        setValue( 'description', des );
        setValue('title',title)
      getdata();
  
  }, [des,title])
 
    return (
        <>
         <Navbar/>
            <div className=' row w-full m-0 justify-center'>
                <Expertcard />
               
                <div className='mx-7 ml-2 mr-2 bg-gray-100 w-full lg:mx-auto w-2/2 lg:w-2/3 border-gray-300 border-2 rounded-3xl my-8'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex justify-center'><h1 className='text-gray-500 font-medium text-2xl'>About Me</h1></div>
                    <div className='mx-6 h-80 overflow-y-auto  lg:mx-auto w-3/3 lg:w-2/3 border-gray-300 border-2  rounded-3xl my-10'>

                     

                        <textarea placeholder="Write about your self" className='px-3 py-4 text-justify text-base text-gray-600 w-full h-full scrollbar-hide flex focus:outline-none'
                        defaultValue = {des}
                        required
                        {...register("description", {
                            required: {
                              value:true,
                            }
                          })} />
                       
                        


                    </div>
                    <div className='flex justify-center'><h1 className='text-gray-500 font-medium text-2xl'>Your Title</h1></div>
                    <div className='mx-6 lg:mx-auto w-3/3 lg:w-2/3  rounded-3xl my-8'>

                        <input placeholder="Your 50 Character title" className='px-3 py-2 text-justify text-base text-gray-600 w-full h-full scrollbar-hide flex focus:outline-none rounded-xl border-2 border-gray-300' 
                        defaultValue={title}
                        required
                        {...register("title", {
                            required: {
                              value:true,
                            }
                          })} />
                       



                    </div>
                    



                    {send === 'sending'?<Spinner/>:
                    <button 
                    className=' row float-right bg-blue-600 mr-2 text-white rounded py-1 px-3 mb-2 ml-2'
                    type='submit'> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>Edit Done </button>}
                    </form>
                </div>


            </div>
        </>
    )
}
