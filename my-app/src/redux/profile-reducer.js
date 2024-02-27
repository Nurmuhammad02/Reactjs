import { profileAPI, usersAPI } from "../components/api/api";
//action type
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

//initial data
let initialState = {
    posts: [
        { id: 1, message: 'werwerew', likesCount: 12 },
        { id: 2, message: 'How is your friend?', likesCount: 11 },
    ],
    newPostText: 'Lorem ipsum ',
    profile: null,
    status: ""
};

//actions
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0,
            };
            let stateCopy = { ...state };
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = { ...state };
            stateCopy.newPostText = action.newText;
            return stateCopy
        }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }
        case SET_STATUS:
            return { ...state, status: action.status }
        default:
            return state;
    }
}

//action creator
export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })

//thunk-redux

export const getUsersProfileFromURL = (userId) => {
    return (dispatch) => {
        usersAPI.getUsersProfile(userId).then(data => {
            dispatch(setUserProfile(data));
        })
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatusProfile(userId).then(data => {
            dispatch(setStatus(data));
        })
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatusProfile(status).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        })
    }
}


export default profileReducer;