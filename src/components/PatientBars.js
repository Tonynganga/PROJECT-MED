import React from "react";
import SideBar2 from "./pages/SideBar2";
import PatientNavBar from "./PatientNavBar";
import '././pages/CssMain.css';
import SideBar from "./pages/SideBar";

function PatientBars(){
    return(
        <div>
             <div className="docbarnav">
                <PatientNavBar />

            </div>
            <div className="docbarsidebar">
                <SideBar/>
            </div>

        </div>
    )
}
export default PatientBars;