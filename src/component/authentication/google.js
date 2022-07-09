import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'


function googlelog(accesstoken){
   


  

 
        axios.post('/google/',{
            access_token :accesstoken,
        }).then((res)=>{
            console.log(res.data)
            localStorage.setItem("access_token",JSON.stringify(res.data.access_token))
            localStorage.setItem("expert",res.data.user.is_expert)
            localStorage.setItem("username",res.data.user.username)
            localStorage.setItem("profile_id",JSON.stringify(res.data.user.user_id))
            window.location.reload(false)
           
        }).catch((err) =>{
            console.log(err)
    
        })

        return (
            <>

            
            </>
        );



   
    

   
 
}

export default googlelog;


