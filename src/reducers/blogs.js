import { GET_BLOGS, GET_BLOGS_FAILED } from '../actions/types';

const initialState = {
    blogs: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BLOGS:
        case GET_BLOGS_FAILED:
            return {
                ...state,
                blogs: action.payload,
            };
        case GET_BLOGS_FAILED:
            return {
                blogs: [],
            };
        default:
            return state;
    }
}
