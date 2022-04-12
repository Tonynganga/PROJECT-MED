import React, { useState } from 'react';
import { HospitalItems } from './HospitalItems';
// import './pages/Main.css';
import './HospitalDropdown.css';
import { Link } from 'react-router-dom';

function HospitalDropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <div>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu-1 clicked' : 'dropdown-menu-1'}
        // style={{
        //   width: "100px",
        //   height: "auto",
        //   position: "absolute",
        //   top: "50px",
        //   listStyle: "none",
        //   textAlign: "left",
        //   zIndex: 2,
        // }}
      >
        {HospitalItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(true)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HospitalDropdown;