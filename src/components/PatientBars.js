import React from "react";
import SideBar2 from "./pages/SideBar2";
import PatientNavBar from "./PatientNavBar";
import '././pages/CssMain.css';
import SideBar from "./pages/SideBar";
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

function PatientBars(){
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Redirect to="/" />;
      }
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