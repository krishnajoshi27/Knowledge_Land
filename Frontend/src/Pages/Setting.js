import React, { useEffect, useState } from 'react'

import Sidebar from './Sidebar'
import Header from './Header'
import axios from 'axios'
import { baseUrl } from './BaseUrl'
import { json, useNavigate } from "react-router-dom";


function Setting() {


    useEffect(() => { getStuData() }, [])
    useEffect(() => { getTeachData() }, [])
    const [stuList, setStuList] = useState([])
    const [teachList, setTeachList] = useState([])
    const [clrBtn, setClrBtn] = useState(1)
    const [show, setShow] = useState(0)
    const [mdl, setMdl] = useState(false)
    const [mdl1, setMdl1] = useState(false)
    const type = localStorage.getItem("type")


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [grade, setGrade] = useState("")
    const [areaOfStudy, setAreaOfStudy] = useState("")
    const [skills, setSkills] = useState("")
    const [language, setLanguage] = useState("")    
    const [qualification, setQualification] = useState("")
    const [specialization, setSpecialization] = useState("")
    const [teachingExp, setTeachingExp] = useState("")
    const [stuEditId, setStuEditId] = useState("")
    const [teachEditId, setTeachEditId] = useState("")
    const [confirmName, setConfirmName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")

    const [validator, setValidator] = useState(false)
    const [videoLink, setVideoLink] = useState("")

    const navigate = useNavigate();


    const [day, setDay] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")




    const addTiming = () => {
        if (day !== "" & from !== "" & to !== "") {
            const item = {
                day: day,
                from: from,
                to: to
            }
            setTiming([...timing, item])
            localStorage.setItem("timing", JSON.stringify([...timing, item]))

            axios.put(baseUrl + "addstudents/" + localStorage.getItem('userId'), { timing: [...timing, item] })

            setDay("")
            setFrom("")
            setTo("")
        }

    }
    const removeTiming = (x) => {

        setTiming(timing.filter((i, n) => n !== x))
        localStorage.setItem("timing", JSON.stringify(timing.filter((i, n) => n !== x)))
        axios.put(baseUrl + "addstudents/" + localStorage.getItem('userId'), { timing: timing.filter((i, n) => n !== x) })


    }



    const time = localStorage.getItem("timing")
    const parshData = time ? JSON.parse(time) : []
    const [timing, setTiming] = useState(parshData)

    const getStuData = () => {
        axios.get(baseUrl + "addstudents").then((res) => setStuList(res.data.data.filter((i) => i.type === "student" & i.addData === "admin")))
    }
    const getTeachData = () => {
        axios.get(baseUrl + "addstudents").then((res) => setTeachList(res.data.data.filter((i) => i.type === "teacher" & i.addData === "admin")))
    }





    const studentPutData = () => {
        const item = {
            name: name,
            email: email,
            password: password,
            grade: grade,
            areaOfStudy: areaOfStudy,
            skills: skills,
            language: language,
            type: "student",
            addData: "admin"
        }
        axios.put(baseUrl + "addstudents/" + stuEditId, item).then(() => getStuData());
        setMdl(false)
    }




    const teacherPutData = () => {
        const item = {
            name: name,
            email: email,
            password: password,
            qualification: qualification,
            specialization: specialization,
            teachingExp: teachingExp,
            type: "teacher",
            addData: "admin"

        }
        axios.put(baseUrl + "addstudents/" + teachEditId, item).then(() => getTeachData());
        setMdl1(false)
    }

    const stuDltData = (x) => {
        axios.delete(baseUrl + "addstudents/" + x).then(() => getStuData())
    }

    const teachDltData = (x) => {
        axios.delete(baseUrl + "addstudents/" + x).then(() => getTeachData())
    }
    const [userPassword, setUserPassword] = useState(localStorage.getItem("userpassword"))
    const [userEmail, setUserEmail] = useState(localStorage.getItem("useremail"))
    const [userName, setUserName] = useState(localStorage.getItem("username"))
    const updateDetails = () => {
        if ((userName === confirmName) || (userEmail === confirmEmail) || (userPassword === confirmPassword)) {
            const item = {
                password: userPassword,
                name: userName,
                email: userEmail,
            }
            localStorage.setItem("username", userName);
            localStorage.setItem("useremail", userEmail);
            localStorage.setItem("userpassword", userPassword);
            axios.put(baseUrl + "addstudents/" + localStorage.getItem('userId'), item).then(() => {
                setUserName("")
                setConfirmName("")
                setConfirmPassword("")
                setUserPassword("")
                setUserEmail("")
                setConfirmEmail("")
            })
        } else {
            setValidator(true)
        }
    }

    const addClassLink = () => {
        const item = {
            videoLink: videoLink
        }
        axios.put(baseUrl + "addstudents/" + localStorage.getItem('userId'), item)
    }




    const hhmn = (x) => {
        const value = x.split(":")
        const hh = value[0] > 12 ? value[0] - 12 : value[0]
        const fhh = hh < 10 ? `0${hh}` : hh
        const mn = value[1]
        const ampm = value[0] < 12 ? "Am" : "Pm"
        return `${fhh}:${mn} ${ampm}`
    }
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
                    {type === "admin" ?
                        <div style={{ borderRadius: 10, width: "100%", height: "73vh", flexDirection: "column", backgroundColor: "lightgrey", alignItems: "center", display: "flex", justifyContent: "space-evenly" }}>

                            {/* ==================Div for Select Buttons==================== */}
                            <div style={{ width: "90%", height: "12vh", backgroundColor: "white", display: "flex", alignItems: "center", borderRadius: 10 }}>
                                <button onClick={() => setClrBtn(1)} style={{ height: "40px", width: "10%", backgroundColor: clrBtn === 1 ? "black" : "transparent", color: clrBtn === 1 ? "white" : "black", border: "none", borderRadius: 10, marginLeft: "2%" }}>Student</button>
                                <button onClick={() => setClrBtn(2)} style={{ height: "40px", width: "10%", backgroundColor: clrBtn === 2 ? "black" : "transparent", color: clrBtn === 2 ? "white" : "black", border: "none", borderRadius: 10, marginLeft: "2%" }}>Teachers</button>
                            </div>
                            {/* ==================tabel for student and teacher==================== */}
                            {clrBtn === 1 ?
                                <div style={{ width: "90%", height: "55vh", backgroundColor: "white", overflowX: "auto", overflowY: "auto", padding: "10px", borderRadius: 10 }}>
                                    <table className='table text-nowrap'>
                                        <thead style={{ textAlign: "center" }}>
                                            <th>Sr No.</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Password</th>
                                            <th>Grade</th>
                                            <th>Area Of Study</th>
                                            <th>Skills</th>
                                            <th>Learning Objective</th>
                                            <th>Action</th>
                                        </thead>
                                        <tbody style={{ textAlign: "center" }}>
                                            {stuList.map((i, n) =>
                                                <tr>
                                                    <td>{n + 1}</td>
                                                    <td>{i.name}</td>
                                                    <td>{i.email}</td>
                                                    <td>{i.password}</td>
                                                    <td>{i.grade}</td>
                                                    <td>{i.areaOfStudy}</td>
                                                    <td>{i.skills}</td>
                                                    <td>{i.language}</td>
                                                    <td>
                                                        <button className='btn btn-outline-success'>
                                                            <i onClick={() => {
                                                                setStuEditId(i._id)
                                                                setName(i.name)
                                                                setEmail(i.email)
                                                                setPassword(i.password)
                                                                setGrade(i.grade)
                                                                setAreaOfStudy(i.areaOfStudy)
                                                                setSkills(i.skills)
                                                                setLanguage(i.language)
                                                                setMdl(true)
                                                            }} className='fa fa-pencil'></i></button>&nbsp; <button onClick={() => stuDltData(i._id)} className='btn btn-outline-danger'>
                                                            <i className='fa fa-trash'></i></button></td>
                                                </tr>)}
                                        </tbody>
                                    </table>
                                </div> :


                                <div style={{ width: "90%", height: "55vh", backgroundColor: "white", overflowX: "auto", overflowY: "auto", padding: "10px", borderRadius: 10 }}>
                                    <table className='table'>
                                        <thead style={{ textAlign: "center" }}>
                                            <th>Sr No.</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Password</th>
                                            <th>Qualification</th>
                                            <th>Specialization</th>
                                            <th>Teaching Experince</th>
                                            <th>Action</th>
                                        </thead>
                                        <tbody style={{ textAlign: "center" }}>
                                            {teachList.map((i, n) =>
                                                <tr>
                                                    <td>{n + 1}</td>
                                                    <td>{i.name}</td>
                                                    <td>{i.email}</td>
                                                    <td>{i.password}</td>
                                                    <td>{i.qualification}</td>
                                                    <td>{i.specialization}</td>
                                                    <td>{i.teachingExp} Year</td>
                                                    <td>
                                                        <button className='btn btn-outline-success'>
                                                            <i onClick={() => {
                                                                setName(i.name)
                                                                setEmail(i.email)
                                                                setPassword(i.password)
                                                                setQualification(i.qualification)
                                                                setSpecialization(i.specialization)
                                                                setTeachingExp(i.teachingExp)
                                                                setTeachEditId(i._id)
                                                                setMdl1(true)

                                                            }} style={{ color: "green" }} className='fa fa-pencil'></i></button>&nbsp;<button onClick={() => teachDltData(i._id)} className='btn btn-outline-danger'>
                                                            <i className='fa fa-trash'></i></button></td>
                                                </tr>)}
                                        </tbody>
                                    </table>
                                </div>}
                        </div> :

                        <div className='all-courses-1' style={{ borderRadius: 10, width: "100%", minHeight: "73vh", flexDirection: "column", backgroundColor: "lightgrey", alignItems: "center", display: "flex", justifyContent: "space-evenly", paddingTop: 20, paddingBottom: 20 }}>

                            {/* ==================Div for Select Buttons==================== */}
                            <div style={{ width: "95%", minHeight: "10vh", backgroundColor: "white", display: "flex", borderRadius: 10, paddingTop: "10px", flexDirection: "column", overflowY: "auto", }}>
                                <div className='set-res1'   style={{ minHeight: "4vh", width: "100%", display: "flex", }}>
                                    <div className='lgnd1'  style={{ width: "30%", height: "40vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <button onClick={() => setShow(1)} style={{ height: "40px", width: "80%", backgroundColor: "black", color: "white", border: "none", borderRadius: 10, marginLeft: "2%" }}>Change Name</button>
                                        <div style={{ height: show === 1 ? "30vh" : "0px", width: "80%", backgroundColor: "lightgrey", transition: "0.5s", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", borderRadius: 10, marginTop: 10 }}>
                                            <input disabled value={localStorage.getItem("username")} style={{ width: "95%", height: 40 }} placeholder='Current Name'></input>
                                            <input onChange={((e) => setUserName(e.target.value))} style={{ width: "95%", height: 40 }} placeholder='New Name'></input>
                                            <input value={confirmName} onChange={(e) => setConfirmName(e.target.value)} style={{ width: "95%", height: 40, border: validator === true ? "1px solid red" : "1px solid grey" }} placeholder='Confirm Name'></input>
                                            <button onClick={() => { updateDetails(); setShow(0) }} className='btn btn-outline-success'>Update</button>
                                        </div>
                                    </div>
                                    <div className='lgnd1'  style={{ width: "30%", height: "40vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <button onClick={() => setShow(2)} style={{ height: "40px", width: "80%", backgroundColor: "black", color: "white", border: "none", borderRadius: 10, marginLeft: "2%" }}>Change Password</button>
                                        <div style={{ height: show === 2 ? "30vh" : "0px", width: "80%", backgroundColor: "lightgrey", transition: "0.5s", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", borderRadius: 10, marginTop: 10 }}>
                                            <input disabled value={localStorage.getItem("userpassword")} style={{ width: "95%", height: 40 }} placeholder='Current Password'></input>
                                            <input onChange={((e) => setUserPassword(e.target.value))} style={{ width: "95%", height: 40 }} placeholder='New Password'></input>
                                            <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} style={{ width: "95%", height: 40 }} placeholder='Confirm Password'></input>
                                            <button onClick={() => { updateDetails(); localStorage.removeItem("check"); navigate("/"); setShow(0) }} className='btn btn-outline-success'>Update</button>
                                        </div>
                                    </div>
                                    <div className='lgnd1'  style={{ width: "30%", height: "40vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <button onClick={() => setShow(3)} style={{ height: "40px", width: "80%", backgroundColor: "black", color: "white", border: "none", borderRadius: 10, marginLeft: "2%" }}>Change Email</button>
                                        <div style={{ height: show === 3 ? "30vh" : "0px", width: "80%", backgroundColor: "lightgrey", transition: "0.5s", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", borderRadius: 10, marginTop: 10 }}>
                                            <input disabled value={localStorage.getItem("useremail")} style={{ width: "95%", height: 40 }} placeholder='Current Email'></input>
                                            <input onChange={((e) => setUserEmail(e.target.value))} style={{ width: "95%", height: 40 }} placeholder='New Email'></input>
                                            <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmEmail} style={{ width: "95%", height: 40 }} placeholder='Confirm Email'></input>
                                            <button onClick={() => { updateDetails(); localStorage.removeItem("check"); navigate("/"); setShow(0) }} className='btn btn-outline-success'>Update</button>
                                        </div>

                                    </div>

                                    {type === "teacher" ?
                                        <div className='lgnd1'  style={{ width: "30%", height: "40vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <button onClick={() => setShow(4)} style={{ height: "40px", width: "80%", backgroundColor: "black", color: "white", border: "none", borderRadius: 10, marginLeft: "2%" }}>Add  Sedule Timing</button>
                                            <div style={{ height: show === 4 ? "30vh" : "0px", width: "80%", backgroundColor: "lightgrey", transition: "0.5s", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", borderRadius: 10, marginTop: 10 }}>
                                                <select onChange={((e) => setDay(e.target.value))} style={{ width: "95%", height: 40 }}>
                                                    <option selected disabled>Day</option>
                                                    <option>Monday</option>
                                                    <option>Tuesday</option>
                                                    <option>Wednesday</option>
                                                    <option>Thursday</option>
                                                    <option>Friday</option>
                                                    <option>Saturday</option>
                                                    <option>Sunday</option>
                                                </select>
                                                <input type="time" onChange={((e) => setFrom(e.target.value))} style={{ width: "95%", height: 40 }} placeholder='From'></input>
                                                <input type="time" onChange={(e) => setTo(e.target.value)} style={{ width: "95%", height: 40 }} placeholder='To'></input>
                                                <button onClick={() => addTiming()} className='btn btn-outline-success'>Update</button>
                                            </div>

                                        </div> : null}


                                    {type === "teacher" ?
                                        <div className='lgnd1'  style={{ width: "30%", height: "40vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <button onClick={() => setShow(5)} style={{ height: "40px", width: "80%", backgroundColor: "black", color: "white", border: "none", borderRadius: 10, marginLeft: "2%" }}>Add Class Link</button>
                                            <div style={{ height: show === 5 ? "30vh" : "0px", width: "80%", backgroundColor: "lightgrey", transition: "0.5s", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", borderRadius: 10, marginTop: 10 }}>
                                                <input onChange={(e) => setVideoLink(e.target.value)} style={{ width: "95%", height: 40 }} placeholder='Class Link' />

                                                <button onClick={() => addClassLink()} className='btn btn-outline-success'>Update</button>
                                            </div>

                                        </div> : null}


                                </div>



                            </div>
                            {type === "teacher"&timing.length>0 ?
                                <div style={{width:"95%", minHeight:"30vh", backgroundColor:"white", borderRadius:10, marginTop:"1%"}}>
                      
                                    <table className='table'>
                                        <thead>
                                            <th>Sr No.</th>
                                            <th>Day</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Remove</th>
                                        </thead>
                                        <tbody>

                                            {timing.map((i, n) =>
                                                <tr>
                                                    <td>{n + 1}</td>
                                                    <td>{i.day}</td>
                                                    <td>{hhmn(i.from)}</td>
                                                    <td>{hhmn(i.to)}</td>
                                                    <td> <button className='btn btn-outline-danger' onClick={() => removeTiming(n)}>
                                                        <i className='fa fa-times'></i>
                                                    </button></td>
                                                </tr>)}
                                        </tbody>
                                    </table> </div>: null}
                            {/* ==================tabel for student and teacher==================== */}


                        </div>}
                </div>

                {/* ==================Modal for student==================== */}
                {mdl &&
                    <div style={{ width: "100%", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", zIndex: 20 }}>
                        <div style={{ width: "50%", minHeight: "40vh", backgroundColor: "white", borderRadius: 10, marginTop: "1%", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 10, paddingTop: 10 }}>

                            <h2>Students</h2>
                            <i class="fa fa-times" style={{ position: "absolute", top: 10, right: 10, fontSize: 25 }}
                                onClick={() => setMdl(false)} ></i>
                            <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" style={{ width: "98.5%", height: 35, }} />
                            </div>

                            <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly", }}>

                                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" style={{ width: "98.5%", height: 35, }} />
                            </div>
                            <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: "98.5%", height: 35, }} />
                            </div>
                            <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                <select value={grade} onChange={(e) => setGrade(e.target.value)} style={{ width: "100%", height: 40, }}>
                                    <option selected disabled>Grade Level</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                    <option>D</option>
                                </select>
                            </div>
                            <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>

                                <select value={areaOfStudy} onChange={(e) => setAreaOfStudy(e.target.value)} style={{ width: "100%", height: 40 }}>
                                    <option selected disabled>Area of study</option>
                                    <option>BBA</option>
                                    <option>BE</option>
                                    <option>B Tech</option>
                                    <option>BCA</option>
                                </select>
                            </div>
                            <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                <select value={skills} onChange={(e) => setSkills(e.target.value)} style={{ width: "100%", height: 40, }}>
                                    <option selected disabled>Skills</option>
                                    <option>Reactjs</option>
                                    <option>Nodejs</option>
                                    <option>MongoDB</option>
                                    <option>Html</option>
                                    <option>Css</option>
                                    <option>Angular</option>

                                </select>
                            </div>
                            <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ width: "100%", height: 40, }}>
                                    <option selected disabled>Preferred Language</option>
                                    <option>Hindi</option>
                                    <option>English</option>


                                </select>
                            </div>
                            <button onClick={() => studentPutData()} className='btn btn-outline-success'>Submit</button>


                        </div>
                    </div>}

                {/* ==================Modal for Teacher==================== */}
                {mdl1 &&
                    <div style={{ width: "100%", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", zIndex: 20 }}>
                        <div style={{ width: "50%", minHeight: "40vh", backgroundColor: "white", borderRadius: 10, marginTop: "1%", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 10, paddingTop: 10 }}>

                            <h2>Teacher</h2>
                            <i class="fa fa-times" style={{ position: "absolute", top: 10, right: 10, fontSize: 25 }}
                                onClick={() => setMdl1(false)} ></i>
                            <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" style={{ width: "98.5%", height: 35, }} />
                            </div>

                            <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly", }}>

                                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" style={{ width: "98.5%", height: 35, }} />
                            </div>
                            <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                <input  type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: "98.5%", height: 35, }} />
                            </div>
                            <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                <select value={specialization} onChange={(e) => setSpecialization(e.target.value)} style={{ width: "100%", height: 40, }}>
                                    <option selected disabled>Specialization</option>
                                    <option>Reactjs</option>
                                    <option>Node js</option>
                                    <option>MySQL</option>
                                    <option>Java</option>
                                </select>
                            </div>
                            <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>

                                <select value={qualification} onChange={(e) => setQualification(e.target.value)} style={{ width: "100%", height: 40, }}>
                                    <option selected disabled>Qualification</option>
                                    <option>Master's Degree</option>
                                    <option>PhD or Doctorate</option>
                                    <option>Teaching Certification</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                <select value={teachingExp} onChange={(e) => setTeachingExp(e.target.value)} style={{ width: "100%", height: 40, }}>
                                    <option selected disabled>Teaching Experince</option>
                                    <option>More than 1 year</option>
                                    <option>1-3 years</option>
                                    <option>3-5 years</option>
                                    <option>5-10 years</option>
                                    <option>More Than 10 years</option>
                                </select>
                            </div>
                            <button onClick={() => teacherPutData()} className='btn btn-outline-success'>Submit</button>


                        </div>
                    </div>}





            </div>


        </div>
    )
}

export default Setting