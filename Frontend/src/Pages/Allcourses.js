import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "./BaseUrl";

function Allcourses() {
  const [noti1, setNoti1] = useState(false);
  const [noti, setNoti] = useState(false);

  useEffect(() => {
    getStudentData();
    getRequestData();
    getUser();
    getRequestData1();
  }, []);
  useEffect(() => {
    getTeacherData();
  }, []);
  const type = localStorage.getItem("type");
  const navigate = useNavigate();

  const teach = localStorage.getItem("teacherData");
  const tParshData1 =teach? JSON.parse(teach):{};

  const teacherLocalTime = localStorage.getItem("teacherTime");
  const tParshtime =teacherLocalTime? JSON.parse(teacherLocalTime):[];
  const [tParshData,setTParseData] = useState(tParshData1)

  const timeConvert = (x) => {
    const value = x.split(":");
    const hh = value[0] > 12 ? value[0] - 12 : value[0];
    const fhh = hh<10 ? `0${hh}` : hh;
    const mm = value[1];
    const ampm = value[0] < 12 ? "Am" : "Pm";
    return `${fhh}:${mm} ${ampm}`;
  };

  const [studentList, setStudentList] = useState([]);
  const [studentList1, setStudentList1] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [teacherList1, setTeacherList1] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [requestList1, setRequestList1] = useState([]);
  const localData = localStorage.getItem("stdSkills");
  const teacherSpec = localStorage.getItem("teacherSpec");
  const parseData = localData!==""? JSON.parse(localData):[] ;
  const [stdSkills, setStdSkills] = useState(parseData);
  const getStudentData = () => {
    axios.get(baseUrl + "addstudents").then((res) => {
      setStudentList(res.data.data.filter((i) => i.type === "teacher"));
      setStudentList1(res.data.data.filter((i) => i.type === "teacher"));
    });
  };

  const getTeacherData = () => {
    axios.get(baseUrl + "addstudents").then((res) => {
      setTeacherList(res.data.data.filter((i) => i.type === "student"));
      setTeacherList1(res.data.data.filter((i) => i.type === "student"));
    });
  };
  const stdId = localStorage.getItem("userId");
  const getRequestData = () => {
    axios.get(baseUrl + "request").then((res) => {
      setRequestList(
        res.data.data.filter(
          (i) => (i.from === stdId) & (i.status === "accept")
        )
      );
    });
  };

  const getRequestData1 = () => {
    axios.get(baseUrl + "request").then((res) => {
      setRequestList1(
        res.data.data.filter(
          (i) => (i.to === stdId) & (i.status === "accept")
        )
      );
    });
  };

  const searchFn = (x) => {
    const list = studentList1.filter(
      (i) =>
        i.name.toLowerCase().includes(x) ||
        i.specialization.toLowerCase().includes(x)
    );
    setStudentList(list);
  };

  const searchFn1 = (x) => {
    const list = teacherList1.filter((i) => i.name.toLowerCase().includes(x));
    setTeacherList(list);
  };
  const [userList, setUserList] = useState([]);
  const getUser = () => {
    axios
      .get(baseUrl + "addstudents")
      .then((res) => setUserList(res.data.data));
  };
  const getName = (x) => {
    if (userList.length > 0) {
      const list = userList.filter((i) => i._id === x)[0];
      return list.name;
    }
  };

  const getSpecialization = (x) => {
    if (userList.length > 0) {
      const list = userList.filter((i) => i._id === x)[0];
      return list.specialization;
    }
  };
  const getSkills = (x) => {
    if (userList.length > 0) {
      const list = userList.filter((i) => i._id === x)[0];
      return list.skills;
    }
  };

  const list = localStorage.getItem("courseData1");
  const parseData1 = list ? JSON.parse(list) : []
  const [data, setData] = useState([])

  return (
    <div>
           {noti && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            zIndex: 20,
          }}
        >
          <div className="lgnd1"
            style={{
              width: "50%",
              minHeight: "60vh",
              backgroundColor: "white",
              borderRadius: 10,
              marginTop: "2%",
              position: "relative",
              overflowY: "auto",
              paddingBottom: 10,
              display:"flex",
              flexDirection:"column",
              justifyContent:"space-evenly",
              alignItems:"center",
              left:"2%"
            }}
          >
            <h4 onClick={()=>setNoti(false)} style={{right:10, position:"absolute", top:5}}><i className="fa fa-times"></i></h4><br/>
        <div style={{height:50, width:"95%", backgroundColor:"black", color:"white", borderRadius:10, display:"flex", justifyContent:"center",alignItems:"center"}}>
          <h4>Student Info</h4>
        </div>

        <div style={{height:350, width:"95%", backgroundColor:"whitesmoke", color:"black", borderRadius:10, display:"flex", justifyContent:"space-evenly", flexDirection:"column", alignItems:"center"}}>
          <div className="lgnd1" style={{height:40, width:"70%"}}>
          <label>Name  :</label>  <label style={{fontWeight:"bold"}}>{data.name}</label>
          </div>
          <div className="lgnd1" style={{height:40, width:"70%",}}>
          <label>Skills :</label> <label style={{fontWeight:"bold"}}>{data.skills.map((i)=>i)}</label>
          </div>
          <div className="lgnd1" style={{height:40, width:"70%"}}>
          <label>Email :</label> <label style={{fontWeight:"bold"}}>{data.email}</label>
          </div>
          <div className="lgnd1" style={{height:40, width:"70%"}}>
          <label>Knowledge Level :</label> <label style={{fontWeight:"bold"}}>{data.grade}</label>
          </div>
          <div className="lgnd1" style={{height:40, width:"70%"}}>
          <label>Learning Objective :</label> <label style={{fontWeight:"bold"}}>{data.language}</label>
          </div>
        </div>
          
          </div>
        </div>
      )}

      
      {noti1 && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            zIndex: 20,
          }}
        >
          <div
            style={{
              width: "70%",
              height: "60vh",
              backgroundColor: "white",
              borderRadius: 10,
              marginTop: "2%",
              position: "relative",
              paddingLeft: "30px",
              overflowY: "auto",
              paddingBottom: 10,
            }}
          >
            <div style={{ width: "100%", textAlign: "center" }}>
              <div
                style={{
                  height: "70px",
                  width: "97%",
                  backgroundColor: "black",
                  marginTop: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  fontWeight: "bold",
                  borderRadius: 10,
                  color: "white",
                }}
              >
                <h2>{tParshData.name} Class Schedule</h2>
              </div>
            </div>
            <i
              class="fa fa-times"
              style={{ position: "absolute", top: 10, right: 10, fontSize: 25 }}
              onClick={() => setNoti1(false)}
            ></i>

            <br />
            <div
              style={{
                height: 300,
                width: "97%",
                backgroundColor: "whitesmoke",
                overflowY: "auto",
                borderRadius: 10,
                padding: "20px 0px 20px 0px",
              }}
            >
              <table className="table">
                <thead style={{ textAlign: "center" }}>
                  <th>Sr No.</th>
                  <th>Day</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {tParshData?.timing?.map((i, n) => (
                    <tr style={{ textAlign: "center" }}>
                      <td>{n + 1}</td>
                      <td>{i.day}</td>
                      <td>{timeConvert(i.from)}</td>
                      <td>{timeConvert(i.to)}</td>
                      <td>
                        <a href={tParshData.videoLink}>
                          <button className="btn btn-outline-primary">
                            Join Class
                          </button>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <div style={{ height: "100vh", width: "100%", display: "flex" }}>
        <div className="all-course-side"
          style={{ width: "15%", height: "100vh", backgroundColor: "white" }}
        >
          <Sidebar />
        </div>
        <div className="all-courses"
          style={{
            width: "82%",
            marginLeft: "1.5%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header searchFn={searchFn} searchFn1={searchFn1} />

          {type === "student" ? (
            <div className="all-courses-1"
              style={{
                width: "100%",
                minHeight: "73vh",
                backgroundColor: "white",
                alignItems: "center",
                display: "flex",
                gap: "2%",
                flexWrap:"wrap"
              }}
            >
              <div className="lgnd1"
                style={{ height: "70vh", width: "45%", textAlign: "center" }}
              >
                <label>All Courses</label>
                <div
                  style={{
                    height: "70vh",
                    width: "100%",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "10px",
                    overflowY: "auto",
                  }}
                >
                  {studentList.sort((a,b)=>a.specialization>b.specialization?1:-1).map((i) => (
                    <div className="all-course-div"
                      style={{
                        height: "12vh",
                        width: "95%",
                        backgroundColor: "whitesmoke",
                        borderRadius: "10px",
                        display: "flex",
                        marginTop: 10,
                      }}
                    >
                      <div className="all-course-div1"
                        style={{
                          height: "12vh",
                          width: "70%",
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "9vh",
                            width: "25%",
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            style={{ height: "5vh", width: "60%" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
                          />
                        </div>
                        <div
                        style={{
                          height: "12vh",
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "19px",
                            fontWeight: "bold",
                            letterSpacing: 1,
                            height: 25,
                          }}
                        >
                          {i.specialization}
                        </label>
                        <label>by {i.name}</label>
                      </div>
                      </div>
                     
                      <div className="all-course-div1"
                        style={{
                          height: "12vh",
                          width: "30%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => {
                            localStorage.setItem(
                              "courseData1",
                              JSON.stringify(i)
                            );
                            navigate("/Viewcourses");
                          }}
                          style={{
                            height: "40px",
                            width: "80%",
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: 10,
                            border: "none",
                          }}
                        >
                          Veiw courses
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lgnd1"
                style={{
                  height: "70vh",
                  width: "45%",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "start",
                  overflowY:"auto",
                  paddingTop:10
                }}
              >
                <label>Assigned to you</label>

                {studentList
                  .filter((i) => stdSkills.includes(i.specialization))
                  .sort((a, b) => (a.experience < b.experience ? 1 : -1))
                  .map((j) => (
                    <div className="all-course-div"
                      style={{
                        height: "12vh", 
                        width: "95%",
                        backgroundColor: "whitesmoke",
                        borderRadius: "10px",
                        display: "flex",
                        marginTop: "20px",
                      }}
                    >
                      <div className="all-course-div1"
                        style={{
                          height: "12vh",
                          width: "70%",
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "9vh",
                            width: "25%",
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            style={{ height: "5vh", width: "60%" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
                          />
                        </div>
                        <div
                        style={{
                          height: "12vh",
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "19px",
                            fontWeight: "bold",
                            letterSpacing: 1,
                            height: 25,
                          }}
                        >
                          {j.specialization}
                        </label>
                        <label>by {j.name}</label>
                      </div>
                      </div>
                     
                      <div className="all-course-div1"
                        style={{
                          height: "12vh",
                          width: "30%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => {
                            setNoti1(true);
                            setTParseData(j)
                          }}
                          style={{
                            height: "40px",
                            width: "80%",
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: 10,
                            border: "none",
                          }}
                        >
                          Class Info
                        </button>
                      </div>
                    </div>
                  ))}

                {requestList.map((j) => (
                  <div className="all-course-div"
                    style={{
                      height: "12vh",
                      width: "95%",
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                      display: "flex",
                      marginTop: "20px",
                    }}
                  >
                    <div className="all-course-div1"
                      style={{
                        height: "12vh",
                        width: "70%",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "9vh",
                          width: "25%",
                          backgroundColor: "white",
                          borderRadius: 10,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          style={{ height: "5vh", width: "60%" }}
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
                        />
                      </div>
                      <div
                      style={{
                        height: "12vh",
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "19px",
                          fontWeight: "bold",
                          letterSpacing: 1,
                          height: 25,
                        }}
                      >
                        {getSpecialization(j.to)}
                      </label>
                      <label>by {getName(j.to)}</label>
                    </div>
                    </div>
                   
                    <div className="all-course-div1"
                      style={{
                        height: "12vh",
                        width: "30%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        onClick={() => {
                          
                          setTParseData(studentList.filter((i)=>(i._id===j.to))[0])
                          setNoti1(true);
                          
                        }}
                        style={{
                          height: "40px",
                          width: "80%",
                          backgroundColor: "black",
                          color: "white",
                          borderRadius: 10,
                          border: "none",
                        }}
                      >
                        Class Info
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="all-courses-1"
              style={{
                width: "100%",
                minHeight: "73vh",
                backgroundColor: "white",
                alignItems: "center",
                display: "flex",
                flexWrap:"wrap",
                gap: "2%",
                
              }}
            >
              <div className="lgnd1"
                style={{ height: "70vh", width: "45%", textAlign: "center", }}
              >
                <label>All Students</label>
                <div
                  style={{
                    height: "70vh",
                    width: "100%",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "10px",
                    overflowY: "auto",
                  }}
                >
                  {teacherList.sort((a,b)=>a.name>b.name?1:-1).map((i) => (
                    <div
                      style={{
                        height: "12vh",
                        width: "95%",
                        backgroundColor: "whitesmoke",
                        borderRadius: "10px",
                        display: "flex",
                        marginTop: 10,
                      }}
                    >
                      <div
                        style={{
                          height: "12vh",
                          width: "20%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "9vh",
                            width: "70%",
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                          
                            style={{ height: "6.5vh", width: "60%" }}
                            src={i.profilePhoto?i.profilePhoto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTbH_P7t59HyCjbVqVBSblusPdVCz7Phn1sjA236kzMg&usqp=CAU&ec=48600112"}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          height: "12vh",
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "start",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "19px",
                            fontWeight: "bold",
                            letterSpacing: 1,
                            height: 25,
                          }}
                        >
                          {i.name}
                        </label>
                      </div>
                      <div
                        style={{
                          height: "12vh",
                          width: "30%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => {
                        setData(i)
                          
                            setNoti(true)
                          }}
                          style={{
                            height: "40px",
                            width: "80%",
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: 10,
                            border: "none",
                          }}
                         
                        >
                          Veiw Info
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {type==="admin"?
              <div className="lgnd1"
                style={{ height: "70vh", width: "45%", textAlign: "center", }}
              >
                <label>All Teacher</label>
                <div
                  style={{
                    height: "70vh",
                    width: "100%",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "10px",
                    overflowY: "auto",
                  }}
                >
                  {studentList.sort((a,b)=>a.name>b.name?1:-1).map((i) => (
                    <div
                      style={{
                        height: "12vh",
                        width: "95%",
                        backgroundColor: "whitesmoke",
                        borderRadius: "10px",
                        display: "flex",
                        marginTop: 10,
                      }}
                    >
                      <div
                        style={{
                          height: "12vh",
                          width: "20%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "9vh",
                            width: "70%",
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                          
                            style={{ height: "6.5vh", width: "60%" }}
                            src={i.profilePhoto?i.profilePhoto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTbH_P7t59HyCjbVqVBSblusPdVCz7Phn1sjA236kzMg&usqp=CAU&ec=48600112"}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          height: "12vh",
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "start",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "19px",
                            fontWeight: "bold",
                            letterSpacing: 1,
                            height: 25,
                          }}
                        >
                          {i.name}
                        </label>
                      </div>
                      <div
                        style={{
                          height: "12vh",
                          width: "30%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => {
                            localStorage.setItem(
                              "courseData1",
                              JSON.stringify(i)
                            );
                            navigate("/Viewcourses");
                          }}
                          style={{
                            height: "40px",
                            width: "80%",
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: 10,
                            border: "none",
                          }}
                        >
                          Veiw Info
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>:

              <div className="lgnd1"
                style={{
                  height: "70vh",
                  width: "45%",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "start",
                  overflowY:"auto"
                }}
              >
                <label>Up coming Classes</label>
                {teacherList.filter((i)=>i.skills.includes(teacherSpec))
                  
                  .map((j) => (
                    <div
                      style={{
                        minHeight: "12vh",
                        width: "95%",
                        backgroundColor: "whitesmoke",
                        borderRadius: "10px",
                        display: "flex",
                        marginTop: "20px",
                      }}
                    >
                      <div className="upcoming-res"
                        style={{
                          height: "12vh",
                          width: "15%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "7vh",
                            width: "70%",
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            style={{ height: "4vh", width: "60%" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
                          />
                        </div>
                      </div>
                      <div className="upcoming-res1"
                        style={{
                          height: "12vh",
                          width: "55%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            letterSpacing: 1,
                            height: 34,
                          }}
                        > {j.name} {j.skills} class
                        </label>
                        <label style={{fontSize:12}}>at  {tParshtime.map((i)=>timeConvert(i.from))} to {tParshtime.map((i)=>timeConvert(i.to))}</label>
                      </div>
                      <div
                        style={{
                          height: "12vh",
                          width: "30%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                      {/* <a href="https://us05web.zoom.us/j/83129393827?pwd=ZHZDRWJuYWhCS2ZqakI0aEVheGN4Zz09"> */}
                      <a href= "https://meet.google.com/">
                        <button
                         
                          style={{
                            height: "40px",
                            width: "100%",
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: 10,
                            border: "none",
                            fontSize:10
                          }}
                        >
                           Start Class
                        </button>
                        </a>
                      </div>
                    </div>
                  ))}


{requestList1.map((j) => (
                  <div
                    style={{
                      height: "12vh",
                      width: "95%",
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                      display: "flex",
                      marginTop: "20px",
                    }}
                  >
                    <div className="upcoming-res"
                      style={{
                        height: "12vh",
                        width: "20%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                          <div
                          style={{
                            height: "7vh",
                            width: "60%",
                            backgroundColor: "white",
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            style={{ height: "4vh", width: "60%" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
                          />
                        </div>
                    </div>
                    <div className="upcoming-res1"
                      style={{
                        height: "12vh",
                        width: "65%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "13px",
                          fontWeight: "bold",
                          letterSpacing: 1,
                          height: 32,
                        }}
                      >{getName(j.from)} {getSkills(j.from)} class
                      </label>
                      <label style={{fontSize:12}}>at  {tParshtime.map((i)=>timeConvert(i.from))} to {tParshtime.map((i)=>timeConvert(i.to))}</label>
                    </div>
                    <div
                      style={{
                        height: "12vh",
                        width: "30%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                     {/* <a href="https://us05web.zoom.us/j/83129393827?pwd=ZHZDRWJuYWhCS2ZqakI0aEVheGN4Zz09"> */}
                     <a href= "https://meet.google.com/">
                        <button
                         
                          style={{
                            height: "40px",
                            width: "100%",
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: 10,
                            border: "none",
                            fontSize:10
                          }}
                        >
                           Start Class
                        </button>
                        </a>
                    </div>
                  </div>
                ))}


              </div>}





            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Allcourses;
