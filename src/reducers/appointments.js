import {AVAILABLE_APPOITMENTS,AVAILABLE_APPOITMENTS_FAILED} from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case AVAILABLE_APPOITMENTS:
      return action.payload;
    case AVAILABLE_APPOITMENTS_FAILED:
    default:
      return state;
  }
}