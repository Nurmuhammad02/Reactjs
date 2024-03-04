import {profileAPI, usersAPI} from "../components/api/api";
//action type
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
//initial data
let initialState = {
    posts: [
        {id: 1, message: 'werwerew', likesCount: 12},
        {id: 2, message: 'How is your friend?', likesCount: 11},
    ],
    profile: null,
    status: ""
};

//actions
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            };
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id !== action.id)}

        default:
            return state;
    }
}

//action creator
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})

//thunk-redux

export const getUsersProfileFromURL = (userId) => async (dispatch) => {
    let res = await usersAPI.getUsersProfile(userId);
    dispatch(setUserProfile(res.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let res = await profileAPI.getStatusProfile(userId);
    dispatch(setStatus(res.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let res = await profileAPI.updateStatusProfile(status)
        if (res.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
}


export default profileReducer;