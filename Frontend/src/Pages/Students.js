import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from './BaseUrl'


function Students() {
    useEffect(()=>{getStudentData()},[])
    const navigate= useNavigate()
    const [studentList, setStudentList]=useState([])

    const getStudentData=()=>{
        axios.get(baseUrl + "addstudents"). then((res)=>setStudentList(res.data.data))
    }
  return (
    <div>
    <div style={{height:"100vh", width:"100%",display:"flex"}}>
        <div style={{width:"15%", height:"100vh", backgroundColor:"white"}}>
            <Sidebar/>
        </div>
        <div style={{width:"82%",marginLeft:"1.5%", height:"100vh", display:"flex", flexDirection:"column"}}>
            <Header/>
            <div style={{width:"100%", height:"73vh",backgroundColor:"white",alignItems:"center",display:"flex",gap:"2%"}}>
                   <div  style={{height:"70vh", width:"45%", textAlign:'center'}}>
                    <label>All Students</label>
                <div style={{height:"70vh", width:"100%", backgroundColor:"white",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:"10px", overflowY:"auto"}}>
                    {studentList.map((i)=>
                    <div style={{height:"12vh", width:"95%", backgroundColor:"whitesmoke",borderRadius:"10px", display:"flex",marginTop:10}}>
                        <div style={{height:"12vh", width:"20%",display:"flex", justifyContent:"center", alignItems:"center",}}>
                            <div style={{height:"9vh", width:"70%",backgroundColor:"white",borderRadius:10,display:"flex", justifyContent:"center", alignItems:"center", }}>
                                <img style={{height:"6.5vh", width:"60%",}} src='https://cdn-icons-png.flaticon.com/512/219/219983.png'/>
                            </div>
                        </div>
                        <div style={{height:"12vh", width:"50%",display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"start"}}>
                            <label style={{fontSize:"19px", fontWeight:"bold",letterSpacing:1,height:25}}>{i.name}</label>
                        
                        </div>
                        <div style={{height:"12vh", width:"30%", display:"flex", justifyContent:"center",alignItems:"center"}}>
                            <button onClick={()=>{localStorage.setItem("courseData1", JSON.stringify(i)); navigate("/Viewcourses")}} style={{height:"40px", width:"80%", backgroundColor:"black", color:"white",borderRadius:10,border:"none"}}>Veiw Info</button>
                        </div>
                    </div>)}
             
        
                </div>
                </div>




                   <div style={{height:"70vh", width:"45%", backgroundColor:"white",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-evenly",}}>
                    <label>Up coming Classes</label>
                    <div style={{height:"12vh", width:"95%", backgroundColor:"whitesmoke",borderRadius:"10px", display:"flex"}}>
                        <div style={{height:"12vh", width:"20%",display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <div style={{height:"9vh", width:"70%",backgroundColor:"white",borderRadius:10,display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <img style={{height:"5vh", width:"60%",}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'/>
                            </div>
                        </div>
                        <div style={{height:"12vh", width:"50%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                            <label style={{fontSize:"19px", fontWeight:"bold",letterSpacing:1,height:25}}>Reactjs Virtual class</label>
                            <label style={{fontSize:13,}}>Sunday 9 PM</label>
                        </div>
                        <div style={{height:"12vh", width:"30%", display:"flex", justifyContent:"center",alignItems:"center"}}>
                            <button style={{height:"40px", width:"80%", backgroundColor:"black", color:"white",borderRadius:10,border:"none"}}>Start class</button>
                        </div>
                    </div>
                    <div style={{height:"12vh", width:"95%", backgroundColor:"whitesmoke",borderRadius:"10px", display:"flex"}}>
                        <div style={{height:"12vh", width:"20%",display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <div style={{height:"9vh", width:"70%",backgroundColor:"white",borderRadius:10,display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <img style={{height:"5vh", width:"60%",}} src='https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/psf/trademarks-faq/python-logo-usa-outset-monochrome-BAD.png'/>
                            </div>
                        </div>
                        <div style={{height:"12vh", width:"50%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                            <label style={{fontSize:"19px", fontWeight:"bold",letterSpacing:1,height:25}}>Python</label>
                            <label>by Gordon norman</label>
                        </div>
                        <div style={{height:"12vh", width:"30%", display:"flex", justifyContent:"center",alignItems:"center"}}>
                            <button style={{height:"40px", width:"80%", backgroundColor:"black", color:"white",borderRadius:10,border:"none"}}>Veiw courses</button>
                        </div>
                    </div>
                    <div style={{height:"12vh", width:"95%", backgroundColor:"whitesmoke",borderRadius:"10px", display:"flex"}}>
                        <div style={{height:"12vh", width:"20%",display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <div style={{height:"9vh", width:"70%",backgroundColor:"white",borderRadius:10,display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <img style={{height:"5vh", width:"60%",}} src='https://cdn.pixabay.com/photo/2016/08/09/17/52/instagram-1581266_640.jpg'/>
                            </div>
                        </div>
                        <div style={{height:"12vh", width:"50%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                            <label style={{fontSize:"19px", fontWeight:"bold",letterSpacing:1,height:25}}>Mern</label>
                            <label>by Sphie Gill</label>
                        </div>
                        <div style={{height:"12vh", width:"30%", display:"flex", justifyContent:"center",alignItems:"center"}}>
                            <button style={{height:"40px", width:"80%", backgroundColor:"black", color:"white",borderRadius:10,border:"none"}}>Veiw courses</button>
                        </div>
                    </div>
                    <div style={{height:"12vh", width:"95%", backgroundColor:"whitesmoke",borderRadius:"10px", display:"flex"}}>
                        <div style={{height:"12vh", width:"20%",display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <div style={{height:"9vh", width:"70%",backgroundColor:"white",borderRadius:10,display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <img style={{height:"5vh", width:"60%",}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5v-3wDKKkDFjrjEGs__MhuaOl5W1A8_46FxOdzH9wIQ&usqp=CAU&ec=48600113'/>
                            </div>
                        </div>
                        <div style={{height:"12vh", width:"50%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                            <label style={{fontSize:"19px", fontWeight:"bold",letterSpacing:1,height:25}}>MsSQL</label>
                            <label>by Jean Tate</label>
                        </div>
                        <div style={{height:"12vh", width:"30%", display:"flex", justifyContent:"center",alignItems:"center"}}>
                            <button style={{height:"40px", width:"80%", backgroundColor:"black", color:"white",borderRadius:10,border:"none"}}>Veiw courses</button>
                        </div>
                    </div>
                    <div style={{height:"12vh", width:"95%", backgroundColor:"whitesmoke",borderRadius:"10px", display:"flex"}}>
                        <div style={{height:"12vh", width:"20%",display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <div style={{height:"9vh", width:"70%",backgroundColor:"white",borderRadius:10,display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <img style={{height:"5vh", width:"60%",}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrXOeYrrq9ogVRZOXbVdkSlsG86GVYzDUlhSWeF4m4vQ&usqp=CAU&ec=48600113'/>
                            </div>
                        </div>
                        <div style={{height:"12vh", width:"50%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                            <label style={{fontSize:"19px", fontWeight:"bold",letterSpacing:1,height:25}}>JavaScript</label>
                            <label>by David Green</label>
                        </div>
                        <div style={{height:"12vh", width:"30%", display:"flex", justifyContent:"center",alignItems:"center"}}>
                            <button style={{height:"40px", width:"80%", backgroundColor:"black", color:"white",borderRadius:10,border:"none"}}>Veiw courses</button>
                        </div>
                    </div>
        
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Students