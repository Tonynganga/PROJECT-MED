import React, { useState } from "react";
import { LoginAction } from '../../actions/auth';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link, Redirect } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  // TextField,
  Button,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import './LoginSignup.css';
import "./Main.css"
import Footer from "../Footer";


function LoginSignup(props) {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 380,
    margin: "10px auto",
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const onSubmit = () => {

    props.LoginAction(username, password);
  };

  if (props.isAuthenticated) {
    if (props.user && props.user.is_patient)
      return <Redirect to="/patienthomepage" />;
    else return <Redirect to="/doctorhomepage" />;
  } else return (
    <>
      <div className="loginpage" >

        <div className="login__grid-outline">
          <div className="divloginimage">
            <img src="/images/loginimage.jpg" alt="#" />
          </div>

          <Grid>
            <Paper elevation={15} style={paperStyle}>
              <Grid align="center">
                <Avatar style={avatarStyle}>
                  <LockOutlinedIcon />
                </Avatar>
                <h2>Sign In</h2>
              </Grid>
              
                {/* <TextField
                  label='Username'
                  placeholder='Enter username'
                  fullWidth
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}

                />
                {/* <input type="text" placeholder="user name" className="name"/> */}
                {/* <TextField
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  fullWidth
                  required
                />  */}
                <div className="form">
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" placeholder="username" 
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password} required />
                  </div>
                </div>
              
              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
                onClick={() => onSubmit()}
              >
                Sign in
              </Button>
              <Typography>
                <Link href="#" to="/patienthomepage">Forgot password ?</Link>
              </Typography>
              <Typography>
                {" "}
                Do you have an account ?<Link href="#" to="/register">Sign Up</Link>
              </Typography>
            </Paper>
          </Grid>

        </div>
        <Footer />
      </div>
    </>


  );
}
LoginSignup.propTypes = {
  LoginAction: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool.isRequired,
  user: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { LoginAction })(LoginSignup);
// export default LoginSignup;
