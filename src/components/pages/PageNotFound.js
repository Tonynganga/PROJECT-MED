import React from 'react'
import './PatientHomePage.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
export default function PageNotFound() {
  return (
    <Router>
        <Switch>
            <div className='pageNotFound'>
                <h1>Ooops..! Page Not Found</h1>
                <p>Looks like you came to wrong page on our server</p>
                <img src='/images/pagenotfound.jpg' height="500" width="500" alt="not found"/>
            </div>
        </Switch>
    </Router>
  )
}
