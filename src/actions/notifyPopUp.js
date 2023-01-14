import {notify} from 'reapop'

export const errorMessage=message=>dispatch=>{
  dispatch(notify(message,"error"))
}
export const successMessage=message=>dispatch=>{
  dispatch(notify(message,"success"))
}