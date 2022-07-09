import { React, useRef, useState, Fragment, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Dialog, Transition } from '@headlessui/react';
import validator from 'validator'
import axios from 'axios';
import { useHistory } from 'react-router';
import Spinner from '../authentication/spinner';
import jwt from 'json-web-token';



// axios.defaults.withCredentials = true
export default function Mobile() {
    const [double, setdouble] = useState(true);
    const [btntxt, setbtntxt] = useState('Verify');
    const [field, setfield] = useState(false);
    const [verify, setverify] = useState(true);
    const [passwordShown, setPasswordShown] = useState(false);
    const[data_mobile,setdata_mobile] = useState('')
    let [isOpen, setIsOpen] = useState(false)
    let [isOpenerror, setIsOpenerror] = useState(false)
    let [isOTPerror, setIsOTPerror] = useState(false)
    let [registering, setregistering] = useState('')
    let[verifying,setverifying] = useState('')
    const[otpm,setotpm] = useState()

    




    //console.log(preloaddata)

    const { watch, register, handleSubmit, usewatch, formState: { errors, isValid } } = useForm({ mode: "all" });
    const { watch: watch2, register: register2, handleSubmit: handleSumbit2, getValues: getValue2, formState: { errors: error2, isValid: isValid2 } } = useForm({ mode: "all" })
    const onSubmit2 = (data, e) => console.log(data, e);

    const history = useHistory();
    const onSubmit = async (data, e) => {
        const cpassword = { 'password2': data.password1 }
        const temp_payload = {'username':data.username,'mobile':`+91${data.mobile}`,'password1':data.password1}
        const payload_data = Object.assign({}, temp_payload, cpassword);



        setregistering('logging In')
        await axios.post("/mobile_register/", payload_data

        ).then((response) => {
            if (response.status === 201) {
                console.log(response)
                const token = response.data.access_token
                const expert = response.data.user.is_expert
                const name = response.data.user.username
                localStorage.setItem("access_token", JSON.stringify(token))
                localStorage.setItem("expert", expert)
                localStorage.setItem("username", name)
                localStorage.setItem("profile_id",JSON.stringify(response.data.user.user_id))
                history.push('/')

            }

          
        }).catch((err) => { setIsOpenerror(true) });


    };


    const onError = (errors, e) => console.log(errors, e);
    const onError2 = (errors, e) => console.log(errors, e);




    const handleChange = () => {

        setPasswordShown(!passwordShown)

    };

    const check_mobile = async() =>{
        setverifying('verifying')
        const mobile_payload = {
            "mobile":""
        }
        mobile_payload['mobile'] = data_mobile
       
        await axios.post("/verification/", mobile_payload

        ).then((response) => {
           
            if (response.status === 200) {
                
                const encoded = response.data.value

                const key = "OOuLqOHvRyPJzCOSFO8M8U2Zvw0ofNaj"

                const decode = jwt.decode(key,encoded)
                const otpstr = JSON.stringify(decode.value.otp)
                const motp = otpstr.split("")
                setotpm(motp)
                openModal()

               
                
            
               
            }

            
        }).catch((err) => { setIsOpenerror(true) });


    }





    const mobile = watch("mobile", '')



    useEffect(() => {

        setdata_mobile(mobile)
        if (validator.isMobilePhone(mobile)) {
            setdouble(false)
        } else {
            setdouble(true)
        }
    }, [watch('mobile', '')])


  

    function closeModal() {
        const multipleValues = getValue2(["otp1", "otp2", "otp3", "otp4"]);
       
       

              
        if ((JSON.stringify(multipleValues) === JSON.stringify(otpm))) {
            setverifying('')
            setfield(true)
            setdouble(true)
            setbtntxt("Verified")
            setIsOpen(false)
            setverify(false)
        } else {
            setverifying('')
           
            setbtntxt("Verify again")
            setdouble(false)
            setIsOpen(false)
            setIsOTPerror(true)
            
           
        }



        
        

    }

    function openModal() {

        setIsOpen(true)
    }
    function closeModalerror() {
        setIsOpenerror(false)
        setregistering('')
        setverifying('')
    }
    function openModalOTPerror() {
        setIsOTPerror(true)
    }
    function closeModalOTPerror() {
        setIsOTPerror(false)
        
    }


    return (
        <>
        <Transition appear show={isOTPerror} as={Fragment}>
                <Dialog
                    //as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModalOTPerror}
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
                                    OTP Failed
                                </Dialog.Title>
                                <div className="mt-2">

                                    <div className='text-red-600 text-base text-justify'>
                                       Try With Correct OTP

                                    </div>



                                </div>

                                <div className="mt-4">

                                    <button
                                        type="button"
                                        className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModalOTPerror}
                                    >

                                        OK
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>



            <Transition appear show={isOpenerror} as={Fragment}>
                <Dialog
                    //as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModalerror}
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
                                    OTP Failed
                                </Dialog.Title>
                                <div className="mt-2">

                                    <div className='text-red-600 text-base text-justify'>
                                        Mobile Number is already present try it with different one!!

                                    </div>



                                </div>

                                <div className="mt-4">

                                    <button
                                        type="button"
                                        className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModalerror}
                                    >

                                        OK
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
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
                                    OTP Verification
                                </Dialog.Title>

                                <div className="container mx-auto">
                                    <div className="max-w-sm mx-auto md:max-w-lg">
                                        <div className="w-full">
                                            <div className="bg-white h-64 py-3 rounded text-center">
                                                <h1 className="text-2xl font-bold">OTP Verification</h1>
                                                <div className="flex flex-col mt-4"> <span>Enter the OTP you received at</span> <span className="font-bold">{data_mobile}</span> </div>
                                                <form key={1} onSubmit={handleSumbit2(onSubmit2, onError2)}>
                                                    <div id="otp" className="flex flex-row justify-center text-center px-2 mt-3">
                                                        <input className="m-2 border h-10 w-10 text-center form-control rounded"
                                                            type="text"
                                                            id="otp1"
                                                            maxlength="1"
                                                            name='otp1'
                                                            autoComplete='off'
                                                            required
                                                            {...register2("otp1", {
                                                                required: {
                                                                    value: true,

                                                                }
                                                            })} />
                                                        <input className="m-2 border h-10 w-10 text-center form-control rounded"
                                                            type="text"
                                                            id="otp2"
                                                            name='otp2'
                                                            maxlength="1"
                                                            autoComplete='off'
                                                            required
                                                            {...register2("otp2", {
                                                                required: {
                                                                    value: true,

                                                                }
                                                            })} />
                                                        <input className="m-2 border h-10 w-10 text-center form-control rounded"
                                                            type="text"
                                                            id="otp3"
                                                            maxlength="1"
                                                            name='otp3'
                                                            autoComplete='off'
                                                            required
                                                            {...register2("otp3", {
                                                                required: {
                                                                    value: true,

                                                                }
                                                            })} />
                                                        <input className="m-2 border h-10 w-10 text-center form-control rounded"
                                                            type="text"
                                                            id="otp4"
                                                            name='otp4'
                                                            maxLength="1"
                                                            autoComplete='off'
                                                            required
                                                            {...register2("otp4", {
                                                                required: {
                                                                    value: true,

                                                                }
                                                            })} />


                                                    </div>
                                                    <button
                                                        onClick={() => {

                                                            { closeModal() }


                                                        }}

                                                        disabled={!isValid2}
                                                        className="w-full h-auto inline-flex justify-center px-2 py-2 text-sm font-medium text-white bg-blue-800 border border-transparent rounded-lg hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                                    >
                                                        Confirm
                                                    </button>




                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>




                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>


            <form key={2} className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit, onError)}>
     
                <div className="w-3/3 px-3 mb-2 md:mb-0">
                    <label className="block uppercase tracking-wide  text-gray-800 text-xs font-bold float-left mt-3" htmlFor="firstname">
                        Mobile Number
                    </label>
                    <div className='relative'>
                        <input className="w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-2 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
                            id="mobile"
                            type="number"
                            name="mobile"
                            required
                            readOnly={field}

                            placeholder="7005604567"
                            {...register("mobile", {
                                required: {
                                    value: true,
                                    message: "Please type your mobile number."
                                }
                            })}
                        />
                        {errors.mobile && <p className='text-red-600 text-sm mt-1'>{errors.mobile.message}</p>}


                        <div className='absolute'>
                        {verifying === "verifying" ? <Spinner /> :
                            <button className='h-6 w-auto px-2 relative right-0 ... text-white bg-blue-800 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed '
                                disabled={double}
                                onClick={check_mobile}
                                type='button'
                            >
                                {btntxt}
                            </button>}
                        </div>
                    </div>
                </div>

                <div className="w-3/3 px-3 mb-2 md:mb-0">
                    <label className="block uppercase tracking-wide  text-gray-800 text-xs font-bold float-left mt-4" htmlFor="firstname">
                        Create Password
                    </label>
                    <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-2 px-4  leading-tight focus:outline-none focus:bg-white"

                        type={passwordShown ? "text" : "password"}


                        required
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,12}$"
                        placeholder="*********"
                        title="Atleast 1 Uppercase 1 Lowercase 1 Charater 1 Special Charater 1 Number must be there "


                        {...register("password1", {
                            required: {
                                value: true,
                                message: "Please create your password."
                            }
                        })}
                    />

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
                    {registering === "logging In" ? <Spinner /> :
                        <button className='bg-blue-700 text-lg text-white font-medium  w-full mb-2 py-2  disabled:bg-gray-400 disabled:cursor-not-allowed rounded-2xl'
                            disabled={((isValid) && (verify)) ? true : false}
                            type='submit'>
                            Create Account
                        </button>}
                </div>

            </form>

        </>
    )

}


