import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import axios from 'axios';
import { baseUrl } from './BaseUrl';

function Viewcourses() {
  useEffect(()=>{getallTeachData()},[])
  const userId = localStorage.getItem("userId");
  const list = localStorage.getItem("courseData1");
  const parseData = list ? JSON.parse(list) : []
  const [data, setData] = useState(parseData)

  const [to, setTo] = useState("")
  const [from, setFrom] = useState("")
  const [status, setStatus] = useState("")
  const [course, setCourse] = useState("")
  const [mode, setMode] = useState("")
  const [ambience, setAmbience] = useState("")

  const postRequest = () => {
    // const item = {
    //   to: data._id,
    //   from: userId,
    //   course: data.specialization,
    //   mode: mode,
    //   ambience: ambience,
    //   status: "panding"
    // }
    // axios.post(baseUrl + "request", item).then(()=>alert("Request Send Successfully"))
  }


  const current = new Date();
  const date = current.getDate();
  const month = current.getMonth() + 1
  const year = current.getFullYear();




  const monthList = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currMonth, setCurrMonth] = useState(month-1);
  const [currYear, setCurrYear] = useState(year);
  const [allTeachList, setAllTeachList] = useState([]);

  const sajn = [3, 5, 8, 10];

  const numberOfDays =
    currMonth === 1
      ? currYear % 4 === 0
        ? 29
        : 28
      : sajn.includes(currMonth)
        ? 30
        : 31;



  const firstDayOfMonth = () => {
    const a = new Date(`${monthList[currMonth]} 1, ${currYear} 01:15:00 `);
    const d = a.getDay();
    return d;
  };
  const getDay = (x) => {
    if(x){
    const a = new Date(`${monthList[currMonth]} ${x}, ${currYear} 01:15:00 `);
    const d = a.getDay();
    return d;
    } else {
      return 9
    }
  };


  const calenderData = new Array(numberOfDays).fill().map((i, n) => n + 1);
  const list1 = new Array(firstDayOfMonth()).fill().map((i, n) => "");
  const list2 = [...list1, ...calenderData];
  const Monday = 7-firstDayOfMonth()

  const nextMonth = () => {
    if (currMonth === 11) {
      setCurrMonth(0);
      setCurrYear(currYear + 1);
    } else {
      setCurrMonth(currMonth + 1);
    }
  };

  const previusMonth = () => {
    if (currMonth === 0) {
      setCurrMonth(11);
      setCurrYear(currYear - 1);
    } else {
      setCurrMonth(currMonth - 1);
    }
  };



  const getallTeachData=()=>{
    axios.get(baseUrl+"addstudents").then((res)=>setAllTeachList(res.data.data.filter((i)=>i.type==="teacher")))
  }

  const dayList =  data?.timing?.map((i)=>i.day)
  const dayNumber = dayList.map((i)=>

      i==="Sunday"?0:i==="Monday"?1:i==="Tuesday"?2:i==="Wednesday"?3:i==="Thursday"?4:i==="Friday"?5:6

  )


  return (
    <div>
      <div style={{ height: "100vh", width: "100%", display: "flex" }}>
        <div className='all-course-side' 
        style={{ width: "15%", height: "100vh", backgroundColor: "white", }}>
          <Sidebar />
        </div>
        <div className='all-courses'
         style={{ width: "82%", marginLeft: "1.5%", height: "100vh", display: "flex", flexDirection: "column" }}>
          <Header />
          <div style={{ width: "100%", height: "73vh", backgroundColor: "white", alignItems: "center", display: "flex", gap: "2%",flexWrap:"wrap" }}>

            <div className='lgnd1' style={{ height: "70vh", width: "45%", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", }}>

              <div style={{ height: "20vh", width: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column" }}>
                <label>Courses</label>
                <div style={{ height: "12vh", width: "95%", backgroundColor: "whitesmoke", borderRadius: "10px", display: "flex" }}>
                  <div style={{ height: "12vh", width: "60%", display: "flex", justifyContent: "center", alignItems: "center", }}>
                    <div style={{ height: "9vh", width: "35%", backgroundColor: "white", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <img style={{ height: "5vh", width: "60%", }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png' />
                    </div>
                  </div>
                  <div style={{ height: "12vh", width: "50%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <label style={{ fontSize: "19px", fontWeight: "bold", letterSpacing: 1, height: 25 }}>{data.specialization}</label>
                    <label>by {data.name}</label>
                    {/* <VideoCallFrame
              url={"https://ronak1234.daily.co/meet-cat"}
            ></VideoCallFrame> */}
                  </div>

                  <div style={{ height: "12vh", width: "30%", display: "flex", justifyContent: "center", alignItems: "center" }}>

                  </div>
                </div>
              </div>

              <div style={{ height: "40vh", width: "100%", backgroundColor: "lightgrey", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: 10 }}><br/>
                <h1>Actual Details</h1>
                <label>Request teacher to schedule classes:</label><br />
                <div style={{ height: "15vh", width: "100%", display: "flex" }}>
                  <div style={{ height: "20vh", width: "50%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <select onChange={(e) => setMode(e.target.value)} style={{ height: 40, width: "70%", border: "none", borderRadius: 10, outline: "none" }}>
                      <option selected disabled>Select Mode</option>
                      <option>Online</option>
                      <option>In-Person</option>
                    </select>

                  </div>
                  <div style={{ height: "20vh", width: "50%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <select onChange={(e) => setAmbience(e.target.value)} style={{ height: 40, width: "70%", border: "none", borderRadius: 10, outline: "none" }}>
                      <option selected disabled>Ambience</option>
                      <option>Group</option>
                      <option>Individual</option>
                    </select>
                  </div>

                </div>
                <button onClick={() =>{ postRequest()}} style={{ height: 40, width: "30%", backgroundColor: "black", color: "white", border: "none", borderRadius: 10 }}>Send Request</button>
              </div>

            </div>




            <div className='lgnd1' style={{ height: "55vh", width: "45%", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", }}>
              <div

              >
                <div className="modal11">

                  <br />
               
                  <div
                    style={{
                      width: "95%",
                      height: "10vh",
                      marginLeft: "2.5%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // border: "2px solid maroon",
                      // borderRadius: 10,
                    }}
                  >
                    <label style={{ color: "black", fontSize: 30 }}>
                      Calender
                    </label>
                  </div>
                  <div
                    style={{
                      width: "95%",
                      minHeight: "40vh",
                      marginLeft: "2.5%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      //  border: "2px solid maroon",
                      //  borderRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 30,
                        width: "80%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <i
                        onClick={() => previusMonth()}
                        class="fa fa-arrow-circle-o-left"
                        aria-hidden="true"
                        style={{ color: "black" }}
                      ></i>
                      <label style={{ color: "black" }}>
                        {" "}
                        {monthList?.[currMonth]} {currYear}
                      </label>
                      <i
                        onClick={() => nextMonth()}

                        class="fa fa-arrow-circle-o-right"
                        aria-hidden="true"
                        style={{ color: "black" }}
                      ></i>
                    </div>
                    <br />
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <label style={{ color: "black" }}>Sun</label>
                      <label style={{ color: "black" }}>Mon</label>
                      <label style={{ color: "black" }}>Tue</label>
                      <label style={{ color: "black" }}>Wed</label>
                      <label style={{ color: "black" }}>Thu</label>
                      <label style={{ color: "black" }}>Fri</label>
                      <label style={{ color: "black" }}>Sat</label>
                    </div>
                    <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                      {list2.map((i, n) => (
                        <div
                          style={{
                            width: "13%",
                            textAlign: "end",

                          }}
                        >
                          <button
                            style={{

                              color:
                                (date === i) &
                                  (month === currMonth) &
                                  (year === currYear)
                                  ? "white"
                                  : "black",
                              backgroundColor:dayNumber.includes(getDay(i))?"green" :"transparent",
                              textAlign: "center",
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              marginTop: "10px",
                              border: "none"
                            }}
                          >
                            {i}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Viewcourses