import {React} from 'react';
// import {HiX} from 'react-icons/hi';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from '../authentication/spinner'
import { useState } from 'react';
import {IoMdLogOut} from 'react-icons/io';
import { links } from './data';
import {ProtectedlinksUser} from './data'
import {ProtectedlinksExpert} from './data'
import { useGlobalContext } from './context';
import axiosInstance from '../../utils/AxiosInstance';




const Sidebar = () => {
	const { isSidebarOpen, closeSidebar } = useGlobalContext();
	const[log,setlog] = useState('');
	const history = useHistory();

	const logout = () =>{
		setlog('loggingout')
		
		localStorage.removeItem('expert')
		localStorage.removeItem('username')
		localStorage.removeItem('profile_id')
		
		axiosInstance.post('/logout/').then((resp)=>{
			localStorage.removeItem('access_token')
			setlog('')
			
			
			///window.location.reload(false)
		}).catch((err) => {localStorage.removeItem('access_token')}); 
		
	}

	return (
		<div onClick={()=>{
			closeSidebar()
		}}
			className={`transition-all  duration-500  fixed top-0 bg-opacity-100  ${
				isSidebarOpen ? ' left-0 w-screen bg-black  bg-opacity-30': '-left-64'
			}`} style={{"zIndex": "30"}}
		 >
			<div className=" bottom-0 flex h-screen scrollbar-hide overflow-y-auto flex-col bg-white  w-64 px-4 py-8 border-r min-h-screen relative ...">
			<img onClick={()=>{
				history.push('/')
			}} className = "w-auto h-auto" src=" https://ultraxpert-bucket.s3.ap-south-1.amazonaws.com/icons/sidebar-logo.png"/> 
				{/* <button
					onClick={closeSidebar}
					className="absolute top-1 right-1  text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800 "
				>
					<HiX className="w-5 h-5" />
				</button> */}
			
			
			
				
				<div className="flex items-center px-4 -mx-2 mt-4 mb-2">
			
								
								
									
								
						<img
							src= "https://img.icons8.com/color/144/000000/person-male.png"
							alt="avatar"
							className="h-9 w-9 mx-2 object-center object-cover rounded-full"
						/>
							{localStorage.getItem('username')?
						<h4 className="mx-2 font-medium text-gray-800 hover:underline cursor-pointer"><Link to="/account/my/update/"
						onClick={closeSidebar}>{localStorage.getItem('username')}	</Link></h4>:
						<p className='text-base text-yellow-600'> <Link to="/login">SignIn/Up </Link></p>}
						
					</div>
				
				
				<div className="flex flex-col mt-6  justify-between flex-1">
					<nav className="text mt-3">

						{!localStorage.getItem('expert')?links.map((link, index) => {
							const { id, url, text, icon } = link;
							return (
								 <li key={id} className={`capitalize flex items-center px-4 py-2 ${
									index === 0
										? ' text-gray-700'
										: null
								} ${
									index > 0
										? 'mt-5 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 transform'
										: null

								} rounded-md`}>

								{icon}
								<Link
									to={url}
									onClick={closeSidebar}>
									
									
									<span className="mx-4 font-medium">
										{text}
									</span>
									
								</Link>
								
								</li>
							);
						}):
						localStorage.getItem('expert') === 'false'?  ProtectedlinksUser.map((link, index) => {
							const { id, url, text, icon } = link;
							return (
								 <li key={id} className={`capitalize flex items-center px-4 py-2 ${
									index === 0
										? ' text-gray-700'
										: null
								} ${
									index > 0
										? 'mt-5 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 transform'
										: null

								} rounded-md`}>

								{icon}
								<Link
									to={url}
									onClick={closeSidebar}>
									
									
									<span className="mx-4 font-medium">
										{text}
									</span>
									
								</Link>
								
								</li>
							);
						}): ProtectedlinksExpert.map((link, index) => {
							const { id, url, text, icon } = link;
							return (
								 <li key={id} className={`capitalize flex items-center px-4 py-2 ${
									index === 0
										? ' text-gray-700'
										: null
								} ${
									index > 0
										? 'mt-5 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 transform'
										: null

								} rounded-md`}>

								{icon}
								<Link
									to={url}
									onClick={closeSidebar}>
									
									
									<span className="mx-4 font-medium">
										{text}
									</span>
									
								</Link>
								
								</li>
							);
						})}
						<hr className="my-4" />
						
					
					</nav>
					{!localStorage.getItem('access_token')?'':
					log === 'loggingout'?<Spinner/>:
					<button className ="capitalize flex items-center px-3 py-2 mb-5 text-base font-medium bg-blue-600 text-white rounded-xl justify-center"
				onClick={logout}><IoMdLogOut className="mx-1 w-5 h-5"/>Logout</button>}
				</div>
				
			</div>
			
		</div>
		
	);
};

export default Sidebar;
