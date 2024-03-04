import {usersAPI} from "../components/api/api";

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
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    page: 1,
    isFetching: true,
    followingInProgress: [],
};

//actions
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
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

//action creator
export const succesFollow = (userId) => ({type: FOLLOW, userId})
export const succesUnfollow = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page})
export const setUsersTotalCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

//redux-thunk
export const requestUsers = (page, pageSize) =>  async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let res = await usersAPI.getUsers(page, pageSize);

            dispatch(toggleIsFetching(false));
            dispatch(setUsers(res.data.items));
            dispatch(setUsersTotalCount(res.data.totalCount));

}

export const unfollow = (userId) => async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
       let res = await usersAPI.unfollow(userId);
            if (res.data.resultCode === 0) {
                dispatch(succesUnfollow(userId))
            }
        dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => async (dispatch) =>{
        dispatch(toggleFollowingProgress(true, userId));
       let res = await usersAPI.follow(userId);
            if (res.data.resultCode === 0) {
                dispatch(succesFollow(userId));
            }
        dispatch(toggleFollowingProgress(false, userId));
}


export default usersReducer;