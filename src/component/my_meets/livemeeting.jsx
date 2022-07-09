import React,{useEffect, useState} from 'react';
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import { useParams,useHistory } from 'react-router';
import axiosInstance from '../../utils/AxiosInstance';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';

export default function LiveMeeting() {
    const {id} = useParams();
    const [msg,setmsg] = useState('');
  
    const path= (sessionStorage.getItem('cat'))==="expert"?`/dashboard`:`/profile/${sessionStorage.getItem('msg')}/rating`

    const history = useHistory();
    const leave = () =>{
      
      history.push(`${path}`)

      window.location.reload()
    }

    var startTime = new Date();
    var day = startTime.getDate()
    var month = startTime.getUTCMonth()
    var year = startTime.getFullYear() 
    var endTime = new Date(`${year},${month+1},${day} ${sessionStorage.getItem('time')}`);
    var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
    var resultInMinutes = Math.round(difference / 60000);

    //setTimeout(leave,sessionStorage.getItem('duration')*60000)

    setTimeout(leave,resultInMinutes*60000)
  
    const getData = async ()=>{

        await axiosInstance.get(`/meet/validation/${id}/`).then((res)=>{
          if (res.status === 200){
            setmsg('')
            
            let config = {
              name: `${sessionStorage.getItem('name')}`,
              meetingId: `${id}`,
              apiKey:"8a6405a4-3c2b-474b-acc0-c49367cfad89",
      
              containerId: null,
      
              // joinScreen: {
              //         visible: true,
              //         title: `${sessionStorage.getItem('service_name')}`,
              //         meetingUrl: "",
              //         },
              micEnabled: true,
              webcamEnabled: true,
              participantCanToggleSelfWebcam: true,
              participantCanToggleSelfMic: true,
              chatEnabled: true,
              screenShareEnabled: true,
              whiteboardEnabled: true,
                  permissions: {
                     endMeeting: true, // End meeting for all participant
                      drawOnWhiteboard: true,
                      toggleWhiteboard: true,
                      },
              pollEnabled:true,
              raiseHandEnabled:true,
              brandingEnabled: true,
              brandLogoURL: " https://ultraxpert-bucket.s3.ap-south-1.amazonaws.com/icons/RESIZE-LOGO.png",
              brandName: "UltraMeet",
              poweredBy: false,
              pin: {
                  allowed: true,
                  layout: "SIDEBAR",
              },
              
              participantCanLeave: true,
              redirectOnLeave: `${process.env.REACT_APP_URL}${path}`
      
              /*
        
             Other Feature Properties
              
              */
          };
      
      
        
           
      
         
      
      
          const meeting = new VideoSDKMeeting();
          
      
          const check_meet = jwt_decode(res.data.token)
          const isExpired = dayjs.unix(check_meet.exp).diff(dayjs())<1;
      
          if (!isExpired){
          
          
              meeting.init(config);
              //console.log(check_meet)
              //meeting.end()
             
          }
          
          }
        }).catch((err)=>{
          setmsg("Something Went Wrong!!")
        })



    }
 
  useEffect(()=>{
    getData();

  
   
    
   
  },[])

  

      return (<div>
      <h1 className='container flex items-center justify-center h-screen w-screen flex-auto text-center font-semibold text-gray-800 text-2xl'>
        {msg}
        </h1>
      </div>)
    }
