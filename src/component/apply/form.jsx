import axios from 'axios';
import { useForm } from "react-hook-form"
import { useHistory } from 'react-router';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, React,useEffect } from 'react'
import jwt_decode from "jwt-decode";
import axiosInstance from '../../utils/AxiosInstance';
import Spinner from '../authentication/spinner';

const MAX_STEPS = 4
const TagsInput = (props) => {

  const [tags, setTags] = useState(props.tags);
  const [tagValue, setTagValue] = useState("");

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (tagValue !== "" || event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      setTags([...tags, tagValue]);
      event.target.value = "";

      props.selectedTags([...tags, tagValue]);
      setTagValue('');
    }


  };
  return (
    <div className="flex items-start flex-wrap ">
      <ul className="flex flex-wrap space-x-1">
        {tags.map((tag, index) => (
          <li key={index} className="items-center cursor-pointer ml-1 text-xs inline-flex font-bold leading-sm uppercase px-2 py-1 bg-green-200 text-green-700 rounded-full m-2 ">
            <span className="mx-1.5">{tag}</span>
            <span className="rounded-full h-4 w-4 my-1 flex justify-center items-center" onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        class="block appearance-none w-full bg-gray-100 border-2 border-blue-300 hover:border-blue-700 px-4 py-2 pr-8 rounded  leading-tight focus:bg-white focus:border-blue-800 focus:outline-none focus:shadow-outline"
        type="text"
        maxLength="12"
        placeholder="Skill Related Keywords"
        value={tagValue}
        onKeyUp={(event) => (event.which === 32 ? addTags(event) : null)}
        required onChange={(e) => setTagValue(e.target.value)}
      />
      <button className="bg-blue-800 py-1 my-2 rounded-xl justify-items-center text-sm text-white font-medium px-2"
        onClick={addTags}>Add Tag</button>

    </div>
  );
};



export default function Form() {
  const [mtag, setmtag] = useState();
  const [applying, setapplying] = useState('');
  const [formstep, setformstep] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [check,setchecked] = useState('not')
  const [bio,setbio] = useState('')
  let [biodata,setbiodata] = useState(`Hello,\n
  As you know my name and from India I am having experience of some around mentioned years and
  I am the expert in my field and I am very greatful to that you are taking look on my description.
  I am very hardworking and ambitious man.If you book my service I will give my 100%.\n
  Thankyou `)
  
  const [info,setinfo] = useState(false)
  const { register, handleSubmit,setValue, formState: { errors, isValid } } = useForm({ mode: "all" })
  const completeFormStep = () => {
    setformstep(cur => cur + 1)
  }
  const lesscompleteFormStep = () => {
    setformstep(cur => cur - 1)
  }
  const renderButton = () => {
    if ((formstep > 3) || (formstep < 0)) {
      return undefined
    } else if ((formstep <= 2) && (formstep >= 1)) {
    
      return (
        
        <div>
          <button
            disabled={!isValid}
            onClick={completeFormStep}
            type="button"
            className="mt-3 row float-right bg-blue-600 text-white rounded px-4 py-1 w-30 mr-2 disabled:bg-gray-400 disabled:cursor-not-allowed "
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span>Next</span>
          </button>

          <button
            onClick={lesscompleteFormStep}
            type="button"
            className="mt-3 row float-left bg-blue-600 text-white rounded px-4 py-1 w-30 ml-2 disabled:bg-gray-400 disabled:cursor-not-allowed "
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Prev</span>
          </button>
        </div>)
    } else if (formstep === 0) {
      return (
        <>
          <button
            disabled={!isValid}
            onClick={completeFormStep}
            type="button"
            className="mt-3 row float-right bg-blue-600 text-white rounded px-4 py-1 w-30 mr-2 disabled:bg-gray-400 disabled:cursor-not-allowed "
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span>Next</span>
          </button>
          <button

            onClick={() => {
              history.push('/')
            }}
            type="button"
            className="mt-3 row float-left bg-blue-600 text-white rounded px-4 py-1 w-30 mr-2 ml-2 disabled:bg-gray-400 disabled:cursor-not-allowed "
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 space-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Go Home</span>
          </button>
        </>



      )
    } else {
      return (
        <div>
          {applying === "applying" ? <Spinner /> :
            <button
              disabled={!isValid}
              type="submit"
              className="mt-3 row float-right bg-green-600 text-white rounded px-4 py-1 w-30 mr-2 disabled:bg-gray-400 disabled:cursor-not-allowed "
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span>Done</span>
            </button>}

          <button
            onClick={lesscompleteFormStep}
            type="button"
            className="mt-3 row float-left bg-blue-600 text-white rounded px-4 py-1 w-30 ml-2 disabled:bg-gray-400 disabled:cursor-not-allowed "
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Prev</span>
          </button>
        </div>)

    }
  }




  const selectedTags = (tags) => {

    setmtag(tags)

  };



  const history = useHistory();



  function closeModal() {
    setapplying('')
    setIsOpen(false)

  }
  function closeModalinfo() {
   
    setinfo(false)

  }
  
  useEffect(() => {

}, [check])



  
  const selectShortlistedApplicant = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setchecked('yes')
      setbio('Now need to worry about this just leave it ....')
      setinfo(true)

    
      //setValue('description',bio)
     console.log("checked")
    } else {
      setbio('')
      setchecked(false)
    }
  };

 
  const onSubmit = async (data, e) => {
    setapplying('applying')
    
    
    //const mtag_dict = {"keywords":mtag}
    const data_payload = Object.assign({}, data);
    const formdata = new FormData();
    formdata.append('file', data.profile[0])
    formdata.append('filetype', '.png')
    formdata.append('name', `${data.firstname}.png`)
    const urldict = {'profile_img':''}
    if (data.profile.length === 0){
      urldict['profile_img'] = ''

    
  }
    
    else{

      const response = await axios.post('/file/upload/', formdata)
      urldict['profile_img'] =  `${response.data.url}` 
     
     
    }

    const data_payload1 = Object.assign({}, data_payload, urldict);
    delete data_payload1['profile'];


      
  
    var decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));
    if ((check==='not')&& (data.description !== '')){
      console.log('hello')
      await axiosInstance.patch(`/user/profile/${decoded.user_id}/`, data_payload1).then((res) => {
      localStorage.setItem('expert', true)


    }).catch((err) => {
      setIsOpen(true)
    });

    }

    else{
   

   
    


      const disdict = { "description": `${biodata}` }
      
      const data_payload2 = Object.assign({}, data_payload1, disdict);
     



      await axiosInstance.patch(`/user/profile/${decoded.user_id}/`, data_payload2).then((res) => {
        localStorage.setItem('expert', true)
  
  
      }).catch((err) => {
        setIsOpen(true)
      });
    }

    await axiosInstance.post("user/user_plan_selection/", {
      "select_plan": 3
    }).then((res) => {
      const resp = axiosInstance.post("/meet/meeting_vault/")
      history.push('/')
      window.location.reload(false)

    }).catch((err) => { console.log(err) })

  }
  const onError = (errors, e) => console.log(errors, e);




  return (
    <>
     <Transition appear show={info} as={Fragment}>
        <Dialog
          //as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalinfo}
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
                  Keep on us!
                </Dialog.Title>
                <div className="mt-2">

                  <div className='text-green-500 text-base text-justify'>
                   We will write bio for you.No worries just continue...
                  </div>



                </div>

                <div className="mt-4">

                  <button
                    type="button"
                    className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModalinfo}
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
                  Failed!
                </Dialog.Title>
                <div className="mt-2">

                  <div className='text-red-600 text-base text-justify'>
                    Opps..! getting some errors while processing your data please try again!

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

      <div className="min-h-screen bg-blue-900 flex flex-col items-start text-gray-900 antialiased relative">
        <div
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 80%, 0% 100%)",
            height: "34rem",
          }}
          className="absolute bg-blue-800 inset-x-0 top-0"
        ></div>
        <div className="mx-auto z-10 mt-1 text-center lg:text-4xl">
          <h1 className="text-white font-semibold text-2xl">
            Welcome to <span className="text-yellow-400">UltraXpert</span>
          </h1>
          <p className="text-green-200 mt-2">
            Become an Expert in Just 4 easy steps
          </p>
        </div>
        <div className="max-w-xl w-full lg:mt-2 rounded-lg  mx-auto overflow-hidden z-10 h-auto">
          <div className="lg:mx-auto w-3/3 lg:w-2/3 border-gray-300 border-2  my-10  bg-white rounded-3xl">
            <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit, onError)}>
              {formstep === 0 && (
                <section>
                  <h2 className="font-semibold text-xl mb-3 ml-3">
                    Step {formstep + 1} of {MAX_STEPS}
                  </h2>
                  <div className=''>
                    <div class="w-3/3 px-3 mb-6 md:mb-0">
                      <label class="block uppercase tracking-wide  text-gray-700 text-xs font-bold" htmlFor="firstname">
                        First Name
                      </label>
                      <input class="appearance-none block w-full text-sm bg-blue-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="firstname"
                        type="text"
                        name="firstname"
                        placeholder="Your First Name"
                        {...register("first_name", {
                          required: {
                            value: true,
                            message: "Please type Your First Name"
                          }
                        })} />
                      {errors.firstname && <p className='text-red-600 text-sm -mt-3 mb-2'>{errors.firstname.message}</p>}

                    </div>

                    <div class="w-full w-3/3 px-3">
                      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="lastname">
                        Last Name
                      </label>
                      <input class="appearance-none block w-full bg-blue-100 text-gray-700 border-2 border-blue-400 rounded focus:border-blue-600  py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        id="last_name"
                        type="text"
                        placeholder="Your Last Name"
                        {...register("last_name", {
                          required: {
                            value: true,
                            message: "Please type Your Last Name"
                          }
                        })} />
                      {errors.lastname && <p className='text-red-600 text-sm mt-1 mb-2'>{errors.lastname.message}</p>}
                    </div>
                    <div class="w-full w-3/3 px-3  mt-4">
                      <span class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Gender</span>
                      <div class="mt-2">
                        <label class="inline-flex items-center">
                          <input type="radio"
                            class="form-radio"
                            name="gender"
                            value="Male"
                            {...register("gender", {
                              required: {
                                value: true
                              }
                            })} />

                          <span class="ml-2">Male</span>
                        </label>
                        <label class="inline-flex items-center ml-6">
                          <input type="radio"
                            class="form-radio"
                            name="gender"
                            value="Female"
                            {...register("gender")} />
                          <span class="ml-2">Female</span>
                        </label>
                      </div>
                    </div>
                    <div class="w-full w-3/3 px-3  mt-4">
                      <label for="country" class="block text-sm font-medium text-gray-700">Country / Region</label>
                      <select
                        id="country"
                        name="country"
                        autocomplete="country"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option {...register("country", {
                          required: {
                            value: true,
                          }
                        })}>
                          India</option>
                      </   select >
                    </div>
                  </div>

                </section>

              )}


              {formstep === 1 && (
                <section>
                  <h2 className="font-semibold text-xl mb-3 ml-2">Step {formstep + 1} of {MAX_STEPS}</h2>
                  <div>
                    <div class="w-3/3 px-3 mb-3 md:mb-0">
                      <label class="block uppercase tracking-wide  text-gray-700 text-xs font-bold" htmlFor="title">
                        Profession
                      </label>
                      <input class="appearance-none block w-full text-md bg-blue-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Express Your Profession in single line"
                        {...register("title", {
                          required: {
                            value: true,
                            message: "Please type your Profession you can update it."
                          }
                        })} />
                      {errors.title && <p className='text-red-600 text-sm -mt-3 mb-2'>{errors.title.message}</p>}
                    </div>
                    <div className='w-full w-3/3 px-3  mt-3'>
                      <label class="block uppercase tracking-wide  text-gray-700 text-xs font-bold" htmlFor="bio">
                        Bio
                      </label>

                      <textarea class="w-full h-72 appearance-none block text-md bg-blue-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-2 px-2 mb-2 leading-tight focus:outline-none focus:bg-white"
                        placeholder="About Yourself"
                        
                        defaultValue= {bio}
                        {...register("description", {
                          required: {
                            value:check==='no'?true:false,
                            message: "Please type your bio you can also update it."
                          }
                        })}
                      >
                           
                      </textarea>
                     
                    

                    </div>
                    <div className='w-full w-3/3 px-3  mt-2'>
                      <label className="block text-gray-500 font-semibold my-2">

                        <input type="checkbox"
                          className="leading-loose"
                          value="1"
                            onClick={(e) => {
                                selectShortlistedApplicant(e);
                            }}
                        
                         
                          
                        />
                        <span className="py-2 text-sm text-gray-600 leading-snug px-1">
                          Auto Fill </span>
                      </label>




                    </div>
                  </div>

                </section>
              )}

              {formstep === 2 && (
                <section>
                  <h2 className="font-semibold text-xl mb-3 ml-2">Step {formstep + 1} of {MAX_STEPS}</h2>
                  <div>
                    {/* <div className='w-3/3 px-3 mb-2 md:mb-0 mt-1'>
                      <label class="block uppercase tracking-wide  text-gray-700 text-xs font-bold" htmlFor="sillset">
                        Skill Set
                      </label>
                      <TagsInput selectedTags={selectedTags} tags={[]}
                      />
                    </div> */}
                    <div className='w-full w-3/3 px-3  mt-1'>
                      <label class="block uppercase tracking-wide  text-gray-700 text-xs font-bold" htmlFor="education">
                        Education
                      </label>
                      <select
                        id="education"
                        name="education"
                        autocomplete="education"
                        class="mt-1 mb-2 block w-full py-2 px-3 border-2 border-blue-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("education", {
                          required: {
                            value: true,
                          }
                        })}>
                        <option>
                          High School</option>
                        <option >
                          Secondary School</option>
                        <option>
                          Under Graduate</option>
                        <option >
                          Post Graduate</option>
                        <option>
                          Secondary School</option>
                        <option >
                          Phd</option>
                      </select >

                    </div>
                    <div className='w-full w-3/3 px-3  mt-3'>
                      <label class="block uppercase tracking-wide  text-gray-700 text-xs font-bold mt-2" htmlFor="education">
                        Years of Experience
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        autocomplete="experience"
                        class="mt-2 block w-full py-2 px-3 border-2 border-blue-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("experience", {
                          required: {
                            value: true,
                          }
                        })}>
                        <option>
                          0-1</option>
                        <option >
                          1-2</option>
                        <option>
                          2-5</option>
                        <option >
                          5-10</option>
                        <option>
                          10-12</option>
                        <option >
                          12-17</option>
                        <option >
                          17+</option>

                      </select >

                    </div>
                    <div className='w-full w-3/3 px-3 '>
                      <label class="block uppercase tracking-wide  text-gray-700 text-xs font-bold mt-2" htmlFor="education">
                        profile

                      </label>
                  
                     
                        <input 
                        type="file"

                          className="object-center block w-full px-2 py-2 shadow-md text-sm font-normal text-gray-600 bg-gray-100 border-2 border-blue-300 hover:border-blue-700  bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-600 focus:bg-white focus:border-blue-600 focus:outline-none file:border-2 file:rounded-full"
                          name="profile"
                          accept=" .png, .jpg, .jpeg"

                          {...register("profile")
                          }

                        />
                        {errors.description && <p className='text-red-600 text-sm -mt-3 mb-2'>{errors.description.message}</p>}



                    

                  
                    </div>


                  </div>




                </section>
              )}
              {formstep === 3 && (
                <section>
                  <h2 className="font-semibold text-xl mb-3 ml-2">Step {formstep + 1} of {MAX_STEPS}</h2>
                  <div className="block mt-6">
                    <input
                      name="toc"
                      className=" mx-3 p-3 text-blue-600 rounded mr-3 border-2 border-gray-300 ring-0 focus:ring-0 focus:ring-offset-0 focus:border-0 cursor-pointer"
                      type="checkbox"
                      {...register("toc", {
                        required: {
                          value: true,
                          message: "Please accept the terms and condition"
                        }
                      })}
                    />
                    {errors.description && <p className='text-red-600 text-sm -mt-3 mb-2'>{errors.description.message}</p>}
                    <span>
                      I accept the{" "}
                      <a className="text-blue-400 underline" href="/">
                        Terms and Conditions
                      </a>
                      .
                    </span>
                  </div>
                  <div className="block mt-6">
                    <input
                      name="pp"
                      className="p-3 mx-3 text-green-600 rounded mr-3 border-2 border-gray-300 ring-0 focus:ring-0 focus:ring-offset-0 focus:border-0 cursor-pointer"
                      type="checkbox"
                      {...register("pp", {
                        required: {
                          value: true,
                          message: "Please accept the Privacy Policy"
                        }
                      })}
                    />
                    {errors.description && <p className='text-red-600 text-sm -mt-3 mb-2'>{errors.description.message}</p>}
                    <span>
                      I accept the{" "}
                      <a className="text-blue-400 underline" href="/">
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </div>


                </section>
              )}


              <pre className='mb-2'>
                {renderButton()}

              </pre>
            </form>



          </div>
        </div>
      </div>
    </>
  )
}

