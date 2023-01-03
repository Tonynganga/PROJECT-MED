import React, { Component } from 'react';
import './Main.css';
import Footer from "../Footer";
import SideBar2 from "./SideBar2";
import PatientNavBar from '../PatientNavBar';
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faSignOutAlt,
//     faFileMedical,
//     faLock,
//     faUserCog,
//     faColumns
//   } from "@fortawesome/free-solid-svg-icons";


export class P_Appointment extends Component {
    render() {
        return (
            <div>
                <div className="p__app__page">
                    <div className='p__app__page__navbar'>
                        <PatientNavBar />
                    </div>
                    <div className='p__app__page__dashboard'>
                        <h4>Home  /  Dashboard</h4>
                        <p>Dashboard</p>
                    </div>
                    <div className="p__app__page__container">
                        <div className="p__app__page__sidebar">
                            <SideBar2 />
                        </div>
                        <div className='p__app__wrapper'>
                            <div className='p__app__header'>
                                <h2>Pending Appointments</h2>
                            </div>
                        </div>
                        
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}


export default P_Appointment;