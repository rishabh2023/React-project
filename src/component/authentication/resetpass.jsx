import axios from 'axios';
import React, { useState,Fragment } from 'react'
import { useForm } from "react-hook-form";
import { Dialog, Transition } from '@headlessui/react'
import Spinner from './spinner'
import {BrowserRouter as Router,Switch,Route,Link,useHistory,Redirect} from "react-router-dom";


export default function  ResetPage() {
    const history = useHistory();
    const[loader,setloader] = useState("")
    let [isOpen, setIsOpen] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false);
    let [predata,setpredata] = useState(null)
    const { watch, register,handleSubmit,formState: { errors, isValid } } = useForm({ mode: "all" })
    const onSubmit = async(data, e) => {
      setloader("loading")
      await axios.post(`/reset/`,{"otp":data.OTP,"password":data.password,"password_confirm":data.password,'email':localStorage.getItem('email')}).then((res)=>{
        if (res.data.msg !== 'you have entered wrong otp'){
          setloader("")
          history.push('/login')

        }else{
          setIsOpen(true)
        }
       
       
      })
      
     
    
    };

    function closeModal() {
      setloader("")
      setIsOpen(false)
     
  }

  function openModal() {
    setIsOpen(true)
   
}



    const onError = (errors, e) => console.log(errors, e);
    const email = localStorage.getItem('email');
    
    console.log(email)

    if (!email){
        return(
        <Switch>
            <Redirect to="/"/>
        </Switch>);
    }

    
    const handleChange = () => {

      setPasswordShown(!passwordShown)

  };
    
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
                                   Password Resetting Failed
                                </Dialog.Title>
                                <div className="mt-2">

                                    <div className='text-red-600 text-base text-justify'>
                                        Your OTP or password pattern is incorrect please try again!!

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


      
        <div className=' bg-blue-700 flex flex-col items-start text-gray-900 antialiased relative h-screen'>
          <div className='container flex flex-col  my-auto items-center bg-blue-700 h-full'>
            <h1 className=' mt-8 text-5xl text-white mb-4'>UltraXpert</h1>
            <div className=' lg:px-6 w-auto  bg-white shadow-md border-gray-300 border-2 text-center rounded-xl  mb-10  mx-auto items-center'>
              <div className=''>
                <h1 className='text-blue-700 text-xl font-semibold mb-4 mt-4'>New Password</h1>
              </div>
              <div className='md:row object-cover object-center'>
              <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="w-3/3 px-3 mb-2 md:mb-0">
                        <label className="block uppercase tracking-wide  text-gray-800 text-xs font-bold float-left mt-4" htmlFor="firstname">
                            Enter OTP
                        </label>
                        <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
                            id="OTP"
                            type="number"
                            pattern='\d*'
                            name="OTP"
                            maxLength= "6"
                            placeholder="OTP"
                            autoComplete="off"
                            {...register("OTP", {
                                required: {
                                  value: true,
                                  message: "Please Enter OTP"
                                }
                              })}
                        />
                        {errors.otp && <p className='text-red-600 text-sm -mt-2 mb-2'>{errors.otp.message}</p>}
                    </div>
                    <div className="w-3/3 px-3 mb-2 md:mb-0">
                        <label className="block uppercase tracking-wide  text-gray-800 text-xs font-bold float-left mt-4" htmlFor="firstname">
                            New Password
                        </label>
                        <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="password"
                            type={passwordShown ? "text" : "password"}
                            name="password"
                            placeholder="*********"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,12}$"
                            {...register("password", {
                                required: {
                                  value: true,
                                  message: "Please type your correct password"
                                }
                              })}
                        />
                        {errors.password && <p className='text-red-600 text-sm -mt-3 mb-2'>{errors.password.message}</p>}
                    </div>
                    <div className='w-3/3 px-3 mb-2 md:mb-0 flex'>
                    <input type="checkbox"

                        className="leading-loose float-left mt-1"
                        onChange={handleChange}
                    />
                    <label className="block text-gray-500 font-semibold float-left">
                        <span className="text-sm text-gray-600 leading-snug px-1">
                            Show Password </span>
                    </label>




                </div>
                    
                        
                    <div>
                      {loader === 'loading'?<Spinner/>:
                        <button className='bg-blue-700 text-lg text-white font-medium rounded w-full mb-2 py-2  disabled:bg-gray-400 disabled:cursor-not-allowed'
                         disabled={!isValid}
                       
                         type='submit'>
                             Confirm
                            </button>
}
                    </div>

                </form>    
                
              </div>
            </div>
          </div>
        </div>
        
      </>
    )
  
}
