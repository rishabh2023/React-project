import React from 'react';
import Expertcard from './expertcard';
import Navbar from '../home/navbar';
import EditForm from './editform';

export default function EditService() {
  return(

  <>
        
           <Navbar/>

            <div className=' row w-full m-0 justify-center bg-gray-100'>
                <Expertcard/>
                <div className='  mx-7 ml-2 mr-2 bg-white shadow-2xl w-full lg:mx-auto w-2/2 lg:w-2/3  border-2 rounded-3xl my-8'>
                    <div className='flex justify-center'><h1 className='text-gray-500 font-medium text-2xl'>Edit Your Service</h1></div>
                    
                    <EditForm/>
                </div>
            </div>
        </>
  
  );
}
