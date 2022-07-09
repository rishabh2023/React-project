import React, { Fragment, useState,useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react'
import Navbar from "../home/navbar";
import axiosInstance from "../../utils/AxiosInstance";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function Update() {


  const [name, setName] = useState("");
  const [tempname,settempname] = useState("");
  const [Lname, setLName] = useState("");
  const [tempLname,settempLname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("*******");
  const [image, setImage] = useState(
    "https://img.icons8.com/color/144/000000/person-male.png"
  );
  let [isOpenName, setIsOpenName] = useState(false)
  let [isOpenEmail, setIsOpenEmail] = useState(false)
  let [isOpenMobile, setIsOpenMobile] = useState(false)
  let [isOpenPassword, setIsOpenPassword] = useState(false)
  let [isOpenProfile, setIsOpenProfile] = useState(false)



  function closeModalName() {
    setIsOpenName(false)

  }
  function openModalName() {
    setIsOpenName(true)

  }

  function closeModalEmail() {
    setIsOpenEmail(false)

  }

  function openModalEmail() {
    setIsOpenEmail(true)

  }

  function closeModalMobile() {
    setIsOpenMobile(false)

  }

  function openModalMobile() {
    setIsOpenMobile(true)

  }

  function closeModalPassword() {
    setIsOpenPassword(false)

  }

  function openModalPassword() {
    setIsOpenPassword(true)

  }

  function openModalProfile() {
    setIsOpenProfile(true)

  }
    function closeModalProfile(){
      setIsOpenProfile(false)
  
    }



  const imageHandler = async(e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result)
       
      }
    }
    reader.readAsDataURL(e.target.files[0])

    const formdata = new FormData();
    formdata.append('file', e.target.files[0])
    formdata.append('filetype', '.png')
    formdata.append('name', `45645.png`)

    const response = await axios.post('/file/upload/', formdata)

    var decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));
    await axiosInstance.patch(`/user/profile/${decoded.user_id}/`, {"profile_img":response.data.url}).then((res) => {setIsOpenProfile(true)})
  }

  const getData = async() =>{
    var decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));
    await axiosInstance.get(`/user/profile/${decoded.user_id}/`).then((resp) => {
      if (resp.data.profile_img !== ''){
        setImage(resp.data.profile_img)
      }
      
      console.log(resp.data)
      setName(resp.data.first_name)
      setLName(resp.data.last_name)

     
  })
  }

  useEffect(() => {
    getData();
  },[])

  const editFname = (e) =>{
    settempname(e.target.value)
  }

  const editLname = (e) =>{
    settempLname(e.target.value)
  }

  const submitFName = async() =>{
     
      setName(tempname)
      var decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));
      await axiosInstance.patch(`/user/profile/${decoded.user_id}/`, {"first_name":tempname}).then((res) => {setIsOpenName(false)})
    
  }

  const submitLName = async() =>{
   
    setLName(tempLname)
    var decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));
    await axiosInstance.patch(`/user/profile/${decoded.user_id}/`, {"last_name":tempLname}).then((res) => {setIsOpenEmail(false)})
}
  
  return (
    <>
      <Navbar />

      
      <Transition appear show={isOpenProfile} as={Fragment}>
        <Dialog
          //as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalProfile}
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
                  Congratulations!
                </Dialog.Title>
                <div className="mt-3">

                 <p className="text-base font-medium">Your Profile Photo has been Changed.</p>



                </div>

                <div className="mt-4">

                  <button
                    type="button"
                    className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModalProfile}
                  >

                    OK
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>


      <Transition appear show={isOpenName} as={Fragment}>
        <Dialog
          //as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalName}
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
                  Your First Name
                </Dialog.Title>
                <div className="mt-3">

                  <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-2 px-4 mb-2 mt-2 leading-tight focus:outline-none focus:bg-white"
                    id="username"
                    type="text"
                    placeholder="Enter Your Name"
                    onChange={(e) =>{
                      editFname(e);
                    }
                      
                    }

                  />



                </div>

                <div className="mt-4">

                  <button
                    type="button"
                    className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={submitFName}
                  >

                    OK
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpenEmail} as={Fragment}>
        <Dialog
          //as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalEmail}
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
                  Your Last Name
                </Dialog.Title>
                <div className="mt-3">

                  <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-2 px-4 mb-2 mt-2 leading-tight focus:outline-none focus:bg-white"
                    id="email"
                    type="text"
                    placeholder="Enter Your email"
                    onChange={(e) =>{
                      editLname(e);
                    }
                      
                    }

                  />



                </div>

                <div className="mt-4">

                  <button
                    type="button"
                    className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={submitLName}
                  >

                    OK
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpenMobile} as={Fragment}>
        <Dialog
          //as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalMobile}
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
                  Mobile Number
                </Dialog.Title>
                <div className="mt-3">

                  <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-2 px-4 mb-2 mt-2 leading-tight focus:outline-none focus:bg-white"
                    id="mobile"
                    type="number"
                    placeholder="Enter Your Mobile Number"

                  />



                </div>

                <div className="mt-4">

                  <button
                    type="button"
                    className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModalMobile}
                  >

                    OK
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpenPassword} as={Fragment}>
        <Dialog
          //as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalPassword}
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
                  Change Password
                </Dialog.Title>
                <div className="mt-3">

                  <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-2 px-4 mb-4 mt-2 leading-tight focus:outline-none focus:bg-white"
                    id="password"
                    type="text"
                    placeholder="Password"

                  />

                  <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-2 px-4 mb-2 mt-2 leading-tight focus:outline-none focus:bg-white"
                    id="cpassword"
                    type="text"
                    placeholder="New Password"

                  />



                </div>

                <div className="mt-4">

                  <button
                    type="button"
                    className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModalPassword}
                  >

                    OK
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>





      <h1 className="text-center text-xl font-bold from-secondary mt-2">Your Account Setting</h1>

      <div className="flex relative insert-0 py-16 justify-center mt-6">
        <div className=" flex flex-col w-full mx-4 md:w-1/2  shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4">
          <div className="grid place-items-center justify-center">
            <img className="border rounded-full w-20 h-20 text-center" src={image} />
            <input
              className="hidden"
              name="img"
              type="file"
              id="input"
              onChange={imageHandler}
            />
            <label htmlFor="input">

              <img
                className="cursor-pointer mx-4"
                src="https://img.icons8.com/material-outlined/24/000000/add-image.png"
              />
            </label>
          </div>
        
          <div>
          <h1 className="text-center text-sm font-semibold text-gray-900">Change Your Profile Pic</h1>
          </div>
          <div className="grow mb-4">
            <label className="block font-bold border p-2 text-gray-700 text-sm  mb-2">
              First Name
              <button className="bg-yellow-300 float-right mt-2 p-1 rounded-sm px-2"
                onClick={openModalName}>Edit</button>
              <p className="font-light">{name}</p>
            </label>
          </div>
          <div className="grow mb-4">
            <label className="block font-bold border p-2 text-gray-700 text-sm  mb-2 px-2">
              Last Name
              <button className="bg-yellow-300 float-right mt-2 p-1 rounded-sm px-2"
                onClick={openModalEmail}>Edit</button>
              <p className="font-light">{Lname}</p>
            </label>
          </div>
       {/* <div className="grow mb-4">
            <label className="block font-bold border p-2 text-gray-700 text-sm  mb-2">
              Mobile No.
              <button className="bg-yellow-300 float-right mt-2 p-1 rounded-sm px-2"
                onClick={openModalMobile}>Edit</button>
              <p className="font-light">{number}</p>
            </label>
          </div>
          <div className="grow mb-4">
            <label className="block font-bold border p-2 text-gray-700 text-sm  mb-2">
              Password
              <button className="bg-yellow-300 float-right mt-2 p-1 rounded-sm px-2"
                onClick={openModalPassword}>Edit</button>
              <p className="font-light">{password}</p>
            </label>
          </div>  */}
  </div>
      </div> 

    </>
  );
  }