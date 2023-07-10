import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from './BaseUrl'


function Signupteacher() {
  const navigate = useNavigate()
  useEffect(() => { getCourseData() }, [])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [qualification, setQualification] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [teachingExp, setTeachingExp] = useState("")
  const [timing, setTiming] = useState([])
  const [day, setDay] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [videoLink, setVideoLink] = useState("")
  const [validation, setValidation] = useState(false)


  const [courseData, setCourseData] = useState([])
  const getCourseData = () => {
    axios.get(baseUrl + "addcourse").then((res) => setCourseData(res.data.data))
  }

  const postTeachersData = () => {

    if (name !== "" & email !== "" & password !== "" & qualification !== "" & specialization !== "" & teachingExp !== ""&email.includes("@")&email.includes(".com")) {
      const item = {
        name: name,
        email: email,
        password: password,
        qualification: qualification,
        specialization: specialization,
        teachingExp: teachingExp,
        timing: timing,
        type: "teacher",
        videoLink: "",
        profilePhoto: "",

      }
      axios.post(baseUrl + "addstudents", item).then(() => navigate("/"))
    } else {
      setValidation(true)
    }
  }

  const addTiming = () => {
    if (day !== "" & from !== "" & to !== "") {
      const item = {
        day: day,
        from: from,
        to: to
      }

      setTiming([...timing, item])
      setDay("")
      setFrom("")
      setTo("")
    }

  }

  return (
    <div>
      <div style={{ height: "100vh", width: "100%", display: "flex", flexWrap:"wrap" }}>
        <div className='lgnd1'
          style={{
            height: "100vh",
            width: "50%",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            paddingLeft: "5%"
          }}
        >
          <div className='lgnd1' style={{ height: "95vh", width: "70%" }}>

            <label
              style={{
                fontSize: 30,
                fontWeight: "bolder",
                letterSpacing: "1px",

              }}
            >
              Signup as a Teacher
            </label>
            <br />
            <br />
            <br />
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
              <input onChange={(e) => setName(e.target.value)} placeholder="Full Name" style={{ width: "100%", height: 40,border:validation===true&name===""?"1px solid red":"1px solid grey" }} />
            </div>

            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>

              <input onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" style={{ width: "100%", height: 40,border:validation===true&email===""?"1px solid red":"1px solid grey" }} />
              <label style={{fontSize:12, color:"red", display:(!email.includes("@")||!email.includes(".com"))&validation?"block":"none"}}>*Invalid Email</label>
            </div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
              <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: "100%", height: 40,border:validation===true&password===""?"1px solid red":"1px solid grey" }} />
            </div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
              <select onChange={(e) => setSpecialization(e.target.value)} style={{ width: "100%", height: 40,border:validation===true&specialization===""?"1px solid red":"1px solid grey" }}>
                <option selected disabled>Specialization</option>
                {courseData.map((i) =>
                  <option>{i.courseName}</option>
                )}
              </select>
            </div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>

              <select onChange={(e) => setQualification(e.target.value)} style={{ width: "100%", height: 40, border:validation===true&qualification===""?"1px solid red":"1px solid grey"}}>
                <option selected disabled>Qualification</option>
                <option>Master's Degree</option>
                <option>PhD or Doctorate</option>
                <option>Teaching Certification</option>
                <option>Other</option>
              </select>
            </div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
              <select onChange={(e) => setTeachingExp(e.target.value)} style={{ width: "100%", height: 40,border:validation===true&teachingExp===""?"1px solid red":"1px solid grey" }}>
                <option selected disabled>Teaching Experince</option>
                <option value={1}>More than 1 year</option>
                <option value={2.5}>1-3 years</option>
                <option value={4.5}>3-5 years</option>
                <option value={7.5}>5-10 years</option>
                <option value={10}>More Than 10 years</option>
              </select>
            </div>

            <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", height: "60px", justifyContent: "space-between", }}>
              <select onChange={(e) => setDay(e.target.value)} style={{ width: "25%", height: 40, border:validation===true&day===""?"1px solid red":"1px solid grey"}}>
                <option selected disabled>Day</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>

              <input onChange={(e) => setFrom(e.target.value)} style={{ width: "25%", height: 40,border:validation===true&from===""?"1px solid red":"1px solid grey" }} type="time"></input>
              <input onChange={(e) => setTo(e.target.value)} style={{ width: "25%", height: 40,border:validation===true&to===""?"1px solid red":"1px solid grey" }} type="time"></input>
              <button style={{ width: "10%", }} className="btn btn-outline-primary" onClick={() => addTiming()}>+</button>
            </div>


            {timing.length > 0 ? <table className="table">
              <thead>
                <th>Sr No.</th>
                <th>Day</th>
                <th>From</th>
                <th>To</th>
              </thead>
              <tbody>
                {timing.map((i, n) => <tr>
                  <td>{n + 1}</td>
                  <td>{i.day}</td>
                  <td>{i.from}</td>
                  <td>{i.to}</td>
                </tr>)}
              </tbody>
            </table> : null}


            <br />
            <button onClick={() => { postTeachersData() }} style={{ width: "100%", height: 40, borderRadius: 5, color: "white", backgroundColor: "black", border: "none" }}>Create Account</button><br /><br />
            <label>Already have an account? <span onClick={() => navigate("/")} style={{ color: "#8b5fb3" }}>Login</span></label>
          </div>
        </div>
        <div className='lgnd1'
          style={{ height: "100vh", width: "50%", }}>
          <div

            style={{ height: "100vh", width: "100%", backgroundColor: "black", display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", color: "white" }}>
            <h2 style={{ fontFamily: "Tilt Prism", textShadow: "5px 5px 10px orange" }}><label style={{ fontSize: 67 }}>KNOWLEDGE LAND </label> <br /> VIRTUAL LEARNING PLATFORM</h2>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Signupteacher;
