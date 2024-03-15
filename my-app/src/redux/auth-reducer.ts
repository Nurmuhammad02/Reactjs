import { securityApi} from "../components/api/security-api.ts";
import {AppStateType} from "./redux-store.ts";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {authApi} from "../components/api/auth-api.ts";
import {ResultCodesEnum, ResultCodeForCaptcha} from "../components/api/api.ts";

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

type InitialStateType = typeof initialState;


//actions
const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
            let error: any = action.errorMessage;
            let updatedErrorMessage: Array<string> = state.errorMessage.slice();
            updatedErrorMessage.push(error);
            return {...state, errorMessage: updatedErrorMessage};
        case GET_CAPTCHA_URL_SUCCESS:
            // старый вариант return { ...state, captchaURL: action.captchaURL}
            return {...state, ...action.payload}
        default:
            return state;
    }
}
//action creator

type ActionsType = SetAuthUserDataActionCreatorType | SetAuthLogOutType | SetErrorMessageType | GetCaptchaURLSuccessType

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
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsType>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authApi.me();
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const deleteAuthUserData = (): ThunkType => async (dispatch) => {
    let res = await authApi.logOut();
    if (res.data.resultCode === ResultCodesEnum.Error) {
        dispatch(setAuthLogOut(null, null, null, false));
    }
}
export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    let res = await securityApi.getCaptchaURL()
    const captchaURL = res.data.url;
    dispatch(getCaptchaURLSuccess(captchaURL))
}
export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await authApi.logIn(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        // success , get auth data
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaURL())
        }
        let message: any = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
        dispatch(setErrorMessage(message))
    }
}


export default authReducer;