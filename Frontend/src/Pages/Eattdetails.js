import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { baseUrl } from './BaseUrl';
import Header from './Header'

import { useNavigate } from "react-router-dom";


function Eattdetails() {
  const navigate=useNavigate()

  useEffect(()=>{
    const lc = localStorage.getItem("check")
    if(lc!=="okk"){
      navigate('/')
    }
  },[])
  useEffect(() => {
    presentGetData();
    empgetData();
  }, []);
  const [attList, setattList] = useState([]);
  const [shwmodal, setShwmodal] = useState(false);
  const [name, setName] = useState([]);
  // const presentCheck = name?.filter((j)=>j.status==="Present").map((j)=>+j.date)
  
  const [emplist, setEmpList] = useState([]);
  const [emplist1, setEmpList1] = useState([]);
  
  const empgetData = () => {
    axios
      .get(baseUrl+"addemploye")
      .then((res) => {setEmpList(res.data.data);setEmpList1(res.data.data)});
  };

  const presentGetData = () => {
    axios
      .get(baseUrl+"attendence")
      .then((res) => setattList(res.data.data));
  };
  const presentCheck = attList
    .filter((j) => j.name.includes(name?.firstName) & (j.status === "Present"))
    .map((j) => +j.date);
  const absentCheck = attList
    .filter((j) => j.name.includes(name?.firstName) & (j.status === "Absent"))
    .map((j) => +j.date);
  const halfdayCheck = attList
    .filter((j) => j.name.includes(name?.firstName) & (j.status === "Halfday"))
    .map((j) => +j.date);

  const current = new Date();
  const date = current.getDate();
  const month = current.getMonth()+1
  const year = current.getFullYear();

  const monthList = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const sajn = [3, 5, 8, 10];
  const [currMonth, setCurrMonth] = useState(month);
  const [currYear, setCurrYear] = useState(year);
  const numberOfDays =
    currMonth === 1
      ? currYear % 4 === 0
        ? 29
        : 28
      : sajn.includes(currMonth)
      ? 30
      : 31;

  const calenderData = new Array(numberOfDays).fill().map((i, n) => n + 1);

  const nextMonth = () => {
    if (currMonth === 11) {
      setCurrMonth(0);
      setCurrYear(currYear + 1);
    } else {
      setCurrMonth(currMonth + 1);
    }
  };
  const previusMonth = () => {
    if (currMonth === 0) {
      setCurrMonth(11);
      setCurrYear(currYear - 1);
    } else {
      setCurrMonth(currMonth - 1);
    }
  };

  const firstDayOfMonth = () => {
    const a = new Date(`${monthList[currMonth]} 1, ${currYear} 01:15:00 `);
    const d = a.getDay();
    return d;
  };
  const list1 = new Array(firstDayOfMonth()).fill().map((i, n) => "");
  const list2 = [...list1, ...calenderData];

  const [items, setItems] = useState("");


  const filterFn =(x)=>{
    const list5 = emplist1.filter((i)=>i.firstName.includes(x)||i.lastName.includes(x))
    setEmpList(list5)
}
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <div className="dashdiv">
        <Header filterFn={filterFn}/>
          <div className="fltrdiv" style={{ width: "95%", marginLeft: "2.5%" }}>

            <select className="selemp1" value={currYear} onChange={(e)=>setCurrYear(e.target.value)}>
              <option selected disabled>
                Year
              </option>
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
            </select>
            <select className="selemp1" value={currMonth} onChange={(e)=>setCurrMonth(e.target.value)}>
              <option selected disabled>
                Month
              </option>
              <option value={1}>January</option>
              <option value={2}>Febuary</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>Agust</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
          </div>
          <br />
          <div
            className="text-nowrap tabledd"
            style={{ width: "95%", marginLeft: "2.5%", overflowX: "auto" }}
          >
            <table
              style={{ backgroundColor: "white" }}
              className="table table-bordered"
            >
              <thead
                style={{
                  height: "40px",
                  backgroundColor: "#45529a",
                  color: "white",
                }}
              >
                <th
                  style={{
                    borderRight: "1px solid lightgrey",
                    textAlign: "center",
                  }}
                >
                  Sr No.
                </th>
                <th
                  style={{
                    borderRight: "1px solid lightgrey",
                    textAlign: "center",
                  }}
                >
                  Employee Name
                </th>
                <th
                  style={{
                    borderRight: "1px solid lightgrey",
                    textAlign: "center",
                  }}
                >
                  Total Present
                </th>
                <th
                  style={{
                    borderRight: "1px solid lightgrey",
                    textAlign: "center",
                  }}
                >
                  Total Absent
                </th>
                <th
                  style={{
                    borderRight: "1px solid lightgrey",
                    textAlign: "center",
                  }}
                >
                  Total Halfday
                </th>
                <th
                  style={{
                    borderRight: "1px solid lightgrey",
                    textAlign: "center",
                  }}
                >
                  Details
                </th>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {emplist.map((i, ind) => (
                  <tr>
                    <th style={{ fontWeight: "normal" }}>{ind + 1}</th>
                    <th style={{ fontWeight: "normal" }}>
                      {i.firstName + " " + i.lastName}
                    </th>
                    <th style={{ fontWeight: "normal", color: "green" }}>
                      <i
                        class="fa fa-angle-double-up"
                        aria-hidden="true"
                        style={{ fontSize: "18px" }}
                      ></i>{" "}
                      {
                        attList.filter(
                          (j) =>
                            (j.name === i.firstName + " " + i.lastName) &
                            (j.status === "Present")&j.month==currMonth&j.year==currYear).length
                       
                      }
                    </th>

                    <th style={{ fontWeight: "normal", color: "red" }}>
                      {" "}
                      <i
                        class="fa fa-angle-double-down"
                        aria-hidden="true"
                        style={{ fontSize: "18px" }}
                      ></i>
                      {
                        attList.filter(
                          (j) =>
                            (j.name === i.firstName + " " + i.lastName) &
                            (j.status === "Absent")
                            &j.month==currMonth&j.year==currYear).length
                        }
                    </th>

                    <th style={{ fontWeight: "normal", color:"orange" }}>
                      {" "}
                      <i class="fa fa-star-half-o" aria-hidden="true"></i>&nbsp;

                      {
                        attList.filter(
                          (j) =>
                            (j.name === i.firstName + " " + i.lastName) &
                            (j.status === "Halfday")
                            &j.month==currMonth&j.year==currYear).length
                       
                      }
                    </th>

                    <th style={{ fontWeight: "normal" }}>
                      <i
                        onClick={() => {
                          setName(i);
                          setShwmodal(!shwmodal);
                        }}
                        class="fa fa-eye"
                        aria-hidden="true"
                        style={{ color: "#45529a" }}
                      ></i>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* =====================MODAL==================== */}
      {shwmodal === true ? (
        <div
          className="modalshdw"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="modal11">
            <div
              style={{
                float: "right",
                marginRight: "10px",
                fontSize: "18px",
                color: "white",
              }}
            >
              <i
                onClick={() => setShwmodal(false)}
                class="fa fa-times"
                aria-hidden="true"
                style={{ margin:"10px"}}
              ></i>
            </div>
            <br />
            <br />
            <div
              style={{
                width: "95%",
                height: "10vh",
                marginLeft: "2.5%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // border: "2px solid maroon",
                // borderRadius: 10,
              }}
            >
              <label style={{ color: "white", fontSize: 30 }}>
                {name?.firstName}'s Calender{" "}
              </label>
            </div>
            <div
              style={{
                width: "95%",
                minHeight: "40vh",
                marginLeft: "2.5%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                //  border: "2px solid maroon",
                //  borderRadius: 10,
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <i
                  onClick={() => previusMonth()}
                  class="fa fa-arrow-circle-o-left"
                  aria-hidden="true"
                  style={{ color: "white" }}
                ></i>
                <label style={{ color: "rgba(221 81 66)" }}>
                  {" "}
                  {monthList?.[currMonth]} {currYear}
                </label>
                <i
                  onClick={() => nextMonth()}
                  class="fa fa-arrow-circle-o-right"
                  aria-hidden="true"
                  style={{ color: "white" }}
                ></i>
              </div>
              <br />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <label style={{ color: "grey" }}>Sun</label>
                <label style={{ color: "white" }}>Mon</label>
                <label style={{ color: "white" }}>Tue</label>
                <label style={{ color: "white" }}>Wed</label>
                <label style={{ color: "white" }}>Thu</label>
                <label style={{ color: "white" }}>Fri</label>
                <label style={{ color: "white" }}>Sat</label>
              </div>
              <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                {list2.map((i, n) => (
                  <div
                    style={{
                      width: "13%",
                      textAlign: "end",
           
                    }}
                  >
                    <button
                      style={{
                      
                        color:
                          (i !== "") & (n % 7 === 0)
                            ? "grey"
                            : presentCheck.includes(i) &
                              ((month === currMonth) & (year === currYear))
                            ? "green"
                            : absentCheck.includes(i) &
                              ((month === currMonth) & (year === currYear))
                            ? "red"
                            : halfdayCheck.includes(i) &
                              ((month === currMonth) & (year === currYear))
                            ? "orange"
                            : "white",
                        backgroundColor:
                          (date === i) &
                          (month === currMonth) &
                          (year === currYear)
                            ? "rgba(221 81 66)"
                            : "transparent",
                        textAlign: "center",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginTop: "10px",
                        border:"none"
                      }}
                    >
                      {i}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Eattdetails;
