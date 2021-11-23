import React from "react";
import "./Main.css";
import { SidebarData2 } from "./SidebarData2";
const SideBar2 = () => {
  return (
    <div className="sidebar">
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