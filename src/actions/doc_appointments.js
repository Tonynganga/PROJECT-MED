import {
    GET_APPOITMENTS_SETTINGS, GET_APPOITMENTS_SETTINGS_FAILED,
    ADD_APPOITMENTS_SETTINGS, ADD_APPOITMENTS_SETTINGS_FAILED
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

export const setAppointmentSetting = data => (dispatch, getState) => {

    axios
        .post('http://localhost:8000/api/appointment/add_settings',
            {
                appointment_type: data.appointment_type,
                frequency_of_AP_per_2hours: data.frequency_of_AP_per_2hours
            }
            , tokenConfig(getState))
        .then(res => {
            console.log({
                aps_per_station: res.data.id,
                available_appointment_time: data.available_appointment_time
            })
            axios
                .post('http://localhost:8000/api/appointment/set_appointment_time_list',{
                        aps_per_station: res.data.id,
                        available_appointment_time: data.available_appointment_time
                    }
                    , tokenConfig(getState))
                .then(res => {

                    dispatch({ type: ADD_APPOITMENTS_SETTINGS, payload: res.data });
                    dispatch(notify("Add setting successfull", "success"))

                })
                .catch(err => {
                    console.log(err)
                    dispatch(getErrors(err.data, err.status));
                    dispatch(notify("Add time setting failed", "error"))
                    dispatch({ type: ADD_APPOITMENTS_SETTINGS_FAILED });
                });

        })
        .catch(err => {
            dispatch(getErrors(err.data, err.status));
            dispatch(notify("Add setting failed", "error"))
            dispatch({ type: ADD_APPOITMENTS_SETTINGS_FAILED });
        });
};
