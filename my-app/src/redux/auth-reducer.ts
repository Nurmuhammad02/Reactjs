import {authAPI, securityAPI} from "../components/api/api" ;
import * as stream from "stream";


//action type
const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const DELETE_LOGIN_DATA = 'DELETE_LOGIN_DATA';
const ERROR_MESSAGE = 'ERROR_MESSAGE';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';
//initial data
// type InitialStateType = {
//     id: number,
//     email: null | string,
//     password: null | string,
//     login: null | string,
//     isAuth: boolean,
//     errorMessage: string[],
//     captchaURL: null | string, // required captcha URL
// }

let initialState = {
    id: 2,
    email: null as null | string,
    password: null as null | string,
    login: null as null | string,
    isAuth: false,
    errorMessage: [] as Array<string>,
    captchaURL: null as null | string, // required captcha URL
};

export type InitialStateType = typeof initialState;


//actions
const authReducer = (state = initialState, action: any): InitialStateType => {
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
        case ERROR_MESSAGE:
            let error: string = action.errorMessage;
            let updatedErrorMessage: Array<string> = state.errorMessage.slice();
            updatedErrorMessage.push(error);
            return {...state, errorMessage: updatedErrorMessage};
        case GET_CAPTCHA_URL_SUCCESS:
            // старый вариант return { ...state, captchaURL: action.captchaURL}
            return { ...state, ...action.payload}
        default:
            return state;
    }
}
//action creator

type SetAuthUserDataType = {
    userId: number, email: string, login: string, isAuth: boolean
}

type SetAuthUserDataActionCreatorType = {
    type: typeof SET_USER_DATA,
    data: SetAuthUserDataType
}
export const setAuthUserData = (userId: number, email: string, login: string, isAuth: boolean): SetAuthUserDataActionCreatorType => ({
    type: SET_USER_DATA,
    data: {userId, email, login, isAuth}
})
type SetAuthLogoutDataType = {
    userId: number | null, email: string | null, login: string | null, isAuth: boolean
}
type SetAuthLogOutType = {
    type: typeof DELETE_LOGIN_DATA,
    data: SetAuthLogoutDataType
}
export const setAuthLogOut = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthLogOutType => ({
    type: DELETE_LOGIN_DATA,
    data: {userId, email, login, isAuth}
})
type SetErrorMessageType = {
    type: typeof ERROR_MESSAGE,
    errorMessage: string[]
}
export const setErrorMessage = (errorMessage: string[]): SetErrorMessageType => ({type: ERROR_MESSAGE, errorMessage})

type GetCaptchaURLSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {
        captchaURL: string
    }
}
export const getCaptchaURLSuccess = (captchaURL: string): GetCaptchaURLSuccessType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaURL}
})


//thunk-reducer

export const getAuthUserData = () => async (dispatch: any) => {
    let res = await authAPI.me();
    if (res.data.resultCode === 0) {
        let {id, login, email} = res.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const deleteAuthUserData = () => async (dispatch: any) => {
    let res = await authAPI.logOut();
    if (res.data.resultCode === 1) {
        dispatch(setAuthLogOut(null, null, null, false));
    }
}
export const getCaptchaURL = () => async (dispatch: any) => {
    let res = await securityAPI.getCaptchaURL()
    const captchaURL = res.data.url;
    dispatch(getCaptchaURLSuccess(captchaURL))
}
export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let res = await authAPI.logIn(email, password, rememberMe, captcha)
    if (res.data.resultCode === 0) {
        // success , get auth data
        dispatch(getAuthUserData())
    } else {
        if (res.data.resultCode === 10) {
            dispatch(getCaptchaURL())
        }
        let message = res.data.messages.length > 0 ? res.data.messages[0] : "Some error";
        dispatch(setErrorMessage(message))
    }
}


export default authReducer;