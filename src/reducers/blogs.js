import { CLEAR_COMMENTS, GET_BLOGS, GET_BLOGS_FAILED, GET_COMMENTS, GET_COMMENTS_FAILED, GET_COMMENTS_FOR_COMMENTS, GET_COMMENTS_FOR_COMMENTS_FAILED, LOGOUT, UPDATE_COMMENTS, UPDATE_COMMENTS_FAILED, UPDATE_COMMENT_FOR_COMMENT } from '../actions/types';

const initialState = {
    blogs: [],
    comments:{0:[]},
};

export default function (state = initialState, action) {
    
    switch (action.type) {
        case GET_BLOGS:
            return {
                ...state,
                blogs: action.payload,
            };
        case GET_COMMENTS:
        case GET_COMMENTS_FOR_COMMENTS:            
            return {
                ...state,
                comments: {...state.comments,...action.payload},
            };
        case GET_COMMENTS_FAILED:
        case GET_COMMENTS_FOR_COMMENTS_FAILED:
            return {
                ...state,
                comments:{...state.comments,...action.payload},
            };
        case CLEAR_COMMENTS:
            delete state.comments[action.payload]
            return state
        case UPDATE_COMMENTS:
            state.comments[0][action.payload.id]=action.payload
            return state
        case UPDATE_COMMENT_FOR_COMMENT:
            state.comments[action.payload.key][action.payload.id]=action.payload
            return state    
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
        case UPDATE_COMMENTS_FAILED:
        default:
            return state;
    }
}
