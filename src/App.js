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
import Logout from './components/pages/Logout';
import {PersistGate} from 'redux-persist/integration/react'
import PatientProfile from './components/pages/PatientProfile';
import ChangePass from './components/pages/ChangePass';
import DoctorProfile from './components/pages/DoctorProfile';
import SearchDoctor from './components/pages/SearchDoctor';
import Appointment from './components/pages/Appointment';
import P_Appointment from './components/pages/P_Appointment';
import Blog from './components/pages/Blog';
import BlogHome from './components/pages/BlogHome';
import NewPost from './components/pages/NewPost';
import DoctorAppointmentSettingBar from './components/pages/DoctorAppointmentSettingBar';
import AppointmentCard from './components/AppointmentCard';
import BlogDetails from './components/pages/BlogDetails';
import MyPatients from './components/pages/MyPatients';
import PageNotFound from './components/pages/PageNotFound';
import DoctorBars from './components/DoctorBars';
import WebSocketProvider from './websocket';
import PatientBars from './components/PatientBars';
import BlognewHome from './components/blog/BlogHome';
import WriteBlog from "./components/blog/blogcomponents/WriteBlog.js";
import SinglePost from './components/blog/blogcomponents/SinglePost';
import BlogDetail from './components/blog/blogcomponents/BlogDetail';
import S_Appointment from './components/pages/S_Appointment';
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
      <WebSocketProvider>
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
        <Route path='/changepass' exact component={ChangePass}/>
        <Route path='/doctorprofile' exact component={DoctorProfile}/>
        <Route path='/search_doctor' exact component={SearchDoctor}/>
        <Route path='/appointment' exact component={Appointment}/>
        <Route path= '/p_appointment' exact component={P_Appointment}/>
        <Route path= '/blog' exact component={Blog}/>
        <Route path= '/bloghome' exact component={BlogHome}/>
        <Route path= '/newpost' exact component={NewPost}/>
        <Route path= '/settings' exact component={DoctorAppointmentSettingBar}/>
        <Route path= '/app_card' exact component={AppointmentCard}/>
        <Route path= '/blog_details' exact component={BlogDetails}/>
        <Route path= '/my_patients' exact component={MyPatients}/>
        <Route path='/pagenotfound' exact component={PageNotFound}/>  
        <Route path='/doctorbars' exact component={DoctorBars}/> 
        <Route path='/patientbars' exact component={PatientBars}/>  
        <Route path='/newblog' exact component={BlognewHome}/>
        <Route path='/writeblog' exact component={WriteBlog}/>
        <Route path='/singlepost' exact component={SinglePost}/>
        <Route path='/blogdetail' exact component={BlogDetail}/>
        <Route path='/s_appointment' exact component={S_Appointment}/>
        

        
        {/* <Route path="/newblog" exact component={Home} />       */}

        </div>
      
      
       
      </Switch>

      </Router>
      </WebSocketProvider>
      </PersistGate>
      
    </Provider>
  
  );
}

export default App;
