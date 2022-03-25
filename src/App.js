import React from 'react';
import Home from './components/pages/Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {store,persistor} from './store';
import {Provider} from 'react-redux'
import './App.css';
import LoginSignup from './components/pages/LoginSignup';
import Register from './components/pages/Register';
import PatientHomePage from './components/pages/PatientHomePage';
import DoctorHomePage from './components/pages/DoctorHomePage';
import {setUpNotifications} from 'reapop'
import Alerts from './components/Alerts';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/pages/Logout';
import {PersistGate} from 'redux-persist/integration/react'
import PatientProfile from './components/pages/PatientProfile';
import PatientChangePass from './components/pages/PatientChangePass';
import DoctorProfile from './components/pages/DoctorProfile';
import SearchDoctor from './components/pages/SearchDoctor';
import Appointment from './components/pages/Appointment';
import P_Appointment from './components/pages/P_Appointment';
import Blog from './components/pages/Blog';
import BlogHome from './components/pages/BlogHome';
import NewPost from './components/pages/NewPost';
import DoctorAppointmentSettingBar from './components/pages/DoctorAppointmentSettingBar';
import AppointmentCard from './components/AppointmentCard';
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
      <PersistGate persistor={persistor}> 
    <Router>
     
      <Switch>
        <div>
        <Route path='/' exact component={Home}/>
        <Route path='/loginsignup' exact component={LoginSignup}/>
        <Route path='/logout' exact component={Logout}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/patienthomepage' exact component={PatientHomePage}/>
        <Route path='/doctorhomepage' exact component={DoctorHomePage}/>
        <Route path='/patientprofile' exact component={PatientProfile}/>
        <Route path='/patientchangepass' exact component={PatientChangePass}/>
        <Route path='/doctorprofile' exact component={DoctorProfile}/>
        <Route path='/search_doctor' exact component={SearchDoctor}/>
        <Route path='/appointment' exact component={Appointment}/>
        <Route path= '/p_appointment' exact component={P_Appointment}/>
        <Route path= '/blog' exact component={Blog}/>
        <Route path= '/bloghome' exact component={BlogHome}/>
        <Route path= '/newpost' exact component={NewPost}/>
        <Route path= '/settings' exact component={DoctorAppointmentSettingBar}/>
        <Route path= '/app_card' exact component={AppointmentCard}/>
        
        </div>
      
      
       
      </Switch>

      </Router>
      </PersistGate>
      
    </Provider>
  
  );
}

export default App;
