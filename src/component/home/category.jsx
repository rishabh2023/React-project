import React, { useEffect,memo } from 'react';
import axios  from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from '../../redux/actions/expertsActions';


 

const Category = () => {
    const[cat,setcat] = useState([])
    const history = useHistory();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.category);
    const getCategory = async ()=>{
    
        const res = await axios.get("/user/category-select/")
        var data1 = res.data
        dispatch(setCategory(data1));
    
        
    
    };
    
    useEffect(() => {
        getCategory();
       
    }, []);
    return (
       <>
            <div className="border-2 border-gray-300 bg-white  scrollbar-hide overflow-x-auto ... flex flex-grow h-full w-full top-auto mt-0 justify-between">
                {categories.map((value,idx)=>(
                     <button key = {idx} className="font-semibold  text-gray-900  cursor-pointer text-xs object-center mb-1" 
                     onClick={()=>{
                         value.name === 'All' 
                         ?
                        history.push( `/services`)
                        :
                        history.push( `/results/search/${value.name}`)
                     }}>
                     <img src={value.img}
                             alt="avatar"
                             className="h-8 w-8 object-center items-center    justify-center mx-auto "
                             style={{"zIndex": "10"}}

                         />
                         <span className='whitespace-nowrap mx-auto px-4'>{value.name}</span>
                     </button>
                     

                )

                )}
                
               
               



            </div>
            </>
      
    )
}

export default memo(Category);