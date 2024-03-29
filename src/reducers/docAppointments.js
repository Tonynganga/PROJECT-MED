import { GET_APPOITMENTS_SETTINGS, GET_APPOITMENTS_SETTINGS_FAILED, ADD_APPOITMENTS_SETTINGS, GET_DOC_APPOITMENTS, GET_DOC_APPOITMENTS_FAILED, GET_PATIENT_DETAILS_FOR_DOC, RESET_DATA } from '../actions/types';

const initialState = {
  appointmentSettingSet: false,
  docAppointments: [],
  patientDetailForDoc: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_APPOITMENTS_SETTINGS:
    case ADD_APPOITMENTS_SETTINGS:
      return { ...state, appointmentSettingSet: true };
    case GET_APPOITMENTS_SETTINGS_FAILED:
      return { ...state, appointmentSettingSet: false };
    case GET_DOC_APPOITMENTS:
      return { ...state, docAppointments: action.payload }
    case GET_DOC_APPOITMENTS_FAILED:
      return { ...state, docAppointments: [] }
    case GET_PATIENT_DETAILS_FOR_DOC:
      return { ...state, patientDetailForDoc: action.payload }
    case RESET_DATA:
      return initialState;
    default:
      return state;
  }
}