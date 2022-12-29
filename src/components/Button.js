import React from 'react';
import './pages/Main.css';
import { Link } from 'react-router-dom';

export function Button() {
  return (
    <Link to='loginsignup'>
      <button className='btn'>Sign Up/Sign In</button>
    </Link>
  );
}
