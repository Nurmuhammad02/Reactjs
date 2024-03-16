import {ContactsType, PhotosType, PostsType} from "../Types/types.ts";
import {AppStateType, BaseThunkType} from "./redux-store.ts";
import {ThunkAction} from "redux-thunk";
import {profileApi} from "../components/api/profile-api.ts";
//action type
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
//initial data


type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

let initialState = {
    posts: [
        {id: 1, message: 'Hi', likesCount: 12},
        {id: 2, message: 'How is your friend?', likesCount: 11},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: "",
    newPostsText: ""
};

type InitialStateType = typeof initialState

//actions
const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostsText: ""
            }
        }
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SET_STATUS:
            return {...state, status: action.status}
        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}

        default:
            return state;
    }
}

//action creator
type ActionsType = AddPostActionCreatorType | SetUserProfileType | SetStatusType | DeletePostType;

type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({type: ADD_POST, newPostText})
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile})
type SetStatusType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status})
type DeletePostType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePost = (postId: number): DeletePostType => ({type: DELETE_POST, postId})

//thunk-redux
// type GetStateType = () => AppStateType;
// type DispatchType = Dispatch<ActionsType>;
type ThunkType = BaseThunkType<ActionsType>


export const getUsersProfileFromURL = (userId: number):ThunkType => async (dispatch) => {
    let data = await profileApi.getUsersProfile(userId);
    dispatch(setUserProfile(data));
}

export const getStatus = (userId: number):ThunkType => async (dispatch) => {
    try {
        let data = await profileApi.getStatusProfile(userId);
        dispatch(setStatus(data));
    } catch (e) {
        console.error(e);
    }
}

export const updateStatus = (status: string):ThunkType => async (dispatch) => {
    try {
        let data = await profileApi.updateStatusProfile(status)
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (e) {
        console.error(e);
    }
}


export default profileReducer;