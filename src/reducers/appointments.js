import {AVAILABLE_APPOITMENTS,AVAILABLE_APPOITMENTS_FAILED, GET_AVAILABLE_APPOITMENTS_TIME, GET_AVAILABLE_APPOITMENTS_TIME_FAILED,RESET_DATA} from '../actions/types';

const initialState ={
  appointmentList:[],
  availableAppointmentTime:[]
} ;

export default function (state = initialState, action) {
  switch (action.type) {
    case AVAILABLE_APPOITMENTS:
      return {...state,appointmentList:action.payload}
    case AVAILABLE_APPOITMENTS_FAILED:
      return {...state,appointmentList:[]}
    case GET_AVAILABLE_APPOITMENTS_TIME:
      let timeArray=[]
      action.payload.forEach(element => {
        timeArray=[...timeArray,element.available_appointment_time]        
      });
      return {...state,availableAppointmentTime:timeArray}
    case GET_AVAILABLE_APPOITMENTS_TIME_FAILED:
      return {...state,availableAppointmentTime:[]}
    case RESET_DATA:
      return initialState;
    default:    
      return state;
  }
}