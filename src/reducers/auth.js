import {
    LOGIN_SUCCCES,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT,
  } from '../actions/types';
  
  const initialState = {
    isAuthenticated: false,
    token: localStorage.getItem ('token'),
    isLoading: false,
    user: null,
  };
  
  // eslint-disable-next-line
  export default function (state = initialState, action) {
    switch (action.type) {
      case LOGIN_SUCCCES:
      case REGISTER_SUCCESS:
        localStorage.setItem ('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
        };
      case LOGIN_FAIL:
      case REGISTER_FAIL:
      case LOGOUT:
        localStorage.removeItem ('token');
        return {
          isAuthenticated: false,
          token: null,
          isLoading: false,
          user:null,
        };
      default:
        return state;
    }
  }
  