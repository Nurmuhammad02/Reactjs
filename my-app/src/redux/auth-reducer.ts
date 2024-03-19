import {securityApi} from "../components/api/security-api.ts";
import {AppStateType, BaseThunkType, InferActionTypes} from "./redux-store.ts";
import {Action, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {authApi} from "../components/api/auth-api.ts";
import {ResultCodesEnum, ResultCodeForCaptcha} from "../components/api/api.ts";

//action type
//initial data


let initialState = {
    id: 2,
    email: null as null | string,
    password: null as null | string,
    login: null as null | string,
    isAuth: false,
    errorMessage: [] as Array<string>,
    captchaURL: null as null | string, // required captcha URL
};


//actions
const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        case 'SN/AUTH/DELETE_LOGIN_DATA':
            return {
                ...state,
                ...action.data,
                isAuth: false
            }
        case 'SN/AUTH/ERROR_MESSAGE':
            let error: any = action.errorMessage;
            let updatedErrorMessage: Array<string> = state.errorMessage.slice();
            updatedErrorMessage.push(error);
            return {...state, errorMessage: updatedErrorMessage};
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS':
            // старый вариант return { ...state, captchaURL: action.captchaURL}
            return {...state, ...action.payload}
        default:
            return state;
    }
}
//action creator
export const actions = {
    setAuthUserData: (userId: number, email: string, login: string, isAuth: boolean) => ({
        type: 'SN/AUTH/SET_USER_DATA',
        data: {userId, email, login, isAuth}
    } as const),
    setAuthLogOut: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/AUTH/DELETE_LOGIN_DATA',
        data: {userId, email, login, isAuth}
    } as const),
    setErrorMessage: (errorMessage: string[]) => ({type: 'SN/AUTH/ERROR_MESSAGE', errorMessage} as const),
    getCaptchaURLSuccess: (captchaURL: string) => ({
        type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaURL}
    } as const)
}


//thunk-reducer


export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authApi.me();
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}
export const deleteAuthUserData = (): ThunkType => async (dispatch) => {
    let res = await authApi.logOut();
    if (res.data.resultCode === ResultCodesEnum.Error) {
        dispatch(actions.setAuthLogOut(null, null, null, false));
    }
}
export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    let data = await securityApi.getCaptchaURL()
    const captchaURL = data.url;
    dispatch(actions.getCaptchaURLSuccess(captchaURL))
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
        dispatch(actions.setErrorMessage(message))
    }
}


export default authReducer;

type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsType>;