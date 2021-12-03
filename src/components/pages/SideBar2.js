import React from "react";
import "./Main.css";
import { SidebarData2 } from "./SidebarData2";
const SideBar2 = () => {
  return (
    <div className="sidebar">
      <div className="image__view">
        <img src="/images/loginimage.jpg" alt="#" width="60px" height="60px" />
        <div className="name__doctor">
          <h4 className="doctor_profilename">Your Name</h4>
          <p className="doctor_address">Your Address</p>
        </div>
      </div>
      <ul className="SidebarList">
          {SidebarData2.map((val, key) => {
              return (<li 
                        key={key}
                        className="row" 
                        id={window.location.pathname === val.link ? "active": ""}
                        onClick={() => {window.location.pathname = val.link   }}>
                  
                  <div id="icon">{val.icon}</div>
                  <div id="title">{val.title}</div>
              </li>
              );
        })}
      </ul>
    </div>
  );
};

export default SideBar2;