import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios'
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";
import axiosInstance from "../../utils/AxiosInstance"
import { Dialog, Transition } from '@headlessui/react'
import Spinner from '../authentication/spinner'

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
            <span className="rounded-full h-4 w-4 my-1 flex justify-center items-center " onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        className="block appearance-none w-full bg-gray-100 border-2 border-blue-300 hover:border-blue-700 px-4 py-2 pr-8 rounded  leading-tight focus:bg-white focus:border-blue-800 focus:outline-none focus:shadow-outline"
        type="text"
        maxLength="10"
        placeholder="Service Keywords"
        value={tagValue}
        onKeyUp={(event) => (event.which === 32 ? addTags(event) : null)}
        onChange={(e) => setTagValue(e.target.value)}
      />
      <button className="bg-blue-800 py-1 my-2 rounded-xl justify-items-center text-base text-white font-semibold px-2"
        onClick={addTags}>Add Tag</button>

    </div>
  );
};

export default function Serviceform() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [service, setService] = useState("");
  const [category, setCategory] = useState(0);
  const [dis, setDis] = useState("");
  let [isOpen, setIsOpen] = useState(false)
  let [send,setsend] = useState()
  const [img, setimg] = useState();
  const history = useHistory()
  const { register, handleSubmit, formState: { errors,isValid }} = useForm({ mode: "all" })
  var decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));


  const[cat,setcat] = useState([])
    

    const getCategory = async ()=>{
    
        const res = await axios.get("/user/category-select/")
        var data1 = res.data
        setcat(data1)
    
    };
    
    useEffect(() => {
        getCategory();
       
    }, []);

 

  const OnChange = (e) => {
    const img_data = e.target.files
    setimg(img_data)

  }
  function closeModal() {
    setsend('')
    setIsOpen(false)

  }


  const onSubmit = async (data, e) => {
    setsend('sending')

    sessionStorage.setItem('service_name',data.service_name)
    
    const pid = decoded.user_id
    var urldict
    urldict = {
      "service_img": "",
      "user": pid
    
    }

    if (!img) {
      urldict['service_img'] = ""
    } else {
      

      const formdata = new FormData();
      formdata.append('file', img[0])
      formdata.append('filetype', '.png')
      formdata.append('name', `${data.title}.png`)

      const response = await axios.post('/file/upload/', formdata)
      urldict["service_img"] = `${response.data.url}` 


    }
    const data_payload = Object.assign({}, data, urldict);
  

    await axiosInstance.post("/user/service_create/", data_payload).then((res) => {
      console.log(res.data)
      sessionStorage.setItem('service_id',res.data.id)
      history.push(`/dashboard/service/create/timeslots/${res.data.service_id}`)

    }).catch((err) => {
      setIsOpen(true)
    });





  }
  




  const selectedTags = (tags) => {
    console.log(tags);
  };

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(title))
  }, [title]);
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

      <div className="">

        <form className=" m-3" onSubmit={handleSubmit(onSubmit)}>

          <div className="md:flex md:items-center  place-content-center mb-6">
            <div className="md:w-2/3">
              <label className="text-gray-600 text-sm font-medium">Select your service image </label>
              <input
                className="object-center block w-full px-2 py-2 shadow-md text-sm font-normal text-gray-600 bg-gray-100 border-2 border-blue-300 hover:border-blue-700  bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-600 focus:bg-white focus:border-blue-600 focus:outline-none file:border-2 file:rounded-full"
                onChange={OnChange}
                name="img"
                type="file" />

            </div>

          </div>
          <div className="md:flex md:items-center  place-content-center mb-6">
            <div className="md:w-2/3">
              <label className="text-gray-600 text-sm font-medium">Service Name</label>
              <input
                className="block appearance-none w-full bg-gray-100 border-2  shadow-md border-blue-300 hover:border-blue-700 px-4 py-2 pr-8 rounded  leading-tight focus:bg-white focus:outline-none focus:shadow-outline"
                id="inline-full-name"
                type="text"
                placeholder="Service Title"
                required
                {...register("service_name", {
                  required: {
                    value: true,
                    message: "Please type Your Service title"
                  
                  }
                })} />
                  {errors.service_name && <p className='text-red-600 text-sm mt-2'>{errors.service_name.message}</p>}
            

            </div>
          </div>
          <div className="md:flex md:items-center place-content-center mb-6">
            <div className="md:w-2/3">
              <label className="text-gray-600 text-sm font-medium">Select Category</label>
              <select
                className="block appearance-none w-full bg-gray-100 border-2  shadow-md border-blue-300 hover:border-blue-700 px-4 py-2 pr-8 rounded  leading-tight focus:bg-white focus:outline-none focus:shadow-outline"
                required
              
                
                {...register("category",{ valueAsNumber: true })}
              >
                {cat.map((value)=>(
                 
                <option value={Number(value.id)}> {value.name}</option>
                ))
                
                }
               
               

              </select>
            </div>
          </div>
          <div className="md:flex place-content-center md:items-center mb-6">
            <div className="md:w-2/3">
              <label className="text-gray-600 text-sm font-medium">Price</label>
              <input
                className="block appearance-none w-full bg-gray-100 border-2   shadow-md border-blue-300 hover:border-blue-700 px-4 py-2 pr-8 rounded  leading-tight focus:bg-white focus:outline-none focus:shadow-outline"
                id="inline-full-name"
                type="number"
                min={1}

                placeholder="Service Price in Rupees"
                required
                {...register("price", {
                  required: {
                    value: true,
                    message: "Please type Your Service Price",
                    
                   
                  }
                })} />
                {errors.price && <p className='text-red-600 text-sm mt-2'>{errors.price.message}</p>}
            

            </div>
          </div>
          <div className="md:flex md:items-center place-content-center mb-6">
            <div className="md:w-2/3">
              <label className="text-gray-600 text-sm font-medium">Description</label>
              <textarea className="block appearance-none w-full  shadow-md bg-gray-100 border-2 border-blue-300 hover:border-blue-700 px-4 py-2 pr-8 rounded  leading-tight focus:bg-white focus:outline-none focus:shadow-outline"
                name="Brief Description of service" placeholder="Brief Description of your service" rows="4" cols="50"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Please type Your service description"
                   
                  }
                })} />
                {errors.description && <p className='text-red-600 text-sm mt-2 '>{errors.description.message}</p>}
            
            </div>
          </div>
          {/* <div className="md:flex md:items-center place-content-center mb-6">
            <div className="md:w-2/3">
              <label className="text-gray-600 text-sm font-medium">Service Keywords</label>
              <TagsInput selectedTags={selectedTags} tags={[]} />
            </div>
          </div> */}


          <div className="md:flex md:items-center  place-content-center mb-6">
            <div className="md:w-2/3">
              {send === 'sending'?<Spinner/>:
              <button
                className=" float-right mt-2 mb-2 w-auto text-justify  shadow-md text-white font-semibold bg-green-500 border-2  px-4 py-2 pr-8 rounded-xl  leading-tight focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed mx-auto "
                disabled={!isValid}
                type='submit'



              > Create time slot</button>}

            </div>
          </div>


        </form>
      </div>
    </>
  );
}

