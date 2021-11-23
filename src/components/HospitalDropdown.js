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
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
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