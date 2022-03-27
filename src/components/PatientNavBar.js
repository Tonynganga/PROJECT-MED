import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./pages/Main.css";
import './PatientNavBar.css';
import HospitalDropdown from "./HospitalDropdown";


function PatientNavBar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  
 

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
      
    }
  };


  return (
    <div innerWidth='auto'>
      <nav className="navbar fixed-top">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          EPIC
          <i class="fab fa-firstdraft" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i
            className={
              click ? "fas fa-times blue-color" : "fas fa-bars blue-color"
            }
          />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
            
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          
          <li className="nav-item"
          >
            <Link
              to="/services"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Hospital Appointment 
            </Link>
           
          </li>
          <li
            className="nav-item"
          >
            <Link
              to="/services"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Search 
            </Link>
            
          </li>
          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to="/services"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Doctor Appointment <i className="fas fa-caret-down" />
              {dropdown && <HospitalDropdown />}
            </Link>
            
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PatientNavBar;
