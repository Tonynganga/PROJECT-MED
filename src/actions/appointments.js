import {
    AVAILABLE_APPOITMENTS,AVAILABLE_APPOITMENTS_FAILED,
  } from './types';
  import axios from 'axios';
  import {getErrors} from './errors';
  import {notify} from 'reapop'
  import {tokenConfig} from './auth';

  export const getAvailableAppointments = () => (dispatch,getState) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .get ('http://localhost:8000/api/appointment/available_appointments', tokenConfig (getState))
      .then (res => {
        dispatch ({type: AVAILABLE_APPOITMENTS, payload: res.data});
        // dispatch(notify("registeration successfull","success"))
      })
      .catch (err => {
        dispatch (getErrors (err.data, err.status));
        dispatch(notify("Failed to get appointments","error"))
        dispatch ({type: AVAILABLE_APPOITMENTS_FAILED});
      });
  };
  