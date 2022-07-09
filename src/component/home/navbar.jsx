import  React, { useState, useEffect,Suspense,memo } from "react";
import { useHistory } from 'react-router-dom'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import axios from 'axios';
import { useGlobalContext } from './context';


const Sidebar = React.lazy(() => import('./sidebar.jsx'));
const  Category = React.lazy(() => import('./category'));


const Navbar = () => {
    const { openSidebar, isSidebarOpen } = useGlobalContext();
    const history = useHistory()
    const [searchstr, setsearchstr] = useState('');
    const [autodata,setautodata] = useState([]);

     const getData = async ()=>{
        
        await axios.get('/user/autocomplete/').then((res)=>{
            const auto_data = res.data
            setautodata(auto_data)
        
            
        })
       


    };

    useEffect(() => {
        getData();

    }, []);
    
 
    
    

   
    const pressed = () =>{
       
        if (searchstr.length === 0 ){

        }else{ 
    
        history.push(`/results/search/${searchstr}`)
        }
    }
    const handleOnSearch = (string, results) => {  
        setsearchstr(string)
    }

 

    const handleOnSelect = (item) => {
        // the item selected
        setsearchstr('')
        setsearchstr(item.name)
       

    }

 

    const formatResult = (item) => {
        // return item
        return (<p dangerouslySetInnerHTML={{ __html: '<strong>' + item + '</strong>' }}></p>);
    }

    const handleOnClear = () => {
       setsearchstr('')
    };
    return (


        <>
        <Suspense fallback={<div></div>}>
            <div className="py-8 mb-10 ">
                <nav className="fixed text-white-600 body-font  bg-blue-600  top-0  inset-x-0  z-10 ">
                    <ul className="flex  px-1 py-2 justify-between">
                        <button className={`${isSidebarOpen ? '-translate-x-8' : 'translate-x-0'
                            } transition transform ease-linear duration-500 text-white w-10 h-4 rounded-full  active:bg-gray-300  focus:outline-none ml-0 hover:bg-gray-500 hover:text-white   `} onClick={openSidebar}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>


                        <div className="relative flex container w-full mx-4 lg:w-1/2 bg-white rounded-xl px-0 pr-2">

                        <div className="w-full rounded-xl">
                          
                           
                            <ReactSearchAutocomplete
                                items={autodata}
                                fuseOptions={{ keys: ["name","description"] }} // Search on both fields
                                resultStringKeyName="name" // String to display in the results
                                onSearch={handleOnSearch}
                             
                                onSelect={handleOnSelect}
                               
                                onClear={handleOnClear}
                                formatResult={formatResult}
                                showIcon={false}
                                placeholder="Search..."

                                styling={{
                                    height: "28px",
                                    border: "1px",
                                    borderRadius: "9px",
                                    backgroundColor: "white",
                                    boxShadow: "none",
                                    hoverBackgroundColor: "#d6d6d6",
                                    color: "#313738",
                                    fontSize: "15px",
                                    fontFamily: "normal",
                                    lineColor: "black",
                                    placeholderColor: "gray",
                                    clearIconMargin: "3px 8px 0 0",
                                    font:"normal"

                                }}
                            />

                            

                        </div>

                        <button className="bg-white  text-gray-600 text-semibold rounded-xl float-right "><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        onClick={pressed}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            </button>
                        </div>



                        <div className="flex mt-0.5">
                           
                            <ul className="flex justify-around">
                            {
                                !localStorage.getItem('access_token')?
                                <>
                                
                            
                                <button className="text-white font-small mx-1"
                                    name="login"
                                    onClick={() => {
                                        history.push("/login")
                                    }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button className="text-white mx-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                </button>
                                <button className="text-white mr-1"
                                    name="login"
                                    onClick={() => {
                                        history.push("/meet")
                                    }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                </> :
                                <>
                                <button className="text-white mx-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                </button>
                                <button className="text-white mr-1"
                                    name="login"
                                    onClick={() => {
                                        history.push("/meet")
                                    }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                </>
                                }
                            </ul>
                        </div>

                    </ul>

                    <Category key={345}  />
                </nav>
            </div>
             <Sidebar key={346} />
            </Suspense>
        </>
    );
}
export default memo(Navbar);
