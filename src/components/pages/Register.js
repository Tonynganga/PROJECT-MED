import React, { useState } from "react";
import { RegisterAction } from '../../actions/auth';
import { errorMessage } from '../../actions/notifyPopUp';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link, Redirect } from "react-router-dom";
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
import Footer from "../Footer";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";




function Register(props) {
  const paperStyle = { padding: 20, width: 450, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  // const marginTop = { marginTop: 5 };
  const btnstyle = { margin: "8px 0" };
  const [username, setUsername] = useState("")
  const [first_name, setFirstname] = useState("")
  const [last_name, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [date_of_birth, setDateOfBirth] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [is_patient, setIsPatient] = useState(false)
  const currentDate=new Date()
  const formValidation =()=>{    
    
    const mailFormat =/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    const containUppercase=/[A-Z]+/
    const containNumeric=/[0-9]+/
    const containLowercase=/[a-z]+/
    const containSpecialChar=/[^A-Z0-9a-z]+/
    const containUsernameInvalidChar=/^[\w.@+-]+$/

    if(!containUsernameInvalidChar.test(username)){
      props.errorMessage("invalid characters used in username")
      return false
    }

    if(!mailFormat.test(email)){
      props.errorMessage("Email format incorrect")
      return false
    }
    
    if(password.length<8){
      props.errorMessage("passwords should be 8 digits long or more")
      return false
    } 
    if(!containUppercase.test(password)){
      props.errorMessage("passwords should contain at least one uppercase letter")
      return false
    }
    if(!containNumeric.test(password)){
      props.errorMessage("passwords should contain at least one digit")
      return false
    }
    if(!containLowercase.test(password)){
      props.errorMessage("passwords should contain at least one lowercase letter")
      return false
    }
    if(!containSpecialChar.test(password)){
      props.errorMessage("passwords should contain at least one special character")
      return false
    }

    if(password!==password2){
      props.errorMessage("passwords do not match")
      return false
    }
   
    return true

  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (formValidation()===true) {
      const data = {
        username,
        first_name,
        last_name,
        email,
        password,
        is_patient,
        date_of_birth:date_of_birth.toISOString().substring(0, 10),
      }
      props.RegisterAction(data)
    }
  }
  
  if (props.isAuthenticated) {
    if (props.user && props.user.is_patient)
      return <Redirect to="/patienthomepage" />;
    else return <Redirect to="/doctorhomepage" />;
  } else return (
    <div className="Register">
      <div className="login__grid-outline">
        <div className="divloginimage">
          <img src="/images/loginimage.jpg" alt="#" />
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
                  value={is_patient ? 'patient' : 'doctor'}
                  onChange={() => setIsPatient(!is_patient)}

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
                <div className="form">
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" placeholder="username"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                      value={username} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="firstname">First Name:</label>
                    <input type="text" name="first_name" placeholder="First Name"
                      required
                      onChange={(e) => setFirstname(e.target.value)}
                      value={first_name} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname">Last Name:</label>
                    <input type="text" name="last_name" placeholder="Last Name"
                      required
                      onChange={(e) => setLastname(e.target.value)}
                      value={last_name} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" placeholder="Email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      value={email} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateofbirth">Date of Birth:</label>
                    <div className="datepicker">
                      <DatePickerComponent
                        id="datepicker"
                        placeholder='Enter Date...'
                        format="dd-MMM-yy"
                        variant="none"
                        allowEdit={false}
                        value={date_of_birth}
                        onChange={(e) => setDateOfBirth(e.value)}
                        max={new Date((currentDate.getFullYear()-18), currentDate.getMonth(),currentDate.getDay())}
                      >
                        
                      </DatePickerComponent>
                    </div>
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
                      onChange={(e) => setPassword2(e.target.value)}
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
      <Footer />
    </div>
  );
}
Register.propTypes = {
  RegisterAction: propTypes.func.isRequired,
  errorMessage: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool.isRequired,
  user: propTypes.object.isRequired,
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { RegisterAction,errorMessage})(Register);

// export default Register;
