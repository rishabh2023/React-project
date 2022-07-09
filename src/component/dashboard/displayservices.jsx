import React, { useState, useEffect ,Fragment } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axiosInstance from "../../utils/AxiosInstance.js";
import { Dialog, Transition } from '@headlessui/react'
import Spinner from '../authentication/spinner'
import ProfileSkeleton from "../profile/profile_skeleton.jsx";
const Displayservices = () => {
  const [servicelist, updateService] = useState([]);
  const history = useHistory();
  let [isOpen, setIsOpen] = useState(false)
  let [send,setsend] = useState('')
  const[ser,setser] = useState('')
  let [id,setid] = useState('')
  
  const DeleteService = async() => {
    setsend('loading')
    const res  =  await axiosInstance.delete(`/user/service_delete/${id}/`)
    setIsOpen(false)
    setsend('')
    window.location.reload(false)
  
  
    

  }

  function closeModal() {
    setsend('')
    setIsOpen(false)

  }

  const getEmp = async() => {
    setser('loading')
    await axiosInstance.get(`/user/expert/${JSON.parse(localStorage.getItem('profile_id'))}/`)
      .then((allEmp) => {
        console.log(allEmp.data.expert_profile.sevices)
        updateService(allEmp.data.expert_profile.sevices)
        setser('')
      });
  };
  useEffect(() => {
    getEmp();
  }, [true]);
  return [

    <>

<Transition appear show={isOpen} as={Fragment}>
        <Dialog
          //as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-900"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Delete Service
                </Dialog.Title>
                <div className="mt-2">

                  <div className='text-red-600 text-base text-justify'>
                    Are you really want to delete?

                  </div>



                </div>

                <div className="mt-4">
                  {send === 'loading'?<Spinner/>:
                  <button
                    type="button"
                    className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={DeleteService}
                  >

                    Yes
                  </button>}

                  <button
                    type="button"
                    className="float-left inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >

                    No
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <div className="container">
        <div className="container py-2 mb-2">
          <div className="rounded-lg w-full mt-2 mb-2 overflow-y-auto scrollbar-hide   float-right ">
            <Link to="/dashboard/service/form">
              <button className="bg-blue-600 hover:bg-blue-900 focus:shadow-outline focus:outline-none  text-white font-md py-1 px-2 rounded float-right">
                Add New Service
              </button>
            </Link>

          </div>
        </div>


        <div className=' bg-gray-100 w-full  border-gray-200 border-2 rounded-3xl  h-96 py-2 overflow-y-auto scrollbar-hide my-3  px-1 '>
            
          { ser === 'loading'?<ProfileSkeleton/>:servicelist.length === 0 ? <p className='text-center mt-6  font-semibold text-red-600'>opps! no active services found.To create a new service,click on the Add Service button</p>:
          servicelist.map((value)=>(

         

          <div className="flex justify-center top-1/3  h-auto  mt-2">
            <div className=" bg-white shadow-xl  mx-1 grid grid-cols-1  w-full   border-2 rounded-xl  lg:w-full md:mx-4">
              <div className="container flex gap-4 bg-white rounded-md">
                <img src={value.service_img === '' ? `https://ui-avatars.com/api/?name=${value.service_name}` : value.service_img} className="rounded-xl  ml-1 bg-white  h-10 w-10 mt-2 " alt="" />
               
                <div className="flex flex-col w-full">
               
                  <p
                    className=" text-sm font-normal text-black capitalize w-full mt-0.5 "
                    onClick={()=>{
                      history.push(`/service/${value.service_id}`)
                    }}>
                   {value.service_name} </p>
                </div>
                <div className=" flex float-right mt-3 mr-2 mb-3">
                  <button 
                  className="px-1 py-1 bg-yellow-500 text-center text-white font-semibold mx-2 rounded-md"
                  onClick={()=>{
                    history.push(`/dashboard/services/edit/${value.service_id}`)
                  }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  </button>
                  <button 
                  className="px-1  bg-red-600 text-center text-white font-semibold rounded-md"
                  onClick={()=>{
                        setid(value.service_id)
                        setIsOpen(true)
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  </button>

                </div>
               
              </div>
              
            <h1 className='relative text-gray-500 font-semibold ml-3 mb-1 text-sm'>{value.date_created}</h1>
              
            </div>
          </div> ))}

      






        </div>



      </div>




    </>

  ];
};
export default Displayservices;