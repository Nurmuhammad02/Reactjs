import {authAPI} from "../components/api/api";

//action type
const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const DELETE_LOGIN_DATA = 'DELETE_LOGIN_DATA';
const ERROR_MESSAGE = 'ERROR_MESSAGE';
//initial data
let initialState = {
    id: 2,
    email: null,
    password: null,
    login: null,
    isAuth: false,
    errorMessage: [],
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
        case ERROR_MESSAGE:
            let error = action.errorMessage;
            let updatedErrorMessage = state.errorMessage.slice();
            updatedErrorMessage.push(error);
            return {...state, errorMessage: updatedErrorMessage};

        default:
            return state;
    }
}
//action creator
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: {userId, email, login, isAuth}
})
export const setAuthLogOut = (userId, email, login, isAuth) => ({
    type: DELETE_LOGIN_DATA,
    data: {userId, email, login, isAuth}
})
export const setErrorMessage = (errorMessage) => ({type: ERROR_MESSAGE, errorMessage})

//thunk-reducer
export const getAuthUserData = () => async (dispatch) => {
    let res = await authAPI.me();
    if (res.data.resultCode === 0) {
        let {id, login, email} = res.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const deleteAuthUserData = () => async (dispatch) => {
    let res = await authAPI.logOut();
        if (res.data.resultCode === 1) {
            dispatch(setAuthLogOut(null, null, null, false));
        }
}

export const logIn = (email, password, rememberMe) => async (dispatch) => {
    let res = await authAPI.logIn(email, password, rememberMe)
        if (res.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            let message = res.data.messages.length > 0 ? res.data.messages[0] : "Some error";
            dispatch(setErrorMessage(message))
        }
}


export default authReducer;