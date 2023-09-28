import { GET_ERRORS, RESET_DATA } from '../actions/types';
const initialState = {
  errors: {},
};
//eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case RESET_DATA:
      return initialState;
    default:
      return state;
  }
}
