import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import axios from 'axios'
import { baseUrl } from './BaseUrl'


function Newsandannc() {

    useEffect(()=>{newsAndAnnuGetData()},[])

    const [newsList,setNewsList]=useState([])
    const [noti3,setNoti3]=useState(true)

    const newsAndAnnuGetData=()=>{
        axios.get(baseUrl + "newsandannu").then((res)=>setNewsList(res.data.data))
    }
    const type=localStorage.getItem("type")
  return (
    
    <div>
 

        
        {type==="admin"?
    <div style={{height:"100vh", width:"100%",display:"flex"}}>
        <div
        className="all-course-side"
         style={{width:"15%", height:"100vh", backgroundColor:"white",}}>
            <Sidebar/>
        </div>
        <div  
         style={{width:"82%",marginLeft:"1.5%", height:"100vh", display:"flex", flexDirection:"column"}}>
            <Header/>
            <div className='all-courses-1'  style={{width:"100%", height:"73vh",backgroundColor:"lightgrey",alignItems:"center",display:"flex",flexDirection:"column",justifyContent:"center",borderRadius:10,overflowY:"auto"}}>
                {newsList.map((i)=>
               <div style={{minHeight:"60vh", width:"80%", backgroundColor:"white", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-evenly",borderRadius:10}}><br/><br/>
                <h2>{i.heading}</h2>
                <label>{i.description}</label>
                <img style={{height:"40vh", width:"60%"}} src={i.image}/>
               </div>)}
            </div>
        </div>
    </div>:





              <div className='all-courses-1' style={{ width: "100%", height: "73vh", backgroundColor: "lightgrey", alignItems: "center", display: "flex", borderRadius: 10, flexDirection: "column", overflowY: "auto", paddingBottom: "10px" }}>

                  <div style={{ height: "50px", width: "80%", backgroundColor: "white", textAlign: "center", borderRadius: 10, marginTop: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <h5>Moodle Link :</h5> <a href='https://moodle.com'  target="_blank"> <label>https://moodle.com</label></a>
                  </div>
                  <div style={{ height: "50px", width: "80%", backgroundColor: "white", textAlign: "center", borderRadius: 10, marginTop: 10 }}>
                      <h2>News And Announcement</h2>
                  </div>
                  {newsList.map((i) =>
                      <div className='lgnd1' style={{ height: "60vh", marginTop: "10px", width: "80%", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", borderRadius: 10, paddingBottom: 20 }}><br /><br />
                          <h2>{i.heading}</h2>
                          <label>{i.description}</label>
                          <img className='lgnd1' style={{ height: "40vh", width: "60%" }} src={i.image} />
                      </div>)}
              </div>}
          
</div>



  )
}

export default Newsandannc