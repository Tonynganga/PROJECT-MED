import React, { useState } from 'react';
import { MenuItems2 } from './MenuItems2';
import './pages/Main.css';
import { Link } from 'react-router-dom';

function Dropdown2() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <div>
      <ul
        onClick={handleClick}
        style={{
          // background: "cornsilk",
          width: "100px",
          height: "auto",
          position: "fixed",
          top: "50px",
          listStyle: "none",
          textAlign: "start",
          padding:"0px",
          margin: "0px",
          zIndex: 2,
        }}
      >
        {MenuItems2.map((item, index) => {
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

export default Dropdown2;
