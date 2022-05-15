import {
    LOGIN_SUCCCES,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT,
    USER_RELOAD,
    RESET_DATA,
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
      case USER_RELOAD:
        return{
          ...state,
          user:action.payload.user,
        };
      case RESET_DATA:
        return initialState;
      default:
        return state;
    }
  }
  