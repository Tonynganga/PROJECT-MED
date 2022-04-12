import {GET_ERRORS} from './types';
import {notify} from 'reapop'
export const getErrors = (error, status) => ({
  type: GET_ERRORS,
  payload: {error, status},
});
export const errorMessage=message=>dispatch=>{
  dispatch(notify(message,"error"))
}