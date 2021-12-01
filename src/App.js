import React from 'react';
import Home from './components/pages/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux'
import './App.css';
import LoginSignup from './components/pages/LoginSignup';
import Register from './components/pages/Register';
import PatientHomePage from './components/pages/PatientHomePage';
import DoctorHomePage from './components/pages/DoctorHomePage';
import {setUpNotifications} from 'reapop'
import Alerts from './components/Alerts';
import PatientProfile from './components/pages/PatientProfile';
import PatientChangePass from './components/pages/PatientChangePass';
import DoctorProfile from './components/pages/DoctorProfile';

function App() {
  setUpNotifications({
    defaultProps: {
        position: 'top-right',
        dismissible: true,
        dismissAfter: 3000
    } 
})
 
  return (
    <Provider store={store}>
      <Alerts/>
      
    <Router>
     
      <Switch>
        <div>
        <Route path='/' exact component={Home}/>
        <Route path='/loginsignup' exact component={LoginSignup}/>
        <Route path='/patienthomepage' exact component={PatientHomePage}/>
        <Route path='/doctorhomepage' exact component={DoctorHomePage}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/patientprofile' exact component={PatientProfile}/>
        <Route path='/patientchangepass' exact component={PatientChangePass}/>
        <Route path='/doctorprofile' exact component={DoctorProfile}/>

        </div>
      
      
       
      </Switch>
      </Router>
    </Provider>
  
  );
}

export default App;
