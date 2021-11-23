import React , { useState } from "react";
import {RegisterAction} from '../../actions/auth';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import { Link,Redirect } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  // TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "./Main.css";
// import './LoginSignup.css';
import Footer from "../Footer";

function Register(props) {
  const paperStyle = { padding: 20, width: 450, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  // const marginTop = { marginTop: 5 };
  const btnstyle = { margin: "8px 0" };
  const [username,setUsername]=useState("")
  const [first_name,setFirstname]=useState("")
  const [last_name,setLastname]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [password2,setPassword2]=useState("")
  const [is_patient,setIsPatient]=useState(false)
  const onSubmit=(e)=>{
    e.preventDefault()
    if(password===password2){
      const data={
        username,
        first_name,
        last_name,
        email,
        password,
        is_patient
      }
      props.RegisterAction(data)

    }
    
  }
  if (props.isAuthenticated) {
    if(props.user&&props.user.is_patient)
    return <Redirect to="/patienthomepage" />;
    else return <Redirect to="/doctorhomepage" />;
  }else return(
    <div className="Register">
      <div className="login__grid-outline">
        <div className="divloginimage">
          <img src="/images/loginimage.jpg" alt="#"/>
        </div>
        <div className="grid">
          <Grid>
            <Paper style={paperStyle}>
              <Grid align="center">
                <Avatar style={avatarStyle}>
                  <AddCircleOutlineOutlinedIcon />
                </Avatar>
                <h2 style={headerStyle}>Sign Up</h2>
                <Typography variant="caption" gutterBottom>
                  Please fill this form to create an account !
                </Typography>
              </Grid>
              <form
              onSubmit={onSubmit}>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  style={{ display: "initial" }}
                  value={is_patient?'patient':'doctor'}
                  onChange={()=>setIsPatient(!is_patient)}
                  
                >
                  <FormControlLabel
                    value="patient"
                    control={<Radio />}
                    label="Patient"
                    
                  />
                  <FormControlLabel
                    value="doctor"
                    control={<Radio />}
                    label="Doctor"
                    
                  />
                </RadioGroup>
                {/* <TextField 
                fullWidth label="Username" 
                placeholder="Username" 
                onChange={(e)=>setUsername(e.target.value)}
                value={username}/>
                <TextField
                  fullWidth
                  label="First Name"
                  placeholder="First Name"
                  onChange={(e)=>setFirstname(e.target.value)}
                  value={first_name}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  placeholder="Last Name"
                  onChange={(e)=>setLastname(e.target.value)}
                  value={last_name}
                />
                <TextField
                  fullWidth
                  label="Email"
                  placeholder="Enter your email"
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                />
                <TextField
                  fullWidth
                  label="Create Password"
                  placeholder="Create Password"
                  onChange={(e)=>setPassword(e.target.value)}
                  value={password}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  onChange={(e)=>setPassword2(e.target.value)}
                  value={password2}
                /> */}
                
                <div className="form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" placeholder="username" 
                    required
                    onChange={(e)=>setUsername(e.target.value)}
                value={username}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="firstname">First Name:</label>
                    <input type="text" name="first_name" placeholder="First Name" 
                    required
                    onChange={(e)=>setFirstname(e.target.value)}
                    value={first_name}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname">Last Name:</label>
                    <input type="text" name="last_name" placeholder="Last Name" 
                    required
                    onChange={(e)=>setLastname(e.target.value)}
                    value={last_name}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" placeholder="Email" 
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}/>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Confirm Password:</label>
                    <input type="password" name="password" placeholder="Confirm Password"
                    required
                      onChange={(e)=>setPassword2(e.target.value)}
                      value={password2} />
                  </div>
                </div>
                <FormControlLabel
                  control={<Checkbox name="checkedA" />}
                  label="I accept the terms and conditions."
                />
                <Typography>
                  {" "}
                  Already have an account ?
                  <Link href="#" to="/loginsignup">
                    Sign In
                  </Link>
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={btnstyle}
                  
                >
                  Sign up
                </Button>
              </form>
            </Paper>
          </Grid>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
Register.propTypes = {
  RegisterAction: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool.isRequired,
  user:propTypes.object.isRequired,
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user:state.auth.user
});

export default connect (mapStateToProps, {RegisterAction}) (Register);

// export default Register;
