import React, { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import './pages/Main.css';
// import './MainNavbar.css';
import Dropdown2 from "./Dropdown2";
import Dropdown from "./Dropdown";
import Modal from "./ReviewModal";

function MainNavbar() {

  const [modalOpen, setModalOpen] = useState(false);

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);

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
  const onMouseEnter2 = () => {
    if (window.innerWidth < 960) {
      setDropdown2(false);
    } else {
      setDropdown2(true);
    }
  };

  const onMouseLeave2 = () => {
    if (window.innerWidth < 960) {
      setDropdown2(false);
    } else {
      setDropdown2(false);

    }
  };

  return (
    <div>
      <nav className="main__navbar fixed-top">
        <Link to="/" className="main__navbar__logo" onClick={closeMobileMenu}>
          <img src="/images/logo.png" alt="Logo" height="60px" width="60px" />
        </Link>
        <div className="main__navbar__menu-icon" onClick={handleClick}>
          <i
            className={
              click ? "fas fa-times blue-color" : "fas fa-bars blue-color"
            }
          />
        </div>
        <ul className={click ? "main__navbar__menu active" : "main__navbar__menu"}>
          <li className="main__navbar__nav-item">
            <Link to="/" className="main_navbar__nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className="main__navbar__nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {dropdown && <Dropdown />}
            <Link
              to="/services"
              className="main_navbar__nav-links"
              onClick={closeMobileMenu}
            >

              Doctors <i className="fas fa-caret-down" />

            </Link>

          </li>
          <li
            className="main__navbar__nav-item"
            onMouseEnter={onMouseEnter2}
            onMouseLeave={onMouseLeave2}
          >
            {dropdown2 && <Dropdown2 />}
            <Link
              to="/services"
              className="main_navbar__nav-links"
              onClick={closeMobileMenu}
            >

              Patients <i className="fas fa-caret-down" />

            </Link>

          </li>


          <li className="main__navbar__nav-item">
            <Link
              to="/appointment"
              className="main_navbar__nav-links"
              onClick={closeMobileMenu}
            >
              Products
            </Link>
          </li>
          <li className="main__navbar__nav-item">
            <Link
              to="/contact-us"
              className="main_navbar__nav-links"

            >
              Contact Us
            </Link>

          </li>



          <li>
            <Link
              to="/loginsignup"
              className="main__navbar__nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li>
        </ul>
        <div className="main__navbar__button-signup" onClick>
          <Button />
        </div>
      </nav>
    </div >
  );
}

export default MainNavbar;
