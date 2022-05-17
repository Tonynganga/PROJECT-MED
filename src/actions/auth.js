import {
  LOGIN_SUCCCES,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT,
  GET_ERRORS,
} from './types';
import axios from 'axios';
import { notify } from 'reapop'
import { HTTP_API_PATH } from '../utils'
import emailjs from '@emailjs/browser';

// export const loadUser = () => (dispatch, getState) => {
//   axios
//     .get ('/api/auth/user', tokenConfig (getState))
//     .then (res => {
//       dispatch ({type: USER_LOADED, payload: res.data});
//     })
//     .catch (err => {
//       dispatch (getErrors (err.response.data, err.response.status));
//       dispatch ({type: LOADED_FAILED});
//     });
// };
export const getErrors = (error, status) => ({
  type: GET_ERRORS,
  payload: { error, status },
});

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const LoginAction = (username, password) => dispatch => {
  const body = {
    username,
    password,
  };

  axios
    .post(HTTP_API_PATH + '/api/auth/login', JSON.stringify(body), config)
    .then(res => {
      dispatch({ type: LOGIN_SUCCCES, payload: res.data });
      dispatch(notify("login successfull", "success"))
      // setTimeout(() => { dismissNotifications(); }, 2000);
    })
    .catch(err => {
      dispatch(getErrors(err, err.status));
      if (err.response.data['non_field_errors']) {
        err.response.data['non_field_errors'].forEach(element => {
          dispatch(notify(element, "error"))
        });

      } else dispatch(notify("login unsuccessfull", "error"))
      // setTimeout(() => { dismissNotifications(); }, 2000);
      dispatch({ type: LOGIN_FAIL });
    });
};

export const RegisterAction = data => dispatch => {
  console.log(data)

  axios
    .post(HTTP_API_PATH + '/api/auth/register', data, config)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      dispatch(notify("registeration successfull", "success"))
    })
    .catch(err => {
      dispatch(getErrors(err.data, err.status));
      dispatch(notify("registration unsuccessfull", "error"))
      dispatch({ type: REGISTER_FAIL });
    });
};

export const LogoutAction = () => (dispatch, getState) => {
  axios
    .post(HTTP_API_PATH + '/api/auth/logout', null, tokenConfig(getState))
    .then(res => {
      dispatch({ type: LOGOUT });
    })
    .catch(err => {
      dispatch({ type: LOGOUT });
      dispatch(getErrors(err.data, err.status));
    });
};

export const ForgotPassword = (password, token) => (dispatch, getState) => {
  axios
    .post(HTTP_API_PATH + '/api/auth/forgot_passord', { password }, tokenConfig(getState, token))
    .then(res => {
      dispatch(notify("password changed successfully", "success"))
      axios
        .post(HTTP_API_PATH + '/api/auth/logout', null, tokenConfig(getState, token))
        .then(res => {
          dispatch(notify("link is now expired and can not be reused", "info"))
        })

    })
    .catch(err => {
      dispatch(notify("Failed to change password", "error"))
    });
};

export const ChangePassword = body => (dispatch, getState) => {
  axios
    .post(HTTP_API_PATH + '/api/auth/change_password', body, tokenConfig(getState))
    .then(res => {
      dispatch(notify("password changed successfully", "success"))
    })
    .catch(err => {
      if (err.response.data['error'])
        dispatch(notify(err.response.data['error'], "error"))
      else dispatch(notify("Failed to change password", "error"))
    });
};


export const PasswordRecovery = (body, form) => (dispatch, getState) => {
  axios
    .post(HTTP_API_PATH + '/api/auth/check_email', body, config)
    .then((res) => {

      form.current[1].value = res.data['token']
      emailjs.sendForm('service_xkpysvg', 'template_7lcbibb', form.current, '8ymZf0M1NM-taV10M')
        .then((result) => {
          console.log(result.text);
          dispatch(notify("Email sent successfully", "success"))
        }).catch((error) => {
          console.log(error.text);
        })

    })
    .catch(err => {
      dispatch(notify(err.data['error'], "error"))
      console.log(err.data['error']);
    });
};



export const tokenConfig = (getState, setToken) => {
  let token
  if (!setToken)
    token = getState().auth.token;
  else token = setToken

  //Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
};

