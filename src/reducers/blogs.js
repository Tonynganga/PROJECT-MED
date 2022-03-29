import { GET_BLOGS, GET_BLOGS_FAILED, GET_COMMENTS, GET_COMMENTS_FAILED, LOGOUT } from '../actions/types';

const initialState = {
    blogs: [],
    comments:[],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BLOGS:
            return {
                ...state,
                blogs: action.payload,
            };
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
            };
        case GET_COMMENTS_FAILED:
            return {
                ...state,
                comments: [],
            };
       
        case GET_BLOGS_FAILED:
            return {
                ...state,
                blogs: [],
            };
        case LOGOUT:
            return {
                ...state,
                comments: [],
                blogs: [],
            }; 
        default:
            return state;
    }
}
