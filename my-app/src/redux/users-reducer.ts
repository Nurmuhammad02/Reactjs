import {usersAPI} from "../components/api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../Types/types.ts";
import {AppStateType} from "./redux-store.ts";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

//action type
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

//initial data


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    page: 1,
    isFetching: true,
    followingInProgress: [] as number[], //  Array of userid
    portionSize: 10,
    currentPage: 1
};

type InitialStateType = typeof initialState

//actions
const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: true}
                //     }
                //     return u
                // })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }

        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, page: action.page}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

type ActionsType = SuccessFollowType | SuccessUnfollowType | SetUsersType
    | SetCurrentPageType | SetUsersTotalCountType
    | ToggleIsFetchingType | ToggleFollowingProgressType

//action creator
type SuccessFollowType = {
    type: typeof FOLLOW,
    userId: number
}
export const succesFollow = (userId: number): SuccessFollowType => ({type: FOLLOW, userId})
type SuccessUnfollowType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const succesUnfollow = (userId: number): SuccessUnfollowType => ({type: UNFOLLOW, userId})
type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users})
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    page: number
}
export const setCurrentPage = (page: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, page})
type SetUsersTotalCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}
export const setUsersTotalCount = (totalUsersCount: number): SetUsersTotalCountType => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
})
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})
type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})


//redux-thunk

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsType>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch, getState) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    let res = await usersAPI.getUsers(page, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(res.data.items));
    dispatch(setUsersTotalCount(res.data.totalCount));

}

export const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => SuccessFollowType | SuccessUnfollowType) => {
    dispatch(toggleFollowingProgress(true, userId));
    let res = await apiMethod(userId);
    if (res.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), succesUnfollow);
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), succesFollow);
}


export default usersReducer;