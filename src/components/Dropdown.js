import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
// import './pages/Main.css';
import './Dropdown.css';
import { Link } from 'react-router-dom';

function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <div 

    >
      <ul
      onClick={handleClick}
        // class="dropdown-menu"
        style={{
          // background: "cornsilk",
          width: "100px",
          height: "auto",
          position: "absolute",
          top: "50px",
          listStyle: "none",
          textAlign: "start",
          padding:"0px",
          margin: "0px",
          zIndex: 2,
        }}

      >
        {MenuItems.map((item, index) => {
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

export default Dropdown;
