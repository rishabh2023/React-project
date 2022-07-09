
import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form";

import {BrowserRouter as Router,Switch,Route,Link,useHistory,Redirect} from "react-router-dom";

export default function Mobilepass() {
    const history = useHistory();
    const { register,handleSubmit,formState: { errors, isValid } } = useForm({ mode: "all" })

    const onSubmit = (data) => {
        if (data.mobile == '8965823672'){
           
            history.push({pathname:"/reset/password", state : {detail:data}});
              
            <Switch>
                <Redirect to="/reset/password"/>
            </Switch>
            return localStorage.setItem("mobile",data.mobile)
             
        }else{
            {console.log("Check your mobile")}
        }
    

    
    }
    


    const onError = (errors, e) => console.log(errors, e);
    

        return (
            <>
                <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="w-3/3 px-3 mb-2 md:mb-0">
                        <label className="block uppercase tracking-wide  text-gray-800 text-xs font-bold float-left mt-4" htmlFor="firstname">
                            Mobile Number
                        </label>
                        <input className="appearance-none block w-full text-md shadow-xl bg-gray-100 text-gray-700 border-2 border-blue-400 focus:border-blue-600 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
                            id="mobile"
                            type="text"
                            pattern='\d*'
                            name="mobile"
                            maxLength= "10"
                            placeholder="9899996999"
                            {...register("mobile", {
                                required: {
                                  value: true,
                                  message: "Please type your registered mobile no"
                                }
                              })}
                        />
                        {errors.mobile && <p className='text-red-600 text-sm -mt-2 mb-2'>{errors.mobile.message}</p>}
                    </div>
             
                    <div>
                        <button className='bg-blue-700 text-lg text-white font-medium  w-1/2 mb-2 py-2  disabled:bg-gray-400 disabled:cursor-not-allowed mx-auto rounded-2xl'
                         disabled={!isValid}
                         type='submit'>
                             Send OTP!
                            </button>
                    </div>

                </form>
                
            </>
        )    
    
}
