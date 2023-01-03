import React from 'react';
import './SearchDoctor.css';
import Footer from "../Footer";
import SideBar from './SideBar';
import DoctorCard from "../DoctorCard";
import PatientNavBar from '../PatientNavBar';
function SearchDoctor() {
    return (
        <div className='searchdoc__page'>
            <div className='searchdoc__navbar'>
                <PatientNavBar />
            </div>
            <div className='searchdoc__dashboard'>
                <h4>Home  /  Dashboard</h4>
                <p>Dashboard</p>
            </div>

            <div className="searchdoc__container">

                <div className="searchdoc__sidebar">
                    <SideBar />
                </div>
                <div className='searchdoc__card__holder'>
                    <div className="searchdoc__card">
                        <DoctorCard />
                        <DoctorCard />
                    </div>
                </div>

            </div>
            <Footer />
        </div>

    );
}

export default SearchDoctor;