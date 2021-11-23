import {GET_ERRORS} from './types';
export const getErrors = (error, status) => ({
  type: GET_ERRORS,
  payload: {error, status},
});
