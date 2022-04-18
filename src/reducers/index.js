import {combineReducers} from 'redux';
import auth from './auth';
import errors from './errors';
import profile from './profile';
import appointments from './appointments';
import reviews from './reviews';
import docAppointments from './docAppointments';
import blogs from './blogs'
import { persistReducer } from 'redux-persist'; 
import {reducer as notificationsReducer} from 'reapop'
import storage from 'redux-persist/lib/storage';

const persistConfig={
    key:'root',
    storage,
    whitelist:['auth','errors','blogs']
}

const rootReducer=combineReducers({
    auth,errors,profile,blogs,reviews,appointments,docAppointments,notifications: notificationsReducer()
})

export default persistReducer (persistConfig,rootReducer);
