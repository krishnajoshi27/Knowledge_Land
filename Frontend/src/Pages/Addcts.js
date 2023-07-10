import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import axios from 'axios'
import { baseUrl } from './BaseUrl'
import storage from "./Firebase";
import Newsandannc from './Newsandannc'
function Addcts() {
    const [showDiv, setShowDiv] = useState(false)

    const [selectType, setSelectType] = useState(1)

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
    const [courseName, setCourseName] = useState("")
    const [teacherName, setTeacherName] = useState("")
    const [heading, setHeading] = useState("")
    const [description, setDescription] = useState("")
    const [time, setTime] = useState("")
    const [image, setImage] = useState("")

    const addTeachersData = () => {
        if (name !== "" & email !== "" & password !== "" & qualification !== "" & specialization !== "" & teachingExp !== "") {
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
            axios.post(baseUrl + "addstudents", item).then(() => {
                setName("")
                setEmail("")
                setPassword("")
                setSpecialization("")
                setQualification("")
                setTeachingExp("")
            })
        }
    }


    const addStudentData = () => {
        if (name !== "" & email !== "" & password !== "" & grade !== "" & areaOfStudy !== "" & skills !== "" & language !== "") {
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
            axios.post(baseUrl + "addstudents", item).then(() => {
                setName("")
                setEmail("")
                setPassword("")
                setGrade("")
                setAreaOfStudy("")
                setSkills("")
                setLanguage("")
            })
        }
    }


    const addCourseData = () => {
        if (courseName !== "") {
            const item = {
                courseName: courseName,

            }
            axios.post(baseUrl + "addcourse", item).then(() => {
                setCourseName("");

            })
        }
    }


    const addNewsAndAnnuData = () => {
        if (heading !== "" & description !== "" & time !== "" & image !== "") {
            const item = {
                heading: heading,
                description: description,
                time: time,
                image: image,
            }
            axios.post(baseUrl + "newsandannu", item).then(() => {
                setHeading("")
                setDescription("")
                setTime("")
                setImage("")
            })
        }
    }
    const type = localStorage.getItem("type")
    useEffect(() => {
        getTeacher()
    })
    const [courseData, setCourseData] = useState([])
    const getTeacher = () => {
        axios.get(baseUrl + "addstudents").then((res) => { setCourseData(res.data.data.filter((i) => i.type === "teacher")) })
    }
    const teacherid = courseData.filter((i) => i.specialization === courseName & i.name === teacherName)[0]?._id


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
                  setImage(url);
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
            <div style={{ height: "100vh", width: "100%", display: "flex" }}>
                <div className='all-course-side'
                 style={{ width: "15%", height: "100vh", backgroundColor: "white", }}>
                    <Sidebar />
                </div>
                <div className='all-courses' 
                style={{ width: "82%", marginLeft: "1.5%", height: "100vh", display: "flex", flexDirection: "column" }}>
                    <Header />
                    {type === "admin" ?
                        <div className='all-courses-1' style={{ borderRadius: 10, width: "100%", height: "73vh", backgroundColor: "lightgrey", alignItems: "center", display: "flex", justifyContent: "space-evenly" }}>
                            <div style={{ height: "70vh", width: "30%", display: "flex", flexDirection: "column", position: "relative", }}>
                                <button className='lgnd1' onClick={() => setShowDiv(!showDiv)} style={{ height: 40, width: "50%", backgroundColor: "white", color: "black", borderRadius: 10, border: "none", fontSize: 15, position: "absolute", top: "10%", left: "25%" }}>Add</button><br />
                                <div style={{
                                    height: (showDiv === true & type === "teacher" ? 37.5 : 0) || (showDiv === true & type !== "teacher" ? 150 : 0), transition: "0.5s", overflow: "hidden", width: "50%", backgroundColor: "white", color: "black", borderRadius: 10, border: "none", fontSize: 15, flexDirection: "column", display: "flex", alignItems: "center", justifyContent: "space-evenly",
                                    position: "absolute", top: "20%", left: "25%"
                                }}>

                                    <label onClick={() => setSelectType(1)}>Courses</label>
                                    {type !== "teacher" &&
                                        <label onClick={() => setSelectType(2)}>Teachers</label>}
                                    {type !== "teacher" &&
                                        <label onClick={() => setSelectType(3)}>Students</label>}
                                    {type !== "teacher" &&
                                        <label onClick={() => setSelectType(4)}>News and Report</label>}
                                </div>
                            </div>

                            {selectType === 3 ?
                                <div style={{ borderRadius: 10, height: "70vh", width: "60%", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                                    <h2>Students</h2>
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                        <input onChange={(e) => setName(e.target.value)} placeholder="Full Name" style={{ width: "100%", height: 40, }} />
                                    </div>

                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly", }}>

                                        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" style={{ width: "100%", height: 40, }} />
                                    </div>
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                        <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: "100%", height: 40, }} />
                                    </div>
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                        <select onChange={(e) => setGrade(e.target.value)} style={{ width: "100%", height: 40, }}>
                                            <option selected disabled>Knowledge Level</option>
                                            <option>Beginner</option>
                                            <option>Intermediate</option>
                                            <option>Advance</option>
                                            <option>Fluent</option>
                                        </select>
                                    </div>
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>

                                        <select onChange={(e) => setAreaOfStudy(e.target.value)} style={{ width: "100%", height: 40 }}>
                                            <option selected disabled>Area of study</option>
                                            <option>High School Diploma</option>
                                            <option>Associate's Degree</option>
                                            <option>Bachelor's Degree</option>
                                            <option>Master's Degree</option>
                                            <option>PhD or Doctorate</option>
                                            <option>Teaching Certification</option>
                                            <option>other</option>
                                        </select>
                                    </div>
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                        <select onChange={(e) => setSkills(e.target.value)} style={{ width: "100%", height: 40, }}>
                                            <option selected disabled>Skills</option>
                                            <option>Python</option>
                                            <option>JavaScript</option>
                                            <option>Reactjs</option>
                                            <option>Nodejs</option>
                                            <option>SQL</option>
                                            <option>Mongo</option>

                                        </select>
                                    </div>
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                        <select onChange={(e) => setLanguage(e.target.value)} style={{ width: "100%", height: 40, }}>
                                            <option selected disabled>Learning Objective</option>
                                            <option>Become a Web Developer</option>
                                            <option>To obtain Data Analytics and Problem-Solving abilities</option>
                                            <option>Gain Logic Development skills</option>
                                            <option>Become Dev-Ops Engineer</option>
                                            <option>Become a Software Developer</option>
                                            <option>Develop Artificial Intelligence professional</option>
                                            <option>Acquire knowledge of Quality Assurance</option>


                                        </select>
                                    </div>
                                    <button onClick={() => addStudentData()} className='btn btn-outline-success'>Submit</button>
                                </div> : null}




                            {selectType === 2 ?
                                <div style={{ borderRadius: 10, height: "70vh", width: "60%", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                                    <h2>Teacher</h2>
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                        <input onChange={(e) => setName(e.target.value)} placeholder="Full Name" style={{ width: "100%", height: 40, }} />
                                    </div>

                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly", }}>

                                        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" style={{ width: "100%", height: 40, }} />
                                    </div>
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                        <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: "100%", height: 40, }} />
                                    </div>
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                        <select onChange={(e) => setSpecialization(e.target.value)} style={{ width: "100%", height: 40, }}>
                                            <option selected disabled>Specialization</option>
                                            <option >JavaScript</option>
                                            <option >Python</option>
                                            <option >Reactjs</option>
                                            <option >Nodejs</option>
                                            <option >MsSQL</option>
                                            <option >MongoDB</option>
                                            <option >Machine Learning, AI</option>
                                            <option >DevOps</option>
                                            <option >Java</option>
                                            <option >C#</option>
                                            <option >C, C++</option>
                                            <option >.NET</option>
                                        </select>
                                    </div>
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>

                                        <select onChange={(e) => setQualification(e.target.value)} style={{ width: "100%", height: 40, }}>
                                            <option selected disabled>Qualification</option>
                                            <option>Master's Degree</option>
                                            <option>PhD or Doctorate</option>
                                            <option>Teaching Certification</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                        <select onChange={(e) => setTeachingExp(e.target.value)} style={{ width: "100%", height: 40, }}>
                                            <option selected disabled>Teaching Experince</option>
                                            <option value={1}>More than 1 year</option>
                                            <option value={2.5}>1-3 years</option>
                                            <option value={4.5}>3-5 years</option>
                                            <option value={7.5}>5-10 years</option>
                                            <option value={10}>More Than 10 years</option>
                                        </select>
                                    </div>

                                    <button onClick={() => addTeachersData()} className='btn btn-outline-success'>Submit</button>
                                </div> : null}


                            {selectType === 1 ?
                                <div style={{ borderRadius: 10, height: "70vh", width: "60%", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", }}><br /><br />
                                    <h2>Courses  </h2><br /><br />
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly", }}>

                                        <input onChange={(e) => setCourseName(e.target.value)} placeholder="Course Name" style={{ width: "100%", height: 40, }} />

                                    </div><br />

                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>

                                    </div>
                                    <br /><br />

                                    <button onClick={() => addCourseData()} className='btn btn-outline-success'>Submit</button>
                                </div> : null}

                            {selectType === 4 ?
                                <div style={{ borderRadius: 10, height: "70vh", width: "60%", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", }}><br /><br />
                                    <h2>News And Announcements</h2><br /><br />
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly", }}>

                                        <input onChange={(e) => setHeading(e.target.value)} placeholder="Heading" style={{ width: "100%", height: 40, }} />
                                    </div><br />
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly", }}>

                                        <input onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{ width: "100%", height: 40, }} />
                                    </div><br />
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly", }}>

                                        <input type="time"  onChange={(e) => setTime(e.target.value)} placeholder="Time" style={{ width: "100%", height: 40, }} />
                                    </div><br />
                                    <div style={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "flex-start", height: "60px", justifyContent: "space-evenly" }}>
                                        <input  type='file'   onChange={(e) => uploadImage(e.target.files[0])} placeholder="Image" style={{ width: "100%", height: 32, border: "1px solid grey" }} />
                                    </div>


                                    <button disabled={image===""} onClick={() => addNewsAndAnnuData()} className='btn btn-outline-success'>Submit</button>
                                </div> : null}
                        </div> : <Newsandannc />}
                </div>
            </div>
        </div>
    )
}

export default Addcts