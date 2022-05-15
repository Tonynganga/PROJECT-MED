import { GET_PROFILE, UPDATE_PROFILE, RESET_DATA } from '../actions/types';

const initialState = {
  image: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        image: action.payload.image,
      };
    case RESET_DATA:
      return initialState;
    default:
      return state;
  }
}
