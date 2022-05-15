import {
    CLEAR_COMMENTS,
    ADD_BLOG,
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
    DELETE_COMMENT_FOR_COMMENT,
    DELETE_BLOG,
    UPDATE_BLOG,
    RESET_DATA
} from '../actions/types';

const initialState = {
    blogs: [],
    comments: { 0: [] },
};

export default function (state = initialState, action) {
    let tempBlogs
    let tempComments
    switch (action.type) {
        case GET_BLOGS:
            return {
                ...state,
                blogs: action.payload,
            };
        case ADD_BLOG:
            return { ...state, blogs: [...state.blogs, action.payload] }
        case DELETE_BLOG:
            tempBlogs = state.blogs.filter((elem) => {
                return elem.id != action.payload
            })
            return { ...state, blogs: [...tempBlogs] }
        case UPDATE_BLOG:
            tempBlogs = state.blogs.map((elem) => {
                if (elem.id == action.payload.id)
                    return action.payload
                return elem
            })
            return { ...state, blogs: [...tempBlogs] }
        case GET_COMMENTS:
        case GET_COMMENTS_FOR_COMMENTS:
            return {
                ...state,
                comments: { ...state.comments, ...action.payload },
            };
        case ADD_COMMENTS:
            tempComments = [...state.comments[0], action.payload]
            return { ...state, comments: { 0: tempComments } }
        case ADD_COMMENTS_FOR_COMMENTS:
            // if (state.comments[action.payload.key])
            tempComments = [...state.comments[action.payload.key], action.payload.data]
            return { ...state, comments: { [action.payload.key]: tempComments } }
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
            tempComments = state.comments[0].map((elem) => {
                if (elem.id == action.payload.id)
                    return action.payload
                return elem
            })
            // state.comments[0]=tempComments
            return { ...state, comments: { 0: tempComments } }
        case UPDATE_COMMENT_FOR_COMMENT:
            tempComments = state.comments[action.payload.key].map((elem) => {
                if (elem.id == action.payload.data.id)
                    return action.payload.data
                return elem
            })
            // state.comments[action.payload.key]=tempComments
            return { ...state, comments: { [action.payload.key]: tempComments } }
        case DELETE_COMMENTS:
            // delete state.comments[0][action.payload]
            tempComments = state.comments[0].filter((elem) => {
                return elem.id != action.payload
            })
            return { ...state, comments: { 0: tempComments } }
        case DELETE_COMMENT_FOR_COMMENT:
            tempComments = state.comments[action.payload.key].filter((elem) => {
                return elem.id != action.payload.id
            })
            return { ...state, comments: { [action.payload.key]: tempComments } }
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
        case RESET_DATA:
            return initialState;
        default:
            return state;
    }
}
