import {
    GET_APPOITMENTS_SETTINGS, GET_APPOITMENTS_SETTINGS_FAILED,
    ADD_APPOITMENTS_SETTINGS, ADD_APPOITMENTS_SETTINGS_FAILED, GET_DOC_APPOITMENTS, GET_DOC_APPOITMENTS_FAILED
} from './types';
import axios from 'axios';
import { getErrors } from './errors';
import { notify } from 'reapop'
import { tokenConfig } from './auth';

export const checkIfAppointmentSettingSet = () => (dispatch, getState) => {

    axios
        .get('http://localhost:8000/api/appointment/get_setting', tokenConfig(getState))
        .then(res => {
            dispatch({ type: GET_APPOITMENTS_SETTINGS, payload: res.data });
            // dispatch(notify("registeration successfull","success"))
        })
        .catch(err => {
            dispatch(getErrors(err.data, err.status));
            // dispatch(notify("Failed to get appointment","error"))
            dispatch({ type: GET_APPOITMENTS_SETTINGS_FAILED });
        });
};

export const getDoctorAppointments = () => (dispatch, getState) => {

    axios
        .get('http://localhost:8000/api/appointment/get_booked_appointments', tokenConfig(getState))
        .then(res => {
            dispatch({ type: GET_DOC_APPOITMENTS, payload: res.data });
            // dispatch(notify("registeration successfull","success"))
        })
        .catch(err => {
            dispatch(getErrors(err.data, err.status));
            // dispatch(notify("Failed to get appointment","error"))
            dispatch({ type: GET_DOC_APPOITMENTS_FAILED });
        });
};

export const setAppointmentSetting = data => (dispatch, getState) => {

    axios
        .post('http://localhost:8000/api/appointment/add_settings_and_requirements',
            data
            , tokenConfig(getState))
        .then(res => {
            dispatch({ type: ADD_APPOITMENTS_SETTINGS, payload: res.data });
            dispatch(notify("Add setting successfull", "success"))       })
        .catch(err => {
            dispatch(getErrors(err.data, err.status));
            dispatch(notify("Add setting failed", "error"))
            dispatch({ type: ADD_APPOITMENTS_SETTINGS_FAILED });
        });
};

