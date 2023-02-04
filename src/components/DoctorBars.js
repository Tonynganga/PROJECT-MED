import React from "react";
import PatientNavBar from "./PatientNavBar";
import SideBar2 from "./pages/SideBar2";
import Footer from "./Footer";
import '././pages/CssMain.css';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';



function DoctorBars() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Redirect to="/" />;
      }

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