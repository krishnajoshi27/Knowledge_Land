import React, { useEffect, useState } from 'react'

import Sidebar from './Sidebar'
import Header from './Header'
import axios from 'axios'
import { baseUrl } from './BaseUrl'


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
    const [userEmail, setUserEmail] = useState(localStorage.getItem("useremailxx"))
    const [userName, setUserName] = useState(localStorage.getItem("username"))
    const updateDetails = () => {
        if (userName === confirmName) {
            const item = {
                password: userPassword,
                name: userName,
                email: userEmail,
            }
             axios.put(baseUrl + "addstudents/" + localStorage.getItem('userId'), item).then(() => {
                setUserName("")
                setConfirmName("")
                setConfirmPassword("")
                setUserPassword("")
                setUserEmail("")
                setConfirmEmail("")
            })
              }else {
                 setValidator(true)
        }
    }

    return (
        <div>
            <div style={{ height: "100vh", width: "100%", display: "flex" }}>
                <div style={{ width: "15%", height: "100vh", backgroundColor: "white", }}>
                    <Sidebar />
                </div>
                <div style={{ width: "82%", marginLeft: "1.5%", height: "100vh", display: "flex", flexDirection: "column" }}>
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
                                    <table className='table'>
                                        <thead style={{ textAlign: "center" }}>
                                            <th>Sr No.</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Password</th>
                                            <th>Grade</th>
                                            <th>Area Of Study</th>
                                            <th>Skills</th>
                                            <th>Language</th>
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
                                                    <td>{i.teachingExp}</td>
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

                        <div style={{ borderRadius: 10, width: "100%", height: "73vh", flexDirection: "column", backgroundColor: "lightgrey", alignItems: "center", display: "flex", justifyContent: "space-evenly" }}>

                            {/* ==================Div for Select Buttons==================== */}
                            <div style={{ width: "90%", height: "50vh", backgroundColor: "white", display: "flex", borderRadius: 10, paddingTop: "50px" }}>
                                <div style={{ width: "30%", height: "40vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <button onClick={() => setShow(1)} style={{ height: "40px", width: "80%", backgroundColor: "black", color: "white", border: "none", borderRadius: 10, marginLeft: "2%" }}>Change Name</button>
                                    <div style={{ height: show === 1 ? "30vh" : "0px", width: "80%", backgroundColor: "lightgrey", transition: "0.5s", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", borderRadius: 10, marginTop: 10 }}>
                                        <input disabled value={localStorage.getItem("username")} style={{ width: "95%", height: 40 }} placeholder='Current Name'></input>
                                        <input value={userName} onChange={((e) => setUserName(e.target.value))} style={{ width: "95%", height: 40 }} placeholder='New Name'></input>
                                        <input value={confirmName} onChange={(e) => setConfirmName(e.target.value)} style={{ width: "95%", height: 40, border: validator === true ? "1px solid red" : "1px solid grey" }} placeholder='Confirm Name'></input>
                                        <button onClick={() => updateDetails()} className='btn btn-outline-success'>Update</button>
                                    </div>
                                </div>
                                <div style={{ width: "30%", height: "40vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <button onClick={() => setShow(2)} style={{ height: "40px", width: "80%", backgroundColor: "black", color: "white", border: "none", borderRadius: 10, marginLeft: "2%" }}>Change Password</button>
                                    <div style={{ height: show === 2 ? "30vh" : "0px", width: "80%", backgroundColor: "lightgrey", transition: "0.5s", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", borderRadius: 10, marginTop: 10 }}>
                                        <input disabled value={localStorage.getItem("userpassword")} style={{ width: "95%", height: 40 }} placeholder='Current Password'></input>
                                        <input value={userPassword} onChange={((e) => setUserPassword(e.target.value))} style={{ width: "95%", height: 40 }} placeholder='New Password'></input>
                                        <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} style={{ width: "95%", height: 40 }} placeholder='Confirm Password'></input>
                                        <button onClick={() => updateDetails()} className='btn btn-outline-success'>Update</button>
                                    </div>
                                </div>
                                <div style={{ width: "30%", height: "40vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <button onClick={() => setShow(3)} style={{ height: "40px", width: "80%", backgroundColor: "black", color: "white", border: "none", borderRadius: 10, marginLeft: "2%" }}>Change Email</button>
                                    <div style={{ height: show === 3 ? "30vh" : "0px", width: "80%", backgroundColor: "lightgrey", transition: "0.5s", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", borderRadius: 10, marginTop: 10 }}>
                                        <input disabled value={localStorage.getItem("useremail")} style={{ width: "95%", height: 40 }} placeholder='Current Email'></input>
                                        <input value={userEmail} onChange={((e) => setUserEmail(e.target.value))} style={{ width: "95%", height: 40 }} placeholder='New Email'></input>
                                        <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmEmail} style={{ width: "95%", height: 40 }} placeholder='Confirm Email'></input>
                                        <button onClick={() => updateDetails()} className='btn btn-outline-success'>Update</button>
                                    </div>                    </div>
                            </div>
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
                                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: "98.5%", height: 35, }} />
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
                                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: "98.5%", height: 35, }} />
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
                                    <option>BBA</option>
                                    <option>BE</option>
                                    <option>B Tech</option>
                                    <option>BCA</option>
                                </select>
                            </div>
                            <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                <select value={teachingExp} onChange={(e) => setTeachingExp(e.target.value)} style={{ width: "100%", height: 40, }}>
                                    <option selected disabled>Teaching Experince</option>
                                    <option>6 Month</option>
                                    <option>1 Year</option>
                                    <option>2 Year</option>
                                    <option>3 Year</option>
                                    <option>4 Year</option>
                                    <option>5 Year</option>
                                    <option>6 Year</option>
                                    <option>8 Year</option>
                                    <option>9 Year</option>
                                    <option>10 Year</option>
                                    <option>11 Year</option>
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