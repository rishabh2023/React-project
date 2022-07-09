import React, { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { useParams } from 'react-router';
import axios from 'axios';
import MonClick from './monday.jsx';
import TueClick from './tuesday.jsx';
import WedClick from './wednesday.jsx';
import ThusClick from './thursday.jsx';
import FriClick from './friday.jsx';
import SatClick from './saturday.jsx';
import SunClick from './sunday.jsx';



export default function Servicedetail() {

    const { id } = useParams();
    const [description, setdescription] = useState("");
    const [keywords, setkeywords] = useState([]);
    const [title, settitle] = useState("")
    const [notfound,setnotfound] = useState(false)

    const getdata = async () => {

        await axios.get(`/user/service_detail/${id}/`).then((resp) => {
            
            sessionStorage.setItem("temp_id",resp.data.user.user_id)
            setdescription(resp.data.description)
            settitle(resp.data.service_name)
          
            



        }).catch((err)=>{
            setnotfound(true)
        })
    }



    useEffect(() => {
        getdata();

    }, [])





    return (
        <>
         <div>
               {notfound === true?"":
               
           
            <div className='mx-6 h-72 overflow-y-auto scrollbar-hide lg:mx-auto w-3/3 lg:w-2/3 border-gray-300 border-2  rounded-3xl my-8'>

                <textarea className='px-3 py-3 text-justify  h-full w-full font-medium text-md whitespace-normal bg-gray-100 scrollbar-hide focus:outline-none'
                    value={description}
                    readOnly></textarea>
            </div>}
          
            <div className='mx-6 lg:mx-auto w-3/3 lg:w-2/3 border-gray-300 border-2  rounded-3xl my-6 object-cover object-centre'>
                <h1 className='ml-2 text-lg font-bold text-gray-500 mx-4 object-centre mb-2'>Available Slots</h1>

                <Tab.Group manual>
                {notfound === true?"":
                    <div className='px-2 grid-rows'>
                        <Tab.List className=" lg:my-3 ">
                            <Tab className={({ selected }) => (selected ? ' font-medium bg-purple-600 text-white rounded mx-3 px-2 lg:px-3 lg:mx-5' : 'text-gray-500 hover:bg-blue-400 hover:text-white mx-3 lg:px-3 px-2 lg:mx-5 rounded')}>Mon</Tab>
                            <Tab className={({ selected }) => (selected ? ' font-medium bg-purple-600 text-white rounded mx-3 px-2 lg:px-3 lg:mx-5' : 'text-gray-500 hover:bg-blue-400 hover:text-white mx-3 lg:mx-5 px-2 lg:px-3 rounded')}>Tue</Tab>
                            <Tab className={({ selected }) => (selected ? ' font-medium bg-purple-600 text-white rounded mx-3 px-2 lg:px-3 lg:mx-5' : 'text-gray-500 hover:bg-blue-400 hover:text-white mx-3 lg:mx-5 px-2 lg:px-3 rounded')}>Wed</Tab>
                            <Tab className={({ selected }) => (selected ? ' font-medium bg-purple-600 text-white rounded mx-3 px-2 lg:px-3 lg:mx-5' : 'text-gray-500 hover:bg-blue-400 hover:text-white mx-3  lg:mx-5 px-2 lg:px-3 rounded')}>Thus</Tab>
                            <Tab className={({ selected }) => (selected ? ' font-medium bg-purple-600 text-white rounded mx-3 px-2 lg:px-3 lg:mx-5' : 'text-gray-500 hover:bg-blue-400 hover:text-white mx-3  lg:mx-5 px-2 lg:px-3 rounded')}>Fri</Tab>
                            <Tab className={({ selected }) => (selected ? ' font-medium bg-purple-600 text-white rounded mx-3 px-2 lg:px-3 lg:mx-5' : 'text-gray-500 hover:bg-blue-400 hover:text-white mx-3  lg:mx-5 px-3 lg:px-3 rounded')}>Sat</Tab>
                            <Tab className={({ selected }) => (selected ? ' font-medium bg-purple-600 text-white rounded mx-3 px-2 lg:px-3 lg:mx-5' : 'text-gray-500 hover:bg-blue-400 hover:text-white mx-3 lg:mx-5 px-2 lg:px-3 rounded')}>Sun</Tab>
                        </Tab.List>
                    </div>}
                    <Tab.Panels>
                        <div className='mx-3 w-42 row  lg:mx-auto w-3/3   rounded-3xl my-2'>
                            <Tab.Panel>{MonClick()}</Tab.Panel>
                            <Tab.Panel>{TueClick()}</Tab.Panel>
                            <Tab.Panel>{WedClick()}</Tab.Panel>
                            <Tab.Panel>{ThusClick()}</Tab.Panel>
                            <Tab.Panel>{FriClick()}</Tab.Panel>
                            <Tab.Panel>{SatClick()}</Tab.Panel>
                            <Tab.Panel>{SunClick()}</Tab.Panel>
                        </div>
                    </Tab.Panels>

                </Tab.Group>

            </div>
            </div> 
        </>
    )

}
