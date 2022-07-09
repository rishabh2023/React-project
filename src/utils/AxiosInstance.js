import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';

const baseURL = process.env.REACT_APP_BASE_URL
let authToken = localStorage.getItem('access_token')?JSON.parse(localStorage.getItem('access_token')):null
const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization:`Bearer ${authToken}`}
})

axiosInstance.interceptors.request.use(async req => {
    
   
    authToken = localStorage.getItem('access_token')?JSON.parse(localStorage.getItem('access_token')):null
    req.headers.Authorization = `Bearer ${authToken}`

    const user = jwt_decode(JSON.parse(localStorage.getItem('access_token')))
    const isExpired = dayjs.unix(user.exp).diff(dayjs())<1;

    if (!isExpired){
        return req
    } else{
        localStorage.removeItem('expert')
		localStorage.removeItem('username')
		localStorage.removeItem('profile_id')
        localStorage.removeItem('access_token')
        sessionStorage.setItem('ismsg',true)
        
    }


    


   
   
})


export default axiosInstance