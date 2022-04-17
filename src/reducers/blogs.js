import {
    CLEAR_COMMENTS,
    GET_BLOGS,
    GET_BLOGS_FAILED,
    GET_COMMENTS,
    GET_COMMENTS_FAILED,
    GET_COMMENTS_FOR_COMMENTS,
    GET_COMMENTS_FOR_COMMENTS_FAILED,
    LOGOUT,
    UPDATE_COMMENTS,
    UPDATE_COMMENTS_FAILED,
    UPDATE_COMMENT_FOR_COMMENT,
    ADD_COMMENTS,
    ADD_COMMENTS_FOR_COMMENTS,
    DELETE_COMMENTS,
    DELETE_COMMENT_FOR_COMMENT
} from '../actions/types';

const initialState = {
    blogs: [],
    comments: { 0: [] },
};

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_BLOGS:
            return {
                ...state,
                blogs: action.payload,
            };
        case DELETE_COMMENTS:
            state.blogs=state.blogs.filter((_,index)=>{
                return index!=action.payload
            })
            return state
        case GET_COMMENTS:
        case GET_COMMENTS_FOR_COMMENTS:
            return {
                ...state,
                comments: { ...state.comments, ...action.payload },
            };
        case ADD_COMMENTS:
            state.comments[0] = [...state.comments[0], action.payload]
            return state;
        case ADD_COMMENTS_FOR_COMMENTS:
            if (state.comments[action.payload.key])
                state.comments[action.payload.key] = [...state.comments[action.payload.key], action.payload.data]
            return state;
        case GET_COMMENTS_FAILED:
        case GET_COMMENTS_FOR_COMMENTS_FAILED:
            return {
                ...state,
                comments: { ...state.comments, ...action.payload },
            };
        case CLEAR_COMMENTS:
            delete state.comments[action.payload]
            return state
        case UPDATE_COMMENTS:
            state.comments[0][action.payload.index] = action.payload.data
            return state
        case UPDATE_COMMENT_FOR_COMMENT:
            state.comments[action.payload.key][action.payload.index] = action.payload.data
            return state
        case DELETE_COMMENTS:
            // delete state.comments[0][action.payload]
            state.comments[0]=state.comments[0].filter((_,index)=>{
                return index!=action.payload
            })
            return state
        case DELETE_COMMENT_FOR_COMMENT:
            state.comments[action.payload.key]=state.comments[action.payload.key].filter((_,index)=>{
                return index!=action.payload.index
            })
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
