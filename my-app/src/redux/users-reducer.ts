import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../Types/types.ts";
import {BaseThunkType, InferActionTypes} from "./redux-store.ts";
import {Dispatch} from "redux";

import {usersApi} from "../components/api/users-api.ts";
import {ResponseType} from "../components/api/api.ts";

//action type

//initial data
let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    page: 1,
    isFetching: true,
    followingInProgress: [] as number[], //  Array of userid
    portionSize: 10,
    currentPage: 1,
    filter: {
        term: "",
        friend: null as null | boolean
    }
};


//actions
const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }

        case 'SN/USERS/SET_USERS':
            return {...state, users: action.users}
        case 'SN/USERS/SET_CURRENT_PAGE':
            return {...state, page: action.page}
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.count}
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'SN/USERS/SET_FILTER':
            return {...state, filter: action.filter}
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
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


//action creator

export const actions = {
    succesFollow: (userId: number) => ({type: 'FOLLOW', userId} as const),
    succesUnfollow: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setCurrentPage: (page: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', page} as const),
    setFilter: (filter: FilterType) => ({
        type: 'SN/USERS/SET_FILTER',
        filter
    } as const),
    setUsersTotalCount: (totalUsersCount: number) => ({
        type: 'SN/USERS/SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}


//redux-thunk
export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.setFilter(filter));

    let res = await usersApi.getUsers(page, pageSize, filter.term, filter.friend);

    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(res.data.items));
    dispatch(actions.setUsersTotalCount(res.data.totalCount));
}

export const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>, userId: number, apiMethod: (userId: number) => Promise<ResponseType>, actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let res = await apiMethod(userId);
    if (res.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const unfollowThunk = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersApi.unfollow.bind(usersApi), actions.succesUnfollow);
}

export const followThunk = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersApi.follow.bind(usersApi), actions.succesFollow);
}


export default usersReducer;

type ActionsType = InferActionTypes<typeof actions>
export type FilterType = typeof initialState.filter
export type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsType>