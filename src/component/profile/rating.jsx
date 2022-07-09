import React,{useState,useEffect} from 'react';
import StarRatings from "react-star-ratings";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formValues } from 'redux-form';
import ProfileSkeleton from './profile_skeleton';


export default function Rating(){
    const[rating_data,set_rating_data] = useState([])
    const [loading, setloading] = useState('loading')
    const { id } = useParams();
    const Get_rating = async() =>{

        await axios.get(`/activity/rating/${id}/`).then((res) =>{
           
            setloading('')
            set_rating_data(res.data)
            
        })

    }

    useEffect(()=>{
        Get_rating()
    },[])
        return (
            <>
          
                <div className="mx-6  lg:mx-auto h-96 overflow-y-auto scrollbar-hide lg:w-2/3 border-gray-300 border-2  rounded-2xl my-10 bg-white">

                    {loading === 'loading' ? <ProfileSkeleton /> : rating_data.length === 0 ? <p className='text-center mt-6  font-semibold text-red-600'>opps! no ratings found</p> :
                    rating_data.map((value) =>(

                  

                    <div className="container m-2 w-auto mx-6 lg:mx-3 lg:w-2/3   shadow-lg  rounded-3xl my-10 bg-white ">
                        <div className='row'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 row-auto text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg>
                            <h1 className='content-center my-auto mx-2 text-lg text-black text-semibold'> {value.user_name.username}</h1>
                        </div>
                        <div className='-mt-1'>
                            <StarRatings
                                rating={value.star_rating}
                                starRatedColor='gold'
                                numOfStars={5}
                                starDimension='20px'
                                starSpacing='auto'
                                starHoverColor='yellow'
                            />
                            <h1 className='text-lg font-semibold text-black text-justify py-1'>{`"${value.short_title}"`}</h1>
                            <p className='text-justify py-2'>{`${value.review}`}</p>
                        </div>
                    </div>
                      ))}


                  

                </div>
            </>
        )
    
}