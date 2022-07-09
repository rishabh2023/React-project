import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios';
export default function Aboutme() {
    const { id } = useParams();
    const [about, setabout] = useState("");
    const [keywords, setkeywords] = useState([]);

    const getdata = async()=>{
        
        await axios.get(`/user/expert/${id}/`).then((resp) => {
              
                setabout(resp.data.expert_profile?.personal_detail[0]?.description)



            })
        }

    

    useEffect(() => {
        getdata();
       
    }, [])

    return (
        <>
            <div className='mx-6 h-80 overflow-y-auto scrollbar-hide lg:mx-auto w-3/3 lg:w-2/3 border-gray-300 border-2  rounded-3xl my-10'>
                <textarea className='px-3 py-4 text-justify text-base h-full w-full bg-white scrollbar-hide focus:outline-none font-semibold'
                    value={about}
                    readOnly></textarea>
            </div>
            <div className='mx-auto  w-3/3 lg:w-2/3 my-6 object-cover object-center'>
                {/* <div className="ml-2 text-xs inline-flex items-center font-bold leading-sm uppercase px-2 py-1 bg-blue-200 text-blue-700 rounded-full m-2">
                    python
                </div> */}
               




            </div>


        </>
    )

}