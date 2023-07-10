import React, { useEffect, useState } from 'react'

import Sidebar from './Sidebar'
import Header from './Header'
import axios from 'axios'
import { baseUrl } from './BaseUrl'
import { useNavigate } from 'react-router-dom'


function Setting() {
  
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
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h1 style={{ color: "black", fontSize: "36px", fontWeight: "bold" }}>settings</h1>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Setting