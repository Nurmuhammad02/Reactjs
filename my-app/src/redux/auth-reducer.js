import { authAPI } from "../components/api/api";

//action type
const SET_USER_DATA = 'SET_USER_DATA';
const DELETE_LOGIN_DATA = 'DELETE_LOGIN_DATA';

//initial data
let initialState = {
    id: 2,
    email: null,
    password: null,
    login: null,
    isAuth: false,
};


//actions
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        case DELETE_LOGIN_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: false
            }

        default:
            return state;
    }
}
//action creator
export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, data: { userId, email, login, isAuth } })
export const setAuthLogOut = (userId, email, login, isAuth) => ({ type: DELETE_LOGIN_DATA, data: { userId, email, login, isAuth } })

//thunk-reducer
export const getAuthUserData = () => {
    return (dispatch) => {
        authAPI.me().then(data => {
            if (data.resultCode === 0) {
                let { id, login, email } = data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        })
    }
}

export const deleteAuthUserData = () => {
    return (dispatch) => {
        authAPI.logOut().then(data => {
            if (data.resultCode === 1) {
                dispatch(setAuthLogOut(null, null, null, false));
            }
        })
    }
}

export const logIn = (email, password, rememberMe) => {
    return (dispatch) => {
        authAPI.logIn(email, password, rememberMe).then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        })
    }
}


export default authReducer;