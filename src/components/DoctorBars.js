import React from "react";
import PatientNavBar from "./PatientNavBar";
import SideBar2 from "./pages/SideBar2";
import Footer from "./Footer";
import '././pages/CssMain.css';



function DoctorBars() {
    return (
        <div>
            <div className="docbarnav">
                <PatientNavBar />

            </div>
            <div className="docbarsidebar">
                <SideBar2/>
            </div>
            
        </div>
        


    );

}

export default DoctorBars;