import React, { useEffect, useState } from "react";
import handup from "../handup.png";
import axios from "axios";
import { baseUrl } from "./BaseUrl";
import storage from "./Firebase";
import { useNavigate } from "react-router-dom";
function Header(props) {
  useEffect(() => {
    getReqData();
    getUser();
    getStudentData();
  }, []);
  const navigate = useNavigate()
  const ld = localStorage.getItem("userpic");
  const [pp, spp] = useState(ld);
  const [noti, setNoti] = useState(false);
  const name = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const spleet = name.split(" ");
  const fName = spleet[0];

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [status, setStatus] = useState("");
  const [course, setCourse] = useState("");
  const [mode, setMode] = useState("");
  const [ambience, setAmbience] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [noti2, setNoti2] = useState(false);

  const type = localStorage.getItem("type");
  const [notiList, setNotiList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [studentList1, setStudentList1] = useState([]);

  const getStudentData = () => {
    axios.get(baseUrl + "addstudents").then((res) => {
      setStudentList(
        res.data.data
          .filter((i) => i.type === "teacher")
          .filter((a) => a.timing)
          .filter((l) => l.timing.length > 0)
      );
      setStudentList1(
        res.data.data.filter((i) => (i.type === "teacher") & (i.timing !== []))
      );
    });
  };

  const getReqData = () => {
    axios.get(baseUrl + "request").then((res) => {
      {
        type === "teacher"
          ? setNotiList(res.data.data.reverse().filter((j) => j.to === userId))
          : setNotiList(
              res.data.data
                .reverse()
                .filter((j) => (j.from === userId) & (j.status !== "panding"))
            );
      }
    });
  };

  const putProfileData = (x) => {
    localStorage.setItem("userpic", x);
    spp(x);
    const item = {
      profilePhoto: x,
    };
    axios
      .put(baseUrl + "addstudents/" + localStorage.getItem("userId"), item)
  };

  // const getReqData1 = () => {
  //   axios.get(baseUrl + "request").then((res) => setNotiList(res.data.data.filter((j) => j.from === userId)))

  // }

  const acceptReq = (x) => {
    const item = {
      status: "accept",
    };
    axios.put(baseUrl + "request/" + x, item).then(() => getReqData());
  };

  const rejReq = (x) => {
    const item = {
      status: "reject",
    };
    axios.put(baseUrl + "request/" + x, item).then(() => getReqData());
  };

  const getUser = () => {
    axios
      .get(baseUrl + "addstudents")
      .then((res) => setUserList(res.data.data));
  };
  const getName = (x) => {
    const list = userList.filter((i) => i._id === x)[0];
    return list.name;
  };

  const teach = localStorage.getItem("teacherData");
  const tParshData1 = teach ? JSON.parse(teach) : {};
  const [tParshData, setTParseData] = useState(tParshData1);

  const timeConvert = (x) => {
    const value = x.split(":");
    const hh = value[0] > 12 ? value[0] - 12 : value[0];
    const fhh = hh ? `0${hh}` : hh;
    const mm = value[1];
    const ampm = value[0] < 12 ? "Am" : "Pm";
    return `${fhh}:${mm} ${ampm}`;
  };

  const date = new Date();
  const day = date.getDay();
  const hh = date.getHours();
  const dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayDay = dayList[day];
  const newList = notiList.map((i) => i.to);
  const uploadImage = (x) => {
    if (x !== "") {
      const uploadTask = storage.ref(`images/${x.name}`).put(x);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress1(
            Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          );
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(x.name)
            .getDownloadURL()
            .then((url) => {
              setProgress1(0);
              putProfileData(url);
            });
        }
      );
    } else {
      alert("no image selected");
    }
  };
  const [progress1, setProgress1] = useState(0);
  return (
    
    <div>
      {noti2 && (
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
          <div className="lgnd1 headres"
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
              left: "-10%",
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
              onClick={() => setNoti2(false)}
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
      {noti && (
        <div className="lgnd1"
          style={{
            width: "85%",
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
              width: "70%",
              height: "60vh",
              backgroundColor: "white",
              borderRadius: 10,
              marginTop: "2%",
              position: "fixed",
              overflowY: "auto",
              paddingBottom: 10,
              zIndex:100,
            
            }}
          >
            <div style={{ width: "100%", textAlign: "center" }}>
              <h1>Notification</h1>
            </div>
            <i
              class="fa fa-times"
              style={{ position: "absolute", top: 10, right: 10, fontSize: 25 }}
              onClick={() => setNoti(false)}
            ></i>

            {type === "teacher" ? (
              <>
                {notiList.map((i) => (
                  <div
                    style={{
                      height: "12vh",
                      width: "95%",
                      marginLeft: "2.5%",
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                      display: "flex",
                      paddingLeft: 10,
                      marginTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        height: "12vh",
                        width: "58%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {i.status === "panding" ? (
                        <label
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            letterSpacing: 1,
                            height: 25,
                          }}
                        >
                          {getName(i.from)} Sent request for {i.mode}{" "}
                          {i.ambience} class
                        </label>
                      ) : i.status === "accept" ? (
                        <label
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            letterSpacing: 1,
                            height: 25,
                          }}
                        >
                          {getName(i.from)} {i.mode} {i.ambience} class request
                        </label>
                      ) : (
                        <label
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            letterSpacing: 1,
                            height: 25,
                          }}
                        >
                          {getName(i.from)} {i.mode} {i.ambience} class request
                        </label>
                      )}
                    </div>
                    {i.status === "panding" ? (
                      <div
                        style={{
                          height: "12vh",
                          width: "42%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <button
                          onClick={() => acceptReq(i._id)}
                          style={{
                            height: "35px",
                            border: "none",
                            borderRadius: 10,
                            width: "40%",
                            backgroundColor: "black",
                            color: "white",
                          }}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => rejReq(i._id)}
                          style={{
                            height: "35px",
                            border: "none",
                            borderRadius: 10,
                            width: "40%",
                            backgroundColor: "black",
                            color: "white",
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    ) : i.status === "accept" ? (
                      <div
                        style={{
                          height: "12vh",
                          width: "42%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <button
                          style={{
                            height: "35px",
                            border: "none",
                            borderRadius: 10,
                            width: "87%",
                            backgroundColor: "green",
                            color: "white",
                          }}
                        >
                          Accepted
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          height: "12vh",
                          width: "42%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <button
                          style={{
                            height: "35px",
                            border: "none",
                            borderRadius: 10,
                            width: "87%",
                            backgroundColor: "red",
                            color: "white",
                          }}
                        >
                          Rejected
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <>
                {notiList.map((i) => (
                  <div 
                    style={{
                      minHeight: "12vh",
                      width: "95%",
                      marginLeft: "2.5%",
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                      display: "flex",
                      paddingLeft: 10,
                      marginTop: "20px",
                    }}
                  > 
                    <div
                      style={{
                        minHeight: "12vh",
                        width: "90%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {i.status === "accept" ? (
                        <div className="noti-head"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            // backgroundColor:"red"
                          }}
                        >
                          <label
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              letterSpacing: 1,
                              // height: 25,
                            }}
                          >
                            {getName(i.to)} {i.status} Your {i.mode}{" "}
                            {i.ambience} class request
                          </label>
                          <button className="btn-noti"
                            onClick={() => {
                              setNoti2(true);
                              setNoti(false);
                              setTParseData(
                                studentList.filter((j) => j._id === i.to)[0]
                              );
                            }}
                            style={{
                              height: "40px",
                              width: "25%",
                              border: "none",
                              backgroundColor: "black",
                              color: "white",
                              borderRadius: 10,
                            }}
                          >
                            View Class schedule
                          </button>
                        </div>
                      ) : (
                        <div>
                          <label
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              letterSpacing: 1,
                              height: 25,
                            }}
                          >
                            {getName(i.to)} {i.status} Your {i.mode}{" "}
                            {i.ambience} class request
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {studentList
                  .filter(
                    (j) =>
                      newList.includes(j._id) &
                      j.timing.map((i) => i.day).includes(todayDay)
                  )
                  .map((i, n) => (
                    <div
                      style={{
                        height: "12vh",
                        width: "95%",
                        marginLeft: "2.5%",
                        backgroundColor: "whitesmoke",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: 10,
                        marginTop: "20px",
                      }}
                    >
                      <div
                        style={{
                          height: "12vh",
                          width: "90%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <label
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              letterSpacing: 1,
                              height: 25,
                            }}
                          >
                            {" "}
                            classes for {todayDay} is at{" "}
                            {
                              i.timing.filter((i) => i.day === todayDay)[0]
                                ?.from
                            }{" "}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      )}

      

      <div className="res-sidebar" 
      style={{width:"95%", height:"10vh", backgroundColor:"black", marginLeft:"2.5%",
      borderRadius:10, color:"white"}}>
          <h1>KL</h1>
          <i onClick={()=>navigate("/Addcts")} style={{fontSize:"23px"}} className='fa fa-home'></i>
            <i onClick={()=>navigate("/Allcourses")} style={{fontSize:"23px"}} class="fa fa-graduation-cap" ></i>
            <i onClick={()=>navigate("/Setting")} style={{fontSize:"23px"}} class="fa fa-cog" ></i>
            <i onClick={()=>{localStorage.removeItem("check");navigate("/")}} style={{fontSize:"23px"}} class="fa fa-sign-out"></i>
      </div>



      <div className="head"
        style={{
          width: "100%",
          height: "25vh",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="head-info"
          style={{
            height: "20vh",
            width: "35%",
            backgroundColor: "whitesmoke",
            borderRadius: "15px",
            display: "flex",
            position: "relative",
            marginLeft: "2%",
          }}
        >
          <div
            style={{
              width: "60%",
              height: "20vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              paddingLeft: "3%",
            }}
          >
            <h2 style={{ letterSpacing: "1px" }}>Hello {fName}!</h2>
            <label>It's good to see you again.</label>
          </div>
          <div
            style={{
              width: "40%",
              height: "20vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: "47%",
                height: "22vh",
                position: "absolute",
                bottom: 0,
              }}
              src={handup}
            />
          </div>
        </div>
        {profilePhoto}
        <div className="head-info1"
          style={{
            height: "20vh",
            width: "35%",
            borderRadius: "15px",
            display: "flex",
            position: "relative"
          }}
        >
          <div className="head-info2"
            style={{
              width: "70%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <input
              onChange={(e) => {
                props.searchFn(e.target.value);
                props.searchFn1(e.target.value);
              }}
              style={{ height: "25px", width: "60%" }}
              placeholder="Search Courses"
            />
            <div
              style={{
                height: 40,
                width: 40,
                display: "flex",
                position: "relative",
              }}
            >
              <i
                style={{ fontSize: "22px" }}
                class="fa fa-bell-o"
                aria-hidden="true"
                onClick={() => setNoti(true)}
              ></i>
              {notiList.length > 0 ? (
                <button
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: "50%",
                    fontSize: 10,
                    fontWeight: "bold",
                    border: "none",
                    position: "absolute",
                    top: -10,
                    left: 15,
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  {notiList.length}
                </button>
              ) : null}
            </div>
            <div
              style={{
                height: 40,
                width: 40,
                display: "flex",
                position: "relative",
              }}
            >
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{ height: 35, width: 35, border: "1px solid black" }}
                  >
                    <input
                      onChange={(e) => uploadImage(e.target.files[0])}
                      id="asd"
                      type="file"
                      style={{ display: "none" }}
                    />
                    <label for="asd">
                      <div
                        style={{
                          height: 20,
                          width: 20,
                          borderRadius: "50%",
                          fontSize: 13,
                          fontWeight: "bold",
                          fontWeight: "bold",
                          border: "none",
                          position: "absolute",
                          top: -10,
                          left: 27,
                          backgroundColor: "red",
                          color: "white",
                          zIndex: 2,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        +
                      </div>
                    </label>
                    <img style={{ height: 33, width: 33 }} src={progress1!==0?"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm1ycDM5cmVuOG1peDhuZTRxNjM4aXllbmgwam1iY2FmcTYyOTM2eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif":pp} />
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
