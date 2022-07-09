import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Tab } from '@headlessui/react';
import { Dialog, Transition } from '@headlessui/react'
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router'
import { FaHome,FaTwitter } from 'react-icons/fa';
import Spinner from './spinner';
import Email from './email'
import Mobile from './mobile'






export default function Login() {
  const history = useHistory();
  const [loading, setloading] = useState('');
  const [linkedinloading, setlinkedinloading] = useState('');
  let [isOpen, setIsOpen] = useState(false)
  let [isOpentoken, setIsOpentoken] = useState(false)

  function closeModal() {
    setIsOpen(false)
    setloading('')
  }

  function openModal() {
    setIsOpen(true)
    setloading('')
  }

  function closeModaltoken() {
    setIsOpentoken(false)
    sessionStorage.removeItem('ismsg')
    
  }

  function openModaltoken() {
    setIsOpentoken(true)
    
  }

  useEffect(() => {
    {sessionStorage.getItem("ismsg")?setIsOpentoken(true):setIsOpentoken(false)}

    if (localStorage.getItem('access_token')) {
      history.push('/')
    }
  })

  




  const responseGoogle = (response) => {
    setloading('loading')
    console.log(response)



    axios.post('/google/', {
      access_token: response.accessToken,
    }).then((res) => {
      console.log(res.data)
      localStorage.setItem("access_token", JSON.stringify(res.data.access_token))
      localStorage.setItem("expert", res.data.user.is_expert)
      localStorage.setItem("username", res.data.user.username)
      localStorage.setItem("profile_id", JSON.stringify(res.data.user.user_id))
      window.location.reload(false)

    }).catch((err) => {
      setIsOpen(true)
      console.log(err)

    })

  }


  const { linkedInLogin } = useLinkedIn({
    clientId: '86ovpm14ha8iwc',
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: (code) => {
      setlinkedinloading('loading')
      
    axios.post('/linkedin/', {
      access_token: code,
    }).then((res) => {
      console.log(res.data)
      localStorage.setItem("access_token", JSON.stringify(res.data.access_token))
      localStorage.setItem("expert", res.data.user.is_expert)
      localStorage.setItem("username", res.data.user.username)
      localStorage.setItem("profile_id", JSON.stringify(res.data.user.user_id))
      window.location.reload(false)
      setlinkedinloading('')

    }).catch((err) => {
      setIsOpen(true)
      console.log(err)

    })
    },
    
    onError: (error) => {
      
    },
  });


  return (
    <>

    
<Transition appear show={isOpentoken} as={Fragment}>
        <Dialog
          //as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModaltoken}
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
                  Something Went Wrong!
                </Dialog.Title>
                <div className="mt-2">

                  <div className='text-red-600 text-base text-justify'>
                  You logged out because of some security policy please login again!
                  </div>



                </div>

                <div className="mt-4">

                  <button
                    type="button"
                    className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModaltoken}
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
                    Your email id is already exist please try again with password!!
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
          <h1 className=' mt-6 text-4xl text-white mb-4'>UltraXpert</h1>
          <div className=' lg:px-6 w-auto  bg-white shadow-md border-gray-300 border-2 text-center rounded-xl  mb-10  mx-auto items-center'>

            <div className='text-center'
              onClick={() => {
                history.push('/')
              }}>


              <h1
                className='text-blue-700 text-xl font-semibold mb-4 mt-4 text-center '>  <button className='mt-1.5 mr-2'
                >
                  <FaHome />
                </button>
                Back to home 
              </h1>
            </div>




            <div className='md:row object-cover object-center'>
              <Tab.Group manual>
                <Tab.List className="row-span m-auto lg:m-4 ">
                  <Tab className={({ selected }) => (selected ? 'font-lg bg-blue-500 text-white rounded px-3 py-1 mx-1' : '  text-gray-500 hover:bg-blue-400 hover:text-white px-3  rounded py-1')}>Login with Email</Tab>
                  {/* <Tab className={({ selected }) => (selected ? ' font-lg bg-blue-500 text-white rounded px-3 py-1 mx-1' : 'text-gray-500 hover:bg-blue-400 hover:text-white px-3 rounded py-1')}>Login with Mobile</Tab> */}

                </Tab.List>
                <Tab.Panels>

                  <Tab.Panel><Email /></Tab.Panel>
                  <Tab.Panel><Mobile /></Tab.Panel>

                </Tab.Panels>
              </Tab.Group>


            </div>
            <div className="text-sm text-gray-700 font-semibold">OR WITH</div>
            <div className="flex flex-col w-full">
              <div className="flex justify-center ">
{/* 
                <FacebookLogin
                  appId="478150923877417"
                 
                  callback={responseFacebook}



                  render={renderProps => (
                    <button onClick={renderProps.onClick}
                      className="rounded-full border-2 bg-blue-800 text-white leading-normal uppercase hover:bg-blue-500 hover:bg-opacity-10 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-10 h-10 m-2 mr-1"
                    >
                      <svg aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="facebook"
                        className="w-3 h-full mx-auto"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                      >
                        <path
                          fill="currentColor"
                          d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                        ></path>
                      </svg>
                    </button>
                  )}
                /> */}

              {/* <TwitterLogin
                    authCallback={authHandler}
                    consumerKey="fbGY3lJ4ZcZ9Z4vEXvx67HL0O"
                    consumerSecret="6LIhie8N871Aq3iA8ZTe9BJEKJ9oVmMmFgyG5Ht8eOXPtAp8dM"
                    children = {  <button
                    className="rounded-full border-2  bg-blue-600 text-white  leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-10 h-10 m-2 ml-5  " >
                <img src="https://img.icons8.com/officel/48/000000/twitter-circled.png"/>
                      </button>}
                  /> */}






                <GoogleLogin
                  clientId="109585241463-6rbihejl9mtku8luui7gbl09o24utvul.apps.googleusercontent.com"
                  onSuccess={responseGoogle}

                  render={renderProps => (loading === 'loading' ? <Spinner /> : <button onClick={renderProps.onClick} className="rounded-full border-2 bg-yellow-500 text-white  leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-10 h-10 m-2 " > 
                  <svg aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    className="w-4 h-full mx-auto"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  </button>)}
                />


                  { linkedInLogin === 'loading'?<Spinner/>:
                <button onClick={linkedInLogin}
                  className="rounded-full border-2  bg-blue-600 text-white  leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-10 h-10 m-2" >
                      <img src="https://img.icons8.com/fluency/48/000000/linkedin.png"/>
                    </button>
}

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )

}

