import {ContactsType, PhotosType, PostsType, ProfileType} from "../Types/types.ts";
import { BaseThunkType, InferActionTypes} from "./redux-store.ts";
import {profileApi} from "../components/api/profile-api.ts";
//action type
//initial data

let initialState = {
    posts: [
        {id: 1, message: 'Hi', likesCount: 12},
        {id: 2, message: 'How is your friend?', likesCount: 11},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: ""
};

type InitialStateType = typeof initialState

//actions
const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/PROFILE/ADD-POST": {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case "SN/PROFILE/SET_USER_PROFILE":
            return {...state, profile: action.profile}
        case "SN/PROFILE/SET_STATUS":
            return {...state, status: action.status}
        case 'SN/PROFILE/DELETE_POST':
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        default:
            return state;
    }
}

//action creator

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: "SN/PROFILE/ADD-POST", newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: "SN/PROFILE/SET_USER_PROFILE", profile} as const),
    setStatus: (status: string) => ({type: "SN/PROFILE/SET_STATUS", status} as const),
    deletePost: (postId: number) => ({type: "SN/PROFILE/DELETE_POST", postId} as const),
}


export const getUsersProfileFromURL = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileApi.getUsersProfile(userId);
    dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    try {
        let data = await profileApi.getStatusProfile(userId);
        dispatch(actions.setStatus(data));
    } catch (e) {
        console.error(e);
    }
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileApi.updateStatusProfile(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    } catch (e) {
        console.error(e);
    }
}


export default profileReducer;

type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
//thunk-redux
// type GetStateType = () => AppStateType;
// type DispatchType = Dispatch<ActionsType>;
