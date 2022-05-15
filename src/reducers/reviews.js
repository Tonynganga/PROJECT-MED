import {
    GET_REVIEWS,
    GET_REVIEWS_FAILED,
    GET_USER_REVIEW,
    GET_USER_REVIEW_FAILED,
    LOGOUT,
    UPDATE_REVIEW,
    RESET_DATA,
} from '../actions/types';


const initialState = {
    reviews: [],
    review: {}
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REVIEWS:
            return { ...state, reviews: action.payload }
        case GET_REVIEWS_FAILED:
            return {
                ...state,
                reviews: []
            }
        case GET_USER_REVIEW:
        case UPDATE_REVIEW:
            return {
                ...state,
                review: action.payload
            }
        case GET_USER_REVIEW_FAILED:
        case LOGOUT:
            return {
                ...state,
                review: {}
            }
        case RESET_DATA:
            return initialState;
        default:
            return state
    }
}