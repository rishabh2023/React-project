import React from 'react'
import { useState,Fragment } from 'react';
import { useForm } from "react-hook-form";
import {BrowserRouter as Router,Switch,Route,Link,useHistory,Redirect} from "react-router-dom";
import Spinner from './spinner';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react'

export default function EmailPass() {
    const history = useHistory();
    let [changingpass,setchangingpass] = useState()
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
        setchangingpass('')
    }


    const { watch, register,handleSubmit,formState: { errors, isValid } } = useForm({ mode: "all" })
    const onSubmit = async(data) => {
        setchangingpass('changing')

        await axios.post("/verification/", data

        ).then((response) => {
           
                setIsOpen(true)
               
           
            }

            
        ).catch((err) => { 

  
            localStorage.setItem("email",data.email)
            const res = axios.get(`/reset/?email=${data.email}`)
            //console.log(res.data)
            history.push({pathname:"/reset/password", state : {detail:data}});
              
            <Switch>
                <Redirect to="/reset/password"/>
            </Switch>
         
             
     
    
    })
}
    
    
    const onError = (errors, e) => console.log(errors, e);



        return (
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
                                        OTP FAILED!
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        
                                        <div className='text-red-600 text-base text-justify'>
                                           Your email id is not registered please try again!
                                            
                                        </div>



                                    </div>

                                    <div className="mt-4">
                                      
                                        <button
                                            type="button"
                                            className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={closeModal}
                                        >
                                          
                                           OK
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>

                <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="w-3/3 px-3 mb-2 md:mb-0">
                        <label className="block uppercase tracking-wide  text-gray-800 text-xs font-bold float-left mt-4" htmlFor="firstname">
                            Email address
                        </label>
                        <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            {...register("email", {
                                required: {
                                  value: true,
                                  message: "Please type your registered email address"
                                }
                              })}
                        />
                        {errors.email && <p className='text-red-600 text-sm -mt-2 mb-2'>{errors.email.message}</p>}
                    </div>
              
                    <div>
                    {changingpass === "changing"?<Spinner/>:
                        <button className='bg-blue-700 text-lg text-white font-medium  w-1/2 mb-2 py-2  disabled:bg-gray-400 disabled:cursor-not-allowed mx-auto rounded-2xl'
                         disabled={!isValid}
                         type='submit'>
                            Send OTP!
                            </button>}
                    </div>

                </form>
                
            </>
        )    
    
}
