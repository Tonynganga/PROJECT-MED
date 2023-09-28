import {
  ADD_APPOITMENT,
    ADD_APPOITMENT_FAILED,
    AVAILABLE_APPOITMENTS,AVAILABLE_APPOITMENTS_FAILED, GET_AVAILABLE_APPOITMENTS_TIME, GET_AVAILABLE_APPOITMENTS_TIME_FAILED,
  } from './types';
  import axios from 'axios';
  import {getErrors} from './auth';
  import {notify} from 'reapop'
  import {tokenConfig} from './auth';
  import {HTTP_API_PATH} from '../utils'

  export const getAvailableAppointments = () => (dispatch,getState) => {
    
    axios
      .get (HTTP_API_PATH+'/api/appointment/available_appointments', tokenConfig (getState))
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
  export const setAppointment = data => (dispatch, getState) => {

    axios
        .post(HTTP_API_PATH+'/api/appointment/add_booked_appointments',
        JSON.stringify (data)
            , tokenConfig(getState))
        .then(res => {
            dispatch({ type: ADD_APPOITMENT, payload: res.data });
            dispatch(notify("Add appointment successfull", "success"))       })
        .catch(err => {
            dispatch(getErrors(err, err.status));
            dispatch(notify("Add appointment failed", "error"))
            dispatch({ type: ADD_APPOITMENT_FAILED });
        });
};

export const getAppointmentTimePerDate = data => dispatch=> {

  axios
      .get(`${HTTP_API_PATH}/api/appointment/get_appointment_time/${data.appiontmentID}/${data.appiontmentDate}`)
    .then(res => {
          dispatch({ type: GET_AVAILABLE_APPOITMENTS_TIME, payload: res.data });
           })
      .catch(err => {
          dispatch(getErrors(err.data, err.status));
          dispatch({ type: GET_AVAILABLE_APPOITMENTS_TIME_FAILED });
      });
};
