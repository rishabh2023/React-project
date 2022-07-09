import React, { useState,Fragment } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import { Dialog, Transition } from '@headlessui/react';
import jwt_decode from "jwt-decode";
import axiosInstance from '../../utils/AxiosInstance';
import Spinner from '../authentication/spinner';
import Navbar from '../home/navbar';

export default function BankDetails() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "all" })
    const history = useHistory();
    let [send, setsend] = useState("");
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
        history.push('/dashboard/wallet')
       
    }

    const onSubmit = async (data, e) => { 
       
        var decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));
        const data_payload = Object.assign({}, data,{'user':decoded.user_id});
        setIsOpen(true)
        await axiosInstance.post('/user/bank_detail_create/',data_payload).then((res)=>{
            const resp = axiosInstance.post('/vault/')
           
           
          
            
        }).catch((err)=>{
            console.log(err)
        }) 
    }
    const onError = (err, e) => { console.log(err) }
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
                                    Congratulations
                                </Dialog.Title>
                                <div className="mt-2">

                                    <div className='text-green-600 text-base text-justify'>
                                        Wallet Activated Now your money will reflect and settle into your account.
                                    </div>



                                </div>

                                <div className="mt-4">

                                    <button
                                        type="button"
                                        className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >

                                        Ok
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
            <Navbar />

            <h1 className='text-2xl font-semibold text-center'>Bank Details</h1>

            <div className='container bg-gray-100 w-full ml-2 mr-2 lg:w-1/2 mx-auto border-gray-300 border-2 rounded-3xl my-8 justify-center h-auto' style={{textAlign:"-webkit-center"}}>
                <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit, onError)}>

                    <div className="w-3/3 px-3 mb-2 md:mb-0">
                        <label className="block uppercase tracking-wide  text-gray-800 text-xs font-bold float-left mt-4" htmlFor="account_holder">
                            Account holder Name
                        </label>
                        <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
                            id="account_holder"
                            type="text"
                            name="account_holder"
                            placeholder="Ramesh Kumar"
                            {...register("account_holder", {
                                required: {
                                    value: true,
                                    message: "Account holder name is required"
                                }
                            })}
                        />
                        {errors.account_holder && <p className='text-red-600 text-sm -mt-2 mb-2'>{errors.account_holder.message}</p>}
                    </div>

                    <div className="w-3/3 px-3 mb-2 md:mb-0">
                        <label className="block uppercase tracking-wide  text-gray-800 text-xs font-bold float-left mt-4" htmlFor="bank_name">
                            Bank Name
                        </label>
                        <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
                            id="bank_name"
                            type="text"
                            name="bank_name"
                            placeholder="State Bank Of India"
                            {...register("bank_name", {
                                required: {
                                    value: true,
                                    message: "Bank name is required"
                                }
                            })}
                        />
                        {errors.bank_name && <p className='text-red-600 text-sm -mt-2 mb-2'>{errors.bank_name.message}</p>}
                    </div>

                    <div className="w-3/3 px-3 mb-2 md:mb-0">
                        <label className="block uppercase tracking-wide  text-gray-800 text-xs font-bold float-left mt-4" htmlFor="bank_name">
                            Account Number
                        </label>
                        <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
                            id="account_number"
                            type="text"
                            name="account_number"
                            placeholder="2234567857"
                            {...register("account_number", {
                                required: {
                                    value: true,
                                    message: "Account Number is required"
                                }
                            })}
                        />
                        {errors.account_number && <p className='text-red-600 text-sm -mt-2 mb-2'>{errors.account_number.message}</p>}
                    </div>


                    <div className="w-3/3 px-3 mb-2 md:mb-0">
                        <label className="block uppercase tracking-wide  text-gray-800 text-xs font-bold float-left mt-4" htmlFor="bank_name">
                            IFSC
                        </label>
                        <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
                            id="ifsc_code"
                            type="text"
                            name="ifsc_code"
                            placeholder="SBI000345678"
                            {...register("ifsc_code", {
                                required: {
                                    value: true,
                                    message: "IFSC is required"
                                }
                            })}
                        />
                        {errors.ifsc_code && <p className='text-red-600 text-sm -mt-2 mb-2'>{errors.ifsc_code.message}</p>}
                    </div>






                    <div className="w-3/3 px-3 mb-2 md:mb-0  text-right">

                        {send === 'sending' ? <Spinner /> :
                            <button
                                className="container text-center   w-auto   shadow-md text-white font-semibold bg-green-500 border-2  px-4 py-2 pr-8 rounded-xl  leading-tight focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed "
                                disabled={!isValid}
                                type='submit'



                            > Submit</button>}


                    </div>


                </form>


            </div>






        </>

    )
}