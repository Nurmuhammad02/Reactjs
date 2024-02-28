import { authAPI } from "../components/api/api";

//action type
const SET_USER_DATA = 'SET_USER_DATA';
const SEND_LOGIN_DATA = 'SEND_LOGIN_DATA';
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
        case SEND_LOGIN_DATA:
            return {
                ...state,
                email: action.email,
                password: action.password,
                isAuth: true
            }

        default:
            return state;
    }
}
//action creator
export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: { userId, email, login } })
export const setAuthLogin = (email, password) => ({ type: SEND_LOGIN_DATA, data: { email, password } })
export const setAuthLogOut = (userId, email, login) => ({ type: SEND_LOGIN_DATA, data: { userId, email, login } })

//thunk-reducer
export const getAuthUserData = () => {
    return (dispatch) => {
        authAPI.me().then(data => {
            if (data.resultCode === 0) {
                let { id, login, email } = data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        })
    }
}
export const deleteAuthUserData = () => {
    return (dispatch) => {
        authAPI.logOut().then(data => {
            if (data.resultCode === 1) {
                let { id, login, email } = data.data;
                dispatch(setAuthLogOut(id, email, login));
            }
        })
    }
}
export const postAuthData = (email, password) => {
    return (dispatch) => {
        authAPI.logIn().then(data => {
            if (data.resultCode === 1) {
                dispatch(setAuthLogin(email, password));
            }
        })
    }
}


export default authReducer;