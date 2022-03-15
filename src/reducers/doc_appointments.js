import {GET_APPOITMENTS_SETTINGS,GET_APPOITMENTS_SETTINGS_FAILED,ADD_APPOITMENTS_SETTINGS} from '../actions/types';

const initialState = {
    appointmentSettingSet:false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_APPOITMENTS_SETTINGS:
    case ADD_APPOITMENTS_SETTINGS:
      return {...state,appointmentSettingSet:true};
    case GET_APPOITMENTS_SETTINGS_FAILED:
        return {...state,appointmentSettingSet:false};
    default:
      return state;
  }
}