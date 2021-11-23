import {combineReducers} from 'redux';
import auth from './auth';
import errors from './errors';
import {reducer as notificationsReducer} from 'reapop'

export default combineReducers ({auth,errors,notifications: notificationsReducer()});
