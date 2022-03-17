import {combineReducers} from 'redux';
import auth from './auth';
import errors from './errors';
import profile from './profile';
import appointments from './appointments';
import doc_appointments from './doc_appointments';
import blogs from './blogs'
import { persistReducer } from 'redux-persist'; 
import {reducer as notificationsReducer} from 'reapop'
import storage from 'redux-persist/lib/storage';

const persistConfig={
    key:'root',
    storage,
    whitelist:['auth','errors']
}

const rootReducer=combineReducers({
    auth,errors,profile,blogs,appointments,doc_appointments,notifications: notificationsReducer()
})

export default persistReducer (persistConfig,rootReducer);
