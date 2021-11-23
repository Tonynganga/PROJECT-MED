import React from "react";
import "./Main.css";
import { SidebarData } from "./SidebarData";
const SideBar = () => {
  return (
    <div className="sidebar">
      <ul className="SidebarList">
          {SidebarData.map((val, key) => {
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

export default SideBar;
