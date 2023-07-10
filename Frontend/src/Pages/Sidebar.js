import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate= useNavigate()

  useEffect(()=>{
    const loginCheck =localStorage.getItem("check")
    if(loginCheck!=="okk"){
      navigate("/")
    }
  })
const type = localStorage.getItem("type")

  
  return (
    <div>
        <div className='sideblack' style={{height:"96vh", width:"50%",backgroundColor:"black",borderRadius:"20px", display:"flex",flexDirection:"column",color:"white",alignItems:"center",justifyContent:"space-evenly",marginLeft:"25%", marginTop:"2vh",}}>
            <h1 onClick={()=>navigate(type==="admin"?"/Newsandannc":"/Addcts")} style={{letterSpacing:"1px",position:"absolute",top:20}}>KL</h1><br/>
            <i onClick={()=>navigate("/Addcts")} style={{fontSize:"23px"}} className='fa fa-home'></i>
            <i onClick={()=>navigate("/Allcourses")} style={{fontSize:"23px"}} class="fa fa-graduation-cap" ></i>
            <i onClick={()=>navigate("/Setting")} style={{fontSize:"23px"}} class="fa fa-cog" ></i>
            <i onClick={()=>{localStorage.removeItem("check");navigate("/")}} style={{fontSize:"23px"}} class="fa fa-sign-out"></i>



        </div>
    </div>
  )
}

export default Sidebar