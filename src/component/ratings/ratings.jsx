import React from 'react'
import Expertcard from '../profile/expertcard'
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import axiosInstance from '../../utils/AxiosInstance';
import { useHistory, useParams } from 'react-router';
import Spinner from '../authentication/spinner';


export default function Ratings() {
    const {id} = useParams();
    const [loader,setloader] = useState("")
    const [rating, setrating] = useState(0)
    const { register, handleSubmit } = useForm({ mode: "all" })
    const history = useHistory();
    const onSubmit = async(data, e) => {
        setloader('loading')
        const data_payload = Object.assign({}, data,{"star":rating,"meeting_id":localStorage.getItem("ID")});
       
        await axiosInstance.post(`/activity/rating/${id}/`,data_payload).then((resp) => {
            console.log(resp.data)
           

              setloader('')


              localStorage.removeItem("ID")
              history.push(`/profile/${id}`)
        }).catch((err)=>{
            setloader('')
            console.log(err)
        })




    };
    const onError = (errors, e) => console.log(errors, e);

    // use this rating to send in the form 

    return (
        <div className=' row w-full bg-gray-100 m-0'>
            <Expertcard />
            <div className=' mx-7 ml-2 mr-2 bg-white w-full lg:mx-auto w-2/2 lg:w-2/3 border-white shadow-xl border-2 rounded-3xl my-8'>
                <div className='flex justify-center'>
                    <h1 className='mt-2 text-gray-500 text-xl font-semibold'>Give Your Rating</h1>
                </div>
                <div className=' bg-white  lg:mx-auto w-2/2 lg:w-3/3 overflow-x-hidden rounded-3xl mt-2  px-4'>
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        <h1 className='mt-1 ml-2 text-lg font-semibold text-gray-800'>For Service</h1>

                        <ReactStars classNames="ml-2"
                            size={45}
                            count={5}
                            color="gray"
                            activeColor="gold"
                            value={0}
                            a11y={true}
                            isHalf={true}


                            onChange={newValue => {
                                setrating(newValue)
                            }}


                        />




                        <h1 className='mt-1 ml-1 text-lg font-semibold text-gray-800'>Add a title</h1>
                        <h2 className='mt-1 ml-1 text-md font-small text-gray-600'>Sum up your review in one line</h2>
                        <input className=' ml-1 mt-3 mr-2 w-full text-sm py-2 px-2  font-semibold bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded   focus:outline-none focus:bg-white'
                            placeholder="What's most important to know about Expert"
                            {...register("short_title")} />
                        <h1 className='mt-2 ml-1 text-lg font-semibold text-gray-800'>Add a written review</h1>
                        <h2 className='mt-1 ml-1 text-md font-small text-gray-600'>You could mention for way of explaining the topic,behaviour and more</h2>
                        <textarea className=' ml-1 mt-3 mr-2  px-2 py-2 text-sm w-full h-40 font-semibold bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded   focus:outline-none focus:bg-white'
                            placeholder="What did you like or dislike?"
                            {...register("review")} />

                            {loader === 'loading'?<Spinner/>:
                        <button className='float-right w-20 bg-blue-600 text-white text-lg rounded px-1 py-1 mt-2 mb-2'
                            type="submit">Submit</button>
                        }

                    </form>


                </div>


            </div>

        </div>
    )
}
