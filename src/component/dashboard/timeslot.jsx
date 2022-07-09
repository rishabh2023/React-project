import React from "react";
import { useState, useEffect, Fragment } from "react";
import axiosInstance from '../../utils/AxiosInstance'
import { Tab } from "@headlessui/react";
import { Dialog, Transition } from '@headlessui/react'
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";



export default function Timeslot() {





  const currTime = new Date().toISOString();
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenWarn, setIsOpenWarn] = useState(false)

  const history = useHistory();


  const a = new Date();
  const currentDay = a.getDay();
  var str = currTime;
  var mon = 1;
  var tue = 2;
  var wed = 3;
  var thu = 4;
  var fri = 5;
  var sat = 6;
  var sun = 0;
  var m, t, w, t1, f, s, s1;
  if (mon >= currentDay) {
    m = mon - currentDay;
  }
  else {
    m = 7 - currentDay + 1;
  }

  if (tue >= currentDay) {
    t = tue - currentDay;
  }
  else {
    t = 7 - currentDay + 2;
  }

  if (wed >= currentDay) {
    w = wed - currentDay;
  }
  else {
    w = 7 - currentDay + 3;
  }

  if (thu >= currentDay) {
    t1 = thu - currentDay;
  }
  else {
    t1 = 7 - currentDay + 4;
  }

  if (fri >= currentDay) {
    f = fri - currentDay;
  }
  else {
    f = 7 - currentDay + 5;
  }

  if (sat >= currentDay) {
    s = sat - currentDay;
  }
  else {
    s = 7 - currentDay + 6;
  }

  if (sun >= currentDay) {
    s1 = sun - currentDay;
  }
  else {
    s1 = 7 - currentDay + 0;
  }

  var monday = new Date(str);
  var tuesday = new Date(str);
  var wednesday = new Date(str);
  var thursday = new Date(str);
  var friday = new Date(str);
  var saturday = new Date(str);
  var sunday = new Date(str);

  monday.setDate(monday.getDate() + m);
  var m2 = (monday.toLocaleString("en-GB", { day: '2-digit', month: '2-digit', year: 'numeric' }));

  tuesday.setDate(tuesday.getDate() + t);
  var t2 = (tuesday.toLocaleString("en-GB", { day: '2-digit', month: '2-digit', year: 'numeric' }));


  wednesday.setDate(wednesday.getDate() + w);
  var w2 = (wednesday.toLocaleString("en-GB", { day: '2-digit', month: '2-digit', year: 'numeric' }))

  thursday.setDate(thursday.getDate() + t1);
  var t3 = (thursday.toLocaleString("en-GB", { day: '2-digit', month: '2-digit', year: 'numeric' }));

  friday.setDate(friday.getDate() + f);
  var f2 = (friday.toLocaleString("en-GB", { day: '2-digit', month: '2-digit', year: 'numeric' }));

  saturday.setDate(saturday.getDate() + s);
  var s2 = (saturday.toLocaleString("en-GB", { day: '2-digit', month: '2-digit', year: 'numeric' }));

  sunday.setDate(sunday.getDate() + s1);
  var s3 = (sunday.toLocaleString("en-GB", { day: '2-digit', month: '2-digit', year: 'numeric' }));


  const [api, setApi] = useState({});




  function closeModal() {
    setIsOpen(false)

  }
  function openModal() {
    setIsOpen(true)

  }

  function closeWarnModal() {
    setIsOpenWarn(false)

  }
  function openWarnModal() {
    setIsOpenWarn(true)

  }


  const save = async () => {

    setIsOpenWarn(false)
    const data = JSON.parse(sessionStorage.getItem('slots'))

    let dates_lst = []
    let dates_data_lst = []
    let split_list = []
    let schedule = []
    for (const n in data) {


      if (data[n][0].length === 0) {


      } else {
        dates_data_lst.push(data[n][0])
        dates_lst.push(n)


      }

    }

    for (let i = 0; i < dates_data_lst.length; i++) {

      let temp = []
      for (const j of dates_data_lst[i]) {
        const splitted = j.split("-");

        const temp_time1 = splitted[0].length !== 5 ? splitted[0].length === 3 ? `0${splitted[0][0]}:0${splitted[0][2]}` : splitted[0][1] === ':' ? `0${splitted[0][0]}:${splitted[0][2]}${splitted[0][3]}` : `${splitted[0][0]}${splitted[0][1]}:0${splitted[0][3]}` : splitted[0]
        const temp_time2 = splitted[1].length !== 5 ? splitted[1].length === 3 ? `0${splitted[1][0]}:0${splitted[1][2]}` : splitted[1][1] === ':' ? `0${splitted[1][0]}:${splitted[1][2]}${splitted[1][3]}` : `${splitted[1][0]}${splitted[1][1]}:0${splitted[1][3]}` : splitted[1]
        function diff(start, end) {
          start = start.split(":");
          end = end.split(":");
          var startDate = new Date(0, 0, 0, start[0], start[1], 0);
          var endDate = new Date(0, 0, 0, end[0], end[1], 0);
          var diff = endDate.getTime() - startDate.getTime();
          var hours = Math.floor(diff / 1000 / 60 / 60);
          diff -= hours * 1000 * 60 * 60;
          var minutes = Math.floor(diff / 1000 / 60);

          // If using time pickers with 24 hours format, add the below line get exact hours
          if (hours < 0)
            hours = hours + 24;

          return (minutes <= 9 ? "0" : "") + minutes;
        }

        const dummy_dict = {
          'start_time': temp_time1,
          'end_time': temp_time2,
          'timezone': 'GMT+5:30',
          "duration": Number(diff(temp_time1, temp_time2) === "00" ? '60' : diff(temp_time1, temp_time2))

        };
        temp.push(dummy_dict)



      }
      split_list.push(temp)

    }


    for (let k = 0; k < dates_lst.length; k++) {
      let payload_dict = { 'day': dates_lst[k], 'timings': split_list[k] }
      schedule.push(payload_dict)



    }




    var decoded = jwt_decode(JSON.parse(localStorage.getItem('access_token')));

    const main_payload_dict = {
      "event_name": sessionStorage.getItem('service_name'),
      "discription": "",
      "expert": decoded.user_id,
      "releted_service": sessionStorage.getItem('service_id'),
      "notify_before": true,
      "notify_before_time": "5 Minutes",
      "schedules": schedule
    }

    console.log('hello')




    await axiosInstance.post("/events/event/", main_payload_dict).then((res) => {
      console.log(res.data)

      history.push(`/services/`)

    }).catch((err) => {
      setIsOpen(true)
    });


  }




  function MonClick() {
    const [hours, setHours] = useState();
    const [day, setDay] = useState([]);
    const [minutes, setMinutes] = useState();
    const [prevMin, setPrevMin] = useState(-15);
    const [prevHrs, setPrevHrs] = useState(25);
    const [time, setTime] = useState();
    const [duration, setDuration] = useState(0);
    const [timeAloted, setTimeAloted] = useState([]);
    const [slotList, setSlotList] = useState([]);






    const handleChange = (e) => {
      const h = e.slice(0, 2);
      const m = e.slice(3, 5);

      setHours(parseInt(h));
      setMinutes(parseInt(m));

    };

    const handleDuration = (e) => {
      setDuration(parseInt(e));
    };

    const handleDays = (e) => {
      setDay((pre) => [...pre, e]);
    };
    const handleRemoveItem = (indexToRemove) => {
      setTimeAloted([
        ...timeAloted.filter((_, index) => index !== indexToRemove),
      ]);
    };
    const handleSlot = (e) => {
      var newMinutes, newHours, x, y;

      setSlotList((pre) => (pre, [`${hours}-${minutes}`]));


      if (duration === 0) {

        setIsOpen(true)
      }
      else if (prevHrs + 1 !== hours || prevHrs !== hours) { // &&--> ||
        if (minutes + duration > 60) {
          x = minutes + duration;
          newMinutes = x - 60;
          newHours = hours + 1;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);
         
          if (found === abc) {
            setIsOpen(true)

          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        } else {
          // console.log("2");

          newHours = hours;
          newMinutes = minutes + duration;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          // setTimeAloted((a) => [...a, abc]);
          if (found === abc) {
           
            setIsOpen(true)
            // setPopUp(true);
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      }
      else if (prevHrs === hours && prevMin >= minutes) {
        console.log('hello')
        setIsOpen(true)
        //setPopUp(true);
      } 
      else if (prevMin >= 45) {
        y = 60 - prevMin;
        // console.log("7");
        
        if (y >= minutes) {
          setIsOpen(true)
          //setPopUp(true);
          // console.log("8");
        } else {
          newHours = hours + 1;
          newMinutes = y;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          // setTimeAloted((a) => [...a, abc]);
          if (found === abc) {
            setIsOpen(true)
            //setPopUp(true);
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      } 
      else if (prevMin <= minutes) {  //prevMin + 15 <= minutes
        // console.log("9");
        if (minutes + duration > 60) {
          console.log('hello')
          // console.log("10");

          x = minutes + duration;
          newMinutes = x - 60;
          newHours = hours + 1;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          if (found === abc) {
            setIsOpen(true)

          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        } else {
          
          newHours = hours;
          newMinutes = minutes + duration;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          if (found === abc) {
            setIsOpen(true)

          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      }

    }
    useEffect(() => {
      setApi(prev => ({ ...prev, [m2]: [timeAloted] }));
    }, [timeAloted]);




    return (
      <>
        <div className="flex items-center justify-center">
          <div className="border-2 border-gray-300 shadow-2xl rounded-lg w-full h-3/4 lg:w-1/2 md:w-3/5 sm:w-full mx-2 my-8 bg-gray-100 p-3">

            <div className="flex w-1/2 bg-gray-300 border-2 border-gray-300  px-1 justify-center">{m2}</div>
            <select
              className="flex w-1/2 bg-gray-300 border-2 border-gray-300 my-6 px-1 focus:bg-white focus:outline-none focus:shadow-outline"
              onChange={(e) => handleDuration(e.target.value)}>
              <option selected disabled hidden>
                Duration
              </option>
              <option value="30">30 Min</option>
              <option value="45">45 Min</option>
              <option value="60">60 Min</option>
            </select>
            <div className="flex flex-row flex-wrap">
              <input
                className="flex bg-gray-300 my-4 focus:border-none"
                onChange={(e) => handleChange(e.target.value)}
                type="time"></input>
              <button
                className="bg-blue-300 w-1/5 h-6 m-4 rounded-md"
                onClick={() => handleSlot()}>
                Set
              </button>
            </div>
            <div className="flex flex-row flex-wrap">
              {(
                <ul className="flex flex-wrap">
                  {timeAloted.map((timeslot, index) => {
                    return (
                      <li
                        key={index}
                        className="w-auto  text-sm inline-flex items-center font-bold leading-sm uppercase px-2 m-1 py-1 bg-green-200 text-green-700 rounded-full">
                        {timeslot}
                        <button
                          className=" pl-1.5 rounded-full "
                          onClick={() => handleRemoveItem(index)}>
                          X
                        </button>
                      </li>);
                  })}
                </ul>
              )}
            </div>


          </div>
        </div>



      </>
    )
  };

  function TueClick() {
    const [hours, setHours] = useState();
    const [day, setDay] = useState([]);
    const [minutes, setMinutes] = useState();
    const [prevMin, setPrevMin] = useState(-15);
    const [prevHrs, setPrevHrs] = useState(25);
    const [time, setTime] = useState();
    const [duration, setDuration] = useState(0);
    const [timeAloted, setTimeAloted] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [slotList, setSlotList] = useState([]);




    const handleChange = (e) => {
      const h = e.slice(0, 2);
      const m = e.slice(3, 5);

      setHours(parseInt(h));
      setMinutes(parseInt(m));
      // setTime(e);
    };

    const handleDuration = (e) => {
      setDuration(parseInt(e));
    };
    const handlePopUp = (e) => {
      setIsOpen(true)
      //setPopUp(false);
    };
    const handleDays = (e) => {
      setDay((pre) => [...pre, e]);
    };
    const handleRemoveItem = (indexToRemove) => {
      setTimeAloted([
        ...timeAloted.filter((_, index) => index !== indexToRemove),
      ]);
    };
    const handleSlot = (e) => {
      var newMinutes, newHours, x, y;
      // console.log(hours," __",minutes)
      setSlotList((pre) => (pre, [`${hours}-${minutes}`]));
      // const found = slotList.find((element) => element == '21:21');
      // console.log("@",found);
      // console.log(slotList);

      if (duration === 0) {
        //setPopUp(true);
        setIsOpen(true)
      }
      else if (prevHrs + 1 !== hours || prevHrs !== hours) {
        if (minutes + duration > 60) {
          x = minutes + duration;
          newMinutes = x - 60;
          newHours = hours + 1;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);
          if (found === abc) {
            ///setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        } else {
          // console.log("2");

          newHours = hours;
          newMinutes = minutes + duration;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          // setTimeAloted((a) => [...a, abc]);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true);
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      } else if (prevHrs === hours && prevMin >= minutes) {
        //setPopUp(true);
        setIsOpen(true)
      } else if (prevMin >= 45) {
        y = 60 - prevMin;
        // console.log("7");
        if (y >= minutes) {
          //setPopUp(true);
          setIsOpen(true)
          // console.log("8");
        } else {
          newHours = hours + 1;
          newMinutes = y;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          // setTimeAloted((a) => [...a, abc]);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      } else if (prevMin <= minutes) {
        // console.log("9");
        if (minutes + duration > 60) {
          // console.log("10");

          x = minutes + duration;
          newMinutes = x - 60;
          newHours = hours + 1;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        } else {
          // console.log("11");

          newHours = hours;
          newMinutes = minutes + duration;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      }
      // console.log(timeAloted);
      // setApi(prev => ({...prev, monday: [timeAloted]}));
      // console.log(api);

    }
    useEffect(() => {
      setApi(prev => ({ ...prev, [t2]: [timeAloted] }));
    }, [timeAloted]);



    // if(found){
    // console.log("@@@@@@@@");
    // };
    return (
      <>
        <div
          className=" flex items-ceneter justify-center">
          <div className="border-2 border-gray-300 shadow-2xl rounded-lg w-full h-3/4 lg:w-1/2 md:w-3/5 sm:w-full mx-2 my-8 bg-gray-100 p-3">

            <div className="flex w-1/2 bg-gray-300 border-2 border-gray-300  px-1 justify-center">{t2}</div>
            <select
              className="flex w-1/2 bg-gray-300 border-2 border-gray-300 my-6 px-1 focus:bg-white focus:outline-none focus:shadow-outline"
              onChange={(e) => handleDuration(e.target.value)}>
              <option selected disabled hidden>
                Duration
              </option>
              <option value="30">30 Min</option>
              <option value="45">45 Min</option>
              <option value="60">60 Min</option>
            </select>
            <div className="flex flex-row flex-wrap">
              <input
                className="flex bg-gray-300 my-4 focus:border-none"
                onChange={(e) => handleChange(e.target.value)}
                type="time"></input>
              <button
                className="bg-blue-300 w-1/5 h-6 m-4 rounded-md"
                onClick={() => handleSlot()}>
                Set
              </button>
            </div>
            <div className="flex flex-row flex-wrap">
              {!popUp && (
                <ul className="flex flex-wrap">
                  {timeAloted.map((timeslot, index) => {
                    return (
                      <li
                        key={index}
                        className="w-auto sm:inline-flex  text-sm inline-flex items-center font-bold leading-sm uppercase px-2 m-1  py-1 bg-green-200 text-green-700 rounded-full  ">
                        {timeslot}
                        <button
                          className=" pl-1.5 rounded-full "
                          onClick={() => handleRemoveItem(index)}>
                          X
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

          </div>
        </div>

      </>
    )
  };
  function WedClick() {
    const [hours, setHours] = useState();
    const [day, setDay] = useState([]);
    const [minutes, setMinutes] = useState();
    const [prevMin, setPrevMin] = useState(-15);
    const [prevHrs, setPrevHrs] = useState(25);
    const [time, setTime] = useState();
    const [duration, setDuration] = useState(0);
    const [timeAloted, setTimeAloted] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [slotList, setSlotList] = useState([]);




    const handleChange = (e) => {
      const h = e.slice(0, 2);
      const m = e.slice(3, 5);

      setHours(parseInt(h));
      setMinutes(parseInt(m));
      // setTime(e);
    };

    const handleDuration = (e) => {
      setDuration(parseInt(e));
    };
    const handlePopUp = (e) => {
      //setPopUp(false);
      setIsOpen(true)
    };
    const handleDays = (e) => {
      setDay((pre) => [...pre, e]);
    };
    const handleRemoveItem = (indexToRemove) => {
      setTimeAloted([
        ...timeAloted.filter((_, index) => index !== indexToRemove),
      ]);
    };
    const handleSlot = (e) => {
      var newMinutes, newHours, x, y;
      // console.log(hours," __",minutes)
      setSlotList((pre) => (pre, [`${hours}-${minutes}`]));
      // const found = slotList.find((element) => element == '21:21');
      // console.log("@",found);
      // console.log(slotList);

      if (duration === 0) {
        //setPopUp(true);
        setIsOpen(true)
      }

      else if (prevHrs + 1 !== hours || prevHrs !== hours) {
        if (minutes + duration > 60) {
          x = minutes + duration;
          newMinutes = x - 60;
          newHours = hours + 1;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        } else {
          // console.log("2");

          newHours = hours;
          newMinutes = minutes + duration;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          // setTimeAloted((a) => [...a, abc]);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      } else if (prevHrs === hours && prevMin >= minutes) {
        //setPopUp(true);
        setIsOpen(true)
      } else if (prevMin >= 45) {
        y = 60 - prevMin;
        // console.log("7");
        if (y >= minutes) {
          //setPopUp(true);
          setIsOpen(true)
          // console.log("8");
        } else {
          newHours = hours + 1;
          newMinutes = y;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          // setTimeAloted((a) => [...a, abc]);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      } else if (prevMin <= minutes) {
        // console.log("9");
        if (minutes + duration > 60) {
          // console.log("10");

          x = minutes + duration;
          newMinutes = x - 60;
          newHours = hours + 1;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        } else {
          // console.log("11");

          newHours = hours;
          newMinutes = minutes + duration;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      }
      // console.log(timeAloted);
      // setApi(prev => ({...prev, monday: [timeAloted]}));
      // console.log(api);

    }
    useEffect(() => {
      setApi(prev => ({ ...prev, [w2]: [timeAloted] }));
    }, [timeAloted]);



    // if(found){
    // console.log("@@@@@@@@");
    // };
    return (
      <>
        <div
          className="flex items-ceneter justify-center">
          <div className="border-2 border-gray-300 shadow-2xl rounded-lg w-full h-3/4 lg:w-1/2 md:w-3/5 sm:w-full mx-2 my-8 bg-gray-100 p-3">
            <div className="flex w-1/2 bg-gray-300 border-2 border-gray-300  px-1 justify-center">{w2}</div>
            <select
              className="flex w-1/2 bg-gray-300 border-2 border-gray-300 my-6 px-1 focus:bg-white focus:outline-none focus:shadow-outline"
              onChange={(e) => handleDuration(e.target.value)}>
              <option selected disabled hidden>
                Duration
              </option>
              <option value="30">30 Min</option>
              <option value="45">45 Min</option>
              <option value="60">60 Min</option>
            </select>
            <div className="flex flex-row flex-wrap">
              <input
                className="flex bg-gray-300 my-4 focus:border-none"
                onChange={(e) => handleChange(e.target.value)}
                type="time"></input>
              <button
                className="bg-blue-300 w-1/5 h-6 m-4 rounded-md"
                onClick={() => handleSlot()}>
                Set
              </button>
            </div>
            <div className="flex flex-row flex-wrap">
              {!popUp && (
                <ul className="flex flex-wrap">
                  {timeAloted.map((timeslot, index) => {
                    return (
                      <li
                        key={index}
                        className=" sm:inline-flex w-auto text-sm inline-flex items-center font-bold leading-sm uppercase px-2 m-1  py-1 bg-green-200 text-green-700 rounded-full  ">
                        {timeslot}
                        <button
                          className=" pl-1.5 rounded-full "
                          onClick={() => handleRemoveItem(index)}>
                          X
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

          </div>
        </div>

      </>
    )
  };

  function ThuClick() {
    const [hours, setHours] = useState();
    const [day, setDay] = useState([]);
    const [minutes, setMinutes] = useState();
    const [prevMin, setPrevMin] = useState(-15);
    const [prevHrs, setPrevHrs] = useState(25);
    const [time, setTime] = useState();
    const [duration, setDuration] = useState(0);
    const [timeAloted, setTimeAloted] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [slotList, setSlotList] = useState([]);




    const handleChange = (e) => {
      const h = e.slice(0, 2);
      const m = e.slice(3, 5);

      setHours(parseInt(h));
      setMinutes(parseInt(m));
      // setTime(e);
    };

    const handleDuration = (e) => {
      setDuration(parseInt(e));
    };
    const handlePopUp = (e) => {
      //setPopUp(false);
      setIsOpen(true)
    };
    const handleDays = (e) => {
      setDay((pre) => [...pre, e]);
    };
    const handleRemoveItem = (indexToRemove) => {
      setTimeAloted([
        ...timeAloted.filter((_, index) => index !== indexToRemove),
      ]);
    };
    const handleSlot = (e) => {
      var newMinutes, newHours, x, y;
      // console.log(hours," __",minutes)
      setSlotList((pre) => (pre, [`${hours}-${minutes}`]));
      // const found = slotList.find((element) => element == '21:21');
      // console.log("@",found);
      // console.log(slotList);

      if (duration === 0) {
        setIsOpen(true)
        //setPopUp(true);
      }
      else if (prevHrs + 1 !== hours || prevHrs !== hours) {
        if (minutes + duration > 60) {
          x = minutes + duration;
          newMinutes = x - 60;
          newHours = hours + 1;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        } else {
          // console.log("2");

          newHours = hours;
          newMinutes = minutes + duration;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          // setTimeAloted((a) => [...a, abc]);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      } else if (prevHrs === hours && prevMin >= minutes) {
        //setPopUp(true);
        setIsOpen(true)
      } else if (prevMin >= 45) {
        y = 60 - prevMin;
        // console.log("7");
        if (y >= minutes) {
          //setPopUp(true);
          setIsOpen(true)
          // console.log("8");
        } else {
          newHours = hours + 1;
          newMinutes = y;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          // setTimeAloted((a) => [...a, abc]);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      } else if (prevMin <= minutes) {
        // console.log("9");
        if (minutes + duration > 60) {
          // console.log("10");

          x = minutes + duration;
          newMinutes = x - 60;
          newHours = hours + 1;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        } else {
          // console.log("11");

          newHours = hours;
          newMinutes = minutes + duration;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      }
      // console.log(timeAloted);
      // setApi(prev => ({...prev, monday: [timeAloted]}));
      // console.log(api);

    }
    useEffect(() => {
      setApi(prev => ({ ...prev, [t3]: [timeAloted] }));
    }, [timeAloted]);



    // if(found){
    // console.log("@@@@@@@@");
    // };
    return (
      <>
        <div
          className="flex items-ceneter justify-center">
          <div className="border-2 border-gray-300 shadow-2xl rounded-lg w-full h-3/4 lg:w-1/2 md:w-3/5 sm:w-full mx-2 my-8 bg-gray-100 p-3">
            <div className="flex w-1/2 bg-gray-300 border-2 border-gray-300  px-1 justify-center">{t3}</div>
            <select
              className="flex w-1/2 bg-gray-300 border-2 border-gray-300 my-6 px-1 focus:bg-white focus:outline-none focus:shadow-outline"
              onChange={(e) => handleDuration(e.target.value)}>
              <option selected disabled hidden>
                Duration
              </option>
              <option value="30">30 Min</option>
              <option value="45">45 Min</option>
              <option value="60">60 Min</option>
            </select>
            <div className="flex flex-row flex-wrap">
              <input
                className="flex bg-gray-300 my-4 focus:border-none"
                onChange={(e) => handleChange(e.target.value)}
                type="time"></input>
              <button
                className="bg-blue-300 w-1/5 h-6 m-4 rounded-md"
                onClick={() => handleSlot()}>
                Set
              </button>
            </div>
            <div className="flex flex-row flex-wrap">

              <ul className="flex flex-wrap">
                {timeAloted.map((timeslot, index) => {
                  return (
                    <li
                      key={index}
                      className=" sm:inline-flex w-auto text-sm inline-flex items-center font-bold leading-sm uppercase px-2 m-1  py-1 bg-green-200 text-green-700 rounded-full  ">
                      {timeslot}
                      <button
                        className=" pl-1.5 rounded-full "
                        onClick={() => handleRemoveItem(index)}>
                        X
                      </button>
                    </li>
                  );
                })}
              </ul>

            </div>

          </div>
        </div>

      </>
    )
  };


  function FriClick() {
    const [hours, setHours] = useState();
    const [day, setDay] = useState([]);
    const [minutes, setMinutes] = useState();
    const [prevMin, setPrevMin] = useState(-15);
    const [prevHrs, setPrevHrs] = useState(25);
    const [time, setTime] = useState();
    const [duration, setDuration] = useState(0);
    const [timeAloted, setTimeAloted] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [slotList, setSlotList] = useState([]);




    const handleChange = (e) => {
      const h = e.slice(0, 2);
      const m = e.slice(3, 5);

      setHours(parseInt(h));
      setMinutes(parseInt(m));
      // setTime(e);
    };

    const handleDuration = (e) => {
      setDuration(parseInt(e));
    };
    const handlePopUp = (e) => {
      //setPopUp(false);
      setIsOpen(true)
    };
    const handleDays = (e) => {
      setDay((pre) => [...pre, e]);
    };
    const handleRemoveItem = (indexToRemove) => {
      setTimeAloted([
        ...timeAloted.filter((_, index) => index !== indexToRemove),
      ]);
    };
    const handleSlot = (e) => {
      var newMinutes, newHours, x, y;
      // console.log(hours," __",minutes)
      setSlotList((pre) => (pre, [`${hours}-${minutes}`]));
      // const found = slotList.find((element) => element == '21:21');
      // console.log("@",found);
      // console.log(slotList);

      if (duration === 0) {
        //setPopUp(true);
        setIsOpen(true)
      }
      else if (prevHrs + 1 !== hours || prevHrs !== hours) {
        if (minutes + duration > 60) {
          x = minutes + duration;
          newMinutes = x - 60;
          newHours = hours + 1;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        } else {
          // console.log("2");

          newHours = hours;
          newMinutes = minutes + duration;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          // setTimeAloted((a) => [...a, abc]);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      } else if (prevHrs === hours && prevMin >= minutes) {
        //setPopUp(true);
        setIsOpen(true)
      } else if (prevMin >= 45) {
        y = 60 - prevMin;
        // console.log("7");
        if (y >= minutes) {
          //setPopUp(true);
          setIsOpen(true)
          // console.log("8");
        } else {
          newHours = hours + 1;
          newMinutes = y;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          // setTimeAloted((a) => [...a, abc]);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      } else if (prevMin <= minutes) {
        // console.log("9");
        if (minutes + duration > 60) {
          // console.log("10");

          x = minutes + duration;
          newMinutes = x - 60;
          newHours = hours + 1;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        } else {
          // console.log("11");

          newHours = hours;
          newMinutes = minutes + duration;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      }

    }
    useEffect(() => {
      setApi(prev => ({ ...prev, [f2]: [timeAloted] }));
    }, [timeAloted]);



    return (
      <>
        <div
          className={
            " flex  justify-center"
          }>
          <div className="border-2 border-gray-300 shadow-2xl rounded-lg w-full h-3/4 lg:w-1/2 md:w-3/5 sm:w-full mx-2 my-8 bg-gray-100 p-3">
            <div className="flex w-1/2 bg-gray-300 border-2 border-gray-300  px-1 justify-center">{f2}</div>
            <select
              className="flex w-1/2 bg-gray-300 border-2 border-gray-300 my-6 px-1 focus:bg-white focus:outline-none focus:shadow-outline"
              onChange={(e) => handleDuration(e.target.value)}>
              <option selected disabled hidden>
                Duration
              </option>
              <option value="30">30 Min</option>
              <option value="45">45 Min</option>
              <option value="60">60 Min</option>
            </select>
            <div className="flex flex-row flex-wrap">
              <input
                className="flex bg-gray-300 my-4 focus:border-none"
                onChange={(e) => handleChange(e.target.value)}
                type="time"></input>
              <button
                className="bg-blue-300 w-1/5 h-6 m-4 rounded-md"
                onClick={() => handleSlot()}>
                Set
              </button>
            </div>
            <div className="flex flex-row flex-wrap">
              {
                <ul className="flex flex-wrap">
                  {timeAloted.map((timeslot, index) => {
                    return (
                      <li
                        key={index}
                        className=" sm:inline-flex w-auto text-sm inline-flex items-center font-bold leading-sm uppercase px-2 m-1  py-1 bg-green-200 text-green-700 rounded-full  ">
                        {timeslot}
                        <button
                          className=" pl-1.5 rounded-full "
                          onClick={() => handleRemoveItem(index)}>
                          X
                        </button>
                      </li>
                    );
                  })}
                </ul>
              }
            </div>

          </div>
        </div>

      </>
    )
  };


  function SatClick() {
    const [hours, setHours] = useState();
    const [day, setDay] = useState([]);
    const [minutes, setMinutes] = useState();
    const [prevMin, setPrevMin] = useState(-15);
    const [prevHrs, setPrevHrs] = useState(25);
    const [time, setTime] = useState();
    const [duration, setDuration] = useState(0);
    const [timeAloted, setTimeAloted] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [slotList, setSlotList] = useState([]);




    const handleChange = (e) => {
      const h = e.slice(0, 2);
      const m = e.slice(3, 5);

      setHours(parseInt(h));
      setMinutes(parseInt(m));
      // setTime(e);
    };

    const handleDuration = (e) => {
      setDuration(parseInt(e));
    };
    const handlePopUp = (e) => {
      //setPopUp(false);
      setIsOpen(true)
    };
    const handleDays = (e) => {
      setDay((pre) => [...pre, e]);
    };
    const handleRemoveItem = (indexToRemove) => {
      setTimeAloted([
        ...timeAloted.filter((_, index) => index !== indexToRemove),
      ]);
    };
    const handleSlot = (e) => {
      var newMinutes, newHours, x, y;
      // console.log(hours," __",minutes)
      setSlotList((pre) => (pre, [`${hours}-${minutes}`]));
      // const found = slotList.find((element) => element == '21:21');
      // console.log("@",found);
      // console.log(slotList);

      if (duration === 0) {
        //setPopUp(true);
        setIsOpen(true)
      }
      else if (prevHrs + 1 !== hours || prevHrs !== hours) {
        if (minutes + duration > 60) {
          x = minutes + duration;
          newMinutes = x - 60;
          newHours = hours + 1;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        } else {
          // console.log("2");

          newHours = hours;
          newMinutes = minutes + duration;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          // setTimeAloted((a) => [...a, abc]);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      } else if (prevHrs === hours && prevMin >= minutes) {
        //setPopUp(true);
        setIsOpen(true)
      } else if (prevMin >= 45) {
        y = 60 - prevMin;
        // console.log("7");
        if (y >= minutes) {
          //setPopUp(true);
          setIsOpen(true)
          // console.log("8");
        } else {
          newHours = hours + 1;
          newMinutes = y;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          // setTimeAloted((a) => [...a, abc]);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      } else if (prevMin <= minutes) {
        // console.log("9");
        if (minutes + duration > 60) {
          // console.log("10");

          x = minutes + duration;
          newMinutes = x - 60;
          newHours = hours + 1;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        } else {
          // console.log("11");

          newHours = hours;
          newMinutes = minutes + duration;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      }
      // console.log(timeAloted);
      // setApi(prev => ({...prev, monday: [timeAloted]}));
      // console.log(api);

    }
    useEffect(() => {
      setApi(prev => ({ ...prev, [s2]: [timeAloted] }));
    }, [timeAloted]);



    // if(found){
    // console.log("@@@@@@@@");
    // };
    return (
      <>
        <div
          className={
            " flex items-ceneter justify-center"
          }>
          <div className="border-2 border-gray-300 shadow-2xl rounded-lg w-full h-3/4 lg:w-1/2 md:w-3/5 sm:w-full mx-2 my-8 bg-gray-100 p-3">
            <div className="flex w-1/2 bg-gray-300 border-2 border-gray-300  px-1 justify-center">{s2}</div>
            <select
              className="flex w-1/2 bg-gray-300 border-2 border-gray-300 my-6 px-1 focus:bg-white focus:outline-none focus:shadow-outline"
              onChange={(e) => handleDuration(e.target.value)}>
              <option selected disabled hidden>
                Duration
              </option>
              <option value="30">30 Min</option>
              <option value="45">45 Min</option>
              <option value="60">60 Min</option>
            </select>
            <div className="flex flex-row flex-wrap">
              <input
                className="flex bg-gray-300 my-4 focus:border-none"
                onChange={(e) => handleChange(e.target.value)}
                type="time"></input>
              <button
                className="bg-blue-300 w-1/5 h-6 m-4 rounded-md"
                onClick={() => handleSlot()}>
                Set
              </button>
            </div>
            <div className="flex flex-row flex-wrap">
              {
                <ul className="flex flex-wrap">
                  {timeAloted.map((timeslot, index) => {
                    return (
                      <li
                        key={index}
                        className="  w-auto text-sm inline-flex items-center font-bold leading-sm uppercase px-2 m-1  py-1 bg-green-200 text-green-700 rounded-full  ">
                        {timeslot}
                        <button
                          className=" pl-1.5 rounded-full "
                          onClick={() => handleRemoveItem(index)}>
                          X
                        </button>
                      </li>
                    );
                  })}
                </ul>
              }
            </div>

          </div>
        </div>

      </>
    )
  };


  function SunClick() {
    const [hours, setHours] = useState();
    const [day, setDay] = useState([]);
    const [minutes, setMinutes] = useState();
    const [prevMin, setPrevMin] = useState(-15);
    const [prevHrs, setPrevHrs] = useState(25);
    const [time, setTime] = useState();
    const [duration, setDuration] = useState(0);
    const [timeAloted, setTimeAloted] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [slotList, setSlotList] = useState([]);




    const handleChange = (e) => {
      const h = e.slice(0, 2);
      const m = e.slice(3, 5);

      setHours(parseInt(h));
      setMinutes(parseInt(m));
      // setTime(e);
    };

    const handleDuration = (e) => {
      setDuration(parseInt(e));
    };
    const handlePopUp = (e) => {
      setPopUp(false);
    };
    const handleDays = (e) => {
      setDay((pre) => [...pre, e]);
    };
    const handleRemoveItem = (indexToRemove) => {
      setTimeAloted([
        ...timeAloted.filter((_, index) => index !== indexToRemove),
      ]);
    };
    const handleSlot = (e) => {
      var newMinutes, newHours, x, y;
      setSlotList((pre) => (pre, [`${hours}-${minutes}`]));




      if (duration === 0) {

        setIsOpen(true)
      }
      else if (prevHrs + 1 !== hours || prevHrs !== hours) {
        if (minutes + duration > 60) {
          x = minutes + duration;
          newMinutes = x - 60;
          newHours = hours + 1;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);
          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        } else {
          // console.log("2");

          newHours = hours;
          newMinutes = minutes + duration;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);




          // setTimeAloted((a) => [...a, abc]);
          if (found === abc) {

            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      } else if (prevHrs === hours && prevMin >= minutes) {

        setIsOpen(true)
      } else if (prevMin >= 45) {
        y = 60 - prevMin;

        if (y >= minutes) {

          setIsOpen(true)

        } else {
          newHours = hours + 1;
          newMinutes = y;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);



          if (found === abc) {

            setIsOpen(true)

          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      } else if (prevMin <= minutes) {
        // console.log("9");
        if (minutes + duration > 60) {
          // console.log("10");

          x = minutes + duration;
          newMinutes = x - 60;
          newHours = hours + 1;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        } else {
          // console.log("11");

          newHours = hours;
          newMinutes = minutes + duration;
          const abc = `${hours}:${minutes}-${newHours}:${newMinutes}`;
          const found = timeAloted.find((element) => element === abc);


          if (found === abc) {
            //setPopUp(true);
            setIsOpen(true)
          } else {
            setTimeAloted((a) => [...a, abc]);
          }
          setPrevMin(newMinutes);
          setPrevHrs(newHours);
        }
      }


    }
    useEffect(() => {
      setApi(prev => ({ ...prev, [s3]: [timeAloted] }));
    }, [timeAloted]);




    return (
      <>
        <div
          className={
            " flex items-ceneter justify-center"
          }>
          <div className="border-2 border-gray-300 shadow-2xl rounded-lg w-full h-3/4 lg:w-1/2 md:w-3/5 sm:w-full mx-2 my-8 bg-gray-100 p-3">
            <div className="flex w-1/2 bg-gray-300 border-2 border-gray-300  px-1 justify-center">{s3}</div>
            <select
              className="flex w-1/2 bg-gray-300 border-2 border-gray-300 my-6 px-1 focus:bg-white focus:outline-none focus:shadow-outline"
              onChange={(e) => handleDuration(e.target.value)}>
              <option selected disabled hidden>
                Duration
              </option>
              <option value="30">30 Min</option>
              <option value="45">45 Min</option>
              <option value="60">60 Min</option>
            </select>
            <div className="flex flex-row flex-wrap">
              <input
                className="flex bg-gray-300 my-4 focus:border-none"
                onChange={(e) => handleChange(e.target.value)}
                type="time"></input>
              <button
                className="bg-blue-300 w-1/5 h-6 m-4 rounded-md"
                onClick={() => handleSlot()}>
                Set
              </button>
            </div>
            <div className="flex flex-row flex-wrap">
              {
                <ul className="flex flex-wrap">
                  {timeAloted.map((timeslot, index) => {
                    return (
                      <li
                        key={index}
                        className=" inline-flex w-auto text-xs  items-center font-bold leading-sm uppercase px-2 m-1  py-1 bg-green-200 text-green-700 rounded-full  ">
                        {timeslot}
                        <button
                          className=" pl-1.5 rounded-full "
                          onClick={() => handleRemoveItem(index)}>
                          X
                        </button>
                      </li>
                    );
                  })}
                </ul>
              }
            </div>

          </div>
        </div>

      </>
    )
  };



  return (
    <>
      <Transition appear show={isOpenWarn} as={Fragment}>
        <Dialog
          //as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeWarnModal}
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
                  Alert!
                </Dialog.Title>
                <div className="mt-2">

                  <div className='text-indigo-700 text-base text-justify'>
                    <h1>
                      Full week slot will create in only one click are you really wants to create?
                    </h1>
                  </div>



                </div>

                <div className="mt-4">

                  <button
                    type="button"
                    className="float-right inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={save}
                  >

                    Yes
                  </button>

                  <button
                    type="button"
                    className="float-left inline-flex rounded-xl justify-center  text-base px-3 py-2 font-medium text-white bg-blue-800 border border-transparent  hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeWarnModal}
                  >

                    No
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
                  Getting Error!
                </Dialog.Title>
                <div className="mt-2">

                  <div className='text-red-600 text-base text-justify'>
                    <h1>
                      "Something is missing please once check and try again with different time!"
                    </h1>
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


      <Tab.Group manual>
        <div className=" flex justify-center px-2 grid-rows mt-4">
          <Tab.List className=" ">
            <Tab className={({ selected }) => (selected ? ' font-medium bg-purple-600 text-white rounded mx-3 px-2 lg:px-3 lg:mx-5' : 'text-gray-500 hover:bg-blue-400 hover:text-white mx-3 lg:mx-3 px-2 lg:px-5 rounded')}>Mon</Tab>
            <Tab className={({ selected }) => (selected ? ' font-medium bg-purple-600 text-white rounded mx-3 px-2 lg:px-3 lg:mx-5' : 'text-gray-500 hover:bg-blue-400 hover:text-white mx-3 lg:mx-5 px-2 lg:px-3 rounded')}>Tue</Tab>
            <Tab className={({ selected }) => (selected ? ' font-medium bg-purple-600 text-white rounded mx-3 px-2 lg:px-3 lg:mx-5' : 'text-gray-500 hover:bg-blue-400 hover:text-white mx-3 lg:mx-5 px-2 lg:px-3 rounded')}>Wed</Tab>
            <Tab className={({ selected }) => (selected ? ' font-medium bg-purple-600 text-white rounded mx-3 px-2 lg:px-3 lg:mx-5' : 'text-gray-500 hover:bg-blue-400 hover:text-white mx-3  lg:mx-5 px-2 lg:px-3 rounded')}>Thu</Tab>
            <Tab className={({ selected }) => (selected ? ' font-medium bg-purple-600 text-white rounded mx-3 px-2 lg:px-3 lg:mx-5' : 'text-gray-500 hover:bg-blue-400 hover:text-white mx-3  lg:mx-5 px-2 lg:px-3 rounded')}>Fri</Tab>
            <Tab className={({ selected }) => (selected ? ' font-medium bg-purple-600 text-white rounded mx-3 px-3 lg:px-3 lg:mx-5' : 'text-gray-500 hover:bg-blue-400 hover:text-white mx-3  lg:mx-5 px-3 lg:px-3 rounded')}>Sat</Tab>
            <Tab className={({ selected }) => (selected ? ' font-medium bg-purple-600 text-white rounded mx-3 px-2 lg:px-3 lg:mx-5' : 'text-gray-500 hover:bg-blue-400 hover:text-white mx-3 lg:mx-5 px-2 lg:px-3 rounded')}>Sun</Tab>
          </Tab.List>
        </div>
        <Tab.Panels>
          <div className="mx-3  lg:mx-auto w-3/3 rounded-3xl">
            <Tab.Panel>{MonClick()}</Tab.Panel>
            <Tab.Panel>{TueClick()}</Tab.Panel>
            <Tab.Panel>{WedClick()}</Tab.Panel>
            <Tab.Panel>{ThuClick()}</Tab.Panel>
            <Tab.Panel>{FriClick()}</Tab.Panel>
            <Tab.Panel>{SatClick()}</Tab.Panel>
            <Tab.Panel>{SunClick()}</Tab.Panel>
          </div>
        </Tab.Panels>
      </Tab.Group>
      {sessionStorage.setItem("slots", JSON.stringify(api))}

     

      <button
        className=" mb-3 float-right  mr-3 shadow bg-green-500 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-xl"
        type="button"
        onClick={openWarnModal}
      >
        Submit
      </button>
    </>
  );
}


