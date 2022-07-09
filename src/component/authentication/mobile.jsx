import React from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Spinner from './spinner';


export default function Mobile() {
   
    const { register,handleSubmit,formState: { errors, isValid } } = useForm({ mode: "all" })
    const history = useHistory();
    let [isOpen, setIsOpen] = useState(false)
    let [login,setlogin] = useState()

    function closeModal() {
        setIsOpen(false)
        setlogin('')
    }


    const onSubmit = async(data, e) => {
        setlogin('logging In')
        const payload ={'mobile':`+91${data.mobile}`,'password':`${data.password}`} 
        console.log(payload)
        await axios.post("/mobile_login/",payload,
          ).then((response) => { 

           
            console.log(response.status);
            if (response.status === 200){
                const token = response.data.access_token
                const expert = response.data.is_expert
                const name = response.data.username
                localStorage.setItem("access_token",JSON.stringify(token))
                localStorage.setItem("expert",expert)
                localStorage.setItem("username",name)
                localStorage.setItem("profile_id",JSON.stringify(response.data.user_id))
                history.push('/')
            }
          }) .catch((err) => {setIsOpen(true)});   
      
       
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
                                        Login Failed
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        
                                        <div className='text-red-600 text-base text-justify'>
                                           Your mobile or password is incorrect please try again!!
                                            
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
                            Mobile Number
                        </label>
                        <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
                            id="mobile"
                            type="number"
                            name="mobile"
                            
                            placeholder="7005604567"
                            {...register("mobile", {
                                required: {
                                  value: true,
                                  message: "Please type your registered mobile number"
                                }
                              })}
                        />
                        {errors.mobile && <p className='text-red-600 text-sm -mt-2 mb-2'>{errors.mobile.message}</p>}
                    </div>
                    <div className="w-3/3 px-3 mb-2 md:mb-0">
                        <label className="block uppercase tracking-wide  text-gray-800 text-xs font-bold float-left mt-4" htmlFor="firstname">
                            Password
                        </label>
                        <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="*********"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,12}$"
                            required
                            title="Atleast 1 Uppercase 1 Lowercase 1 Charater 1 Special Charater 1 Number must be there "
                            {...register("password", {
                                required: {
                                  value: true,
                                  message: "Please type your correct password"
                                }
                              })}
                        />
                        {errors.password && <p className='text-red-600 text-sm -mt-3 mb-2'>{errors.password.message}</p>}
                    </div>
                  
                    <div className='"w-3/3 px-3 mb-2 md:mb-0'>
                        <div className="flex justify-between">
                            <label className="block text-gray-500 font-semibold my-2">

                                <input type="checkbox"
                                    className="leading-loose"
                                    checked
                                />
                                <span className="py-2 text-sm text-gray-600 leading-snug px-1">
                                    Remember Me </span>
                            </label>
                            <label className="block text-gray-500 font-semibold text-md my-2">
                                <a
                                    href="/reset"
                                    className="cursor-pointer tracking-tighter text-gray-500 text-sm border-gray-200 hover:border-gray-400">
                                    <span>
                                        ForgotPassword?
                                    </span>
                                </a>
                            </label>
                        </div>

                    </div>
                    <div>
                        <span>
                        <label className='text-sm font-medium text-gray-600 py-3'>New to UltraXpert?</label><a 
                                    href="/register"
                                    className="cursor-pointer tracking-tighter border-gray-200 hover:border-gray-400 ml-1 text-sm font-medium text-gray-600 underline">Create account</a></span>
                    </div>
                    <div>
                    {login === "logging In"?<Spinner/>:
                        <button className='bg-blue-700 text-lg text-white font-medium  w-1/2 mb-2 py-2  disabled:bg-gray-400 disabled:cursor-not-allowed mx-auto rounded-2xl'
                         disabled={!isValid}
                         type='submit'
                            
                           
                           >
                            Login   
                            </button>}
                    </div>

                </form>
               
                
            </>
        )    
    
}
