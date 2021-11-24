import React from "react";
// import "./Main.css";
import "./SideBar.css";
import { SidebarData } from "./SidebarData";
const SideBar = () => {
  return (
    <div className="sidebar">

      <div className="image__view">
        <img src="/images/loginimage.jpg" alt="#" width="60px" height="60px" />
        <div className="name__patient">
          <h4>Your Name</h4>
          <p>Your Address</p>
        </div>
      </div>
      <div className="sidebar__list">
        <ul className="SidebarList">
          {SidebarData.map((val, key) => {
            return (<li
              key={key}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => { window.location.pathname = val.link }}>

              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
            );
          })}
        </ul>
      </div>

    </div>
  );
};

export default SideBar;
