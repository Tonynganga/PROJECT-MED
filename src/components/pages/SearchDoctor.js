import React from 'react';
import './SearchDoctor.css';
import Footer from "../Footer";
import SideBar from './SideBar';
import DoctorCard from "../DoctorCard";
import PatientNavBar from '../PatientNavBar';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
function SearchDoctor() {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


    if (!isAuthenticated) {
        return <Redirect to="/" />;
      }

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