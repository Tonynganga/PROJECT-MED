import {
    GET_REVIEWS,
    GET_REVIEWS_FAILED,
  } from '../actions/types';


const initialState={
    reviews:[],
}


export default function(state=initialState,action){
    switch(action.type){
        case GET_REVIEWS:
            return {...state,reviews:action.payload}
        case GET_REVIEWS_FAILED:
            return {
                ...state,
                reviews:[]
            }
        default:
            return state
    }
}