import getUsers from "../components/api/api";

//action type
const SET_USER_DATA = 'SET_USER_DATA';

//initial data
let initialState = {
    id: 2,
    email: null,
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

        default:
            return state;
    }
}
//action creator
export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: { userId, email, login } })

//thunk-reducer
export const getLogin = () => {
    return (dispatch) => {
        getUsers.getLogin().then(data => {
            if (data.resultCode === 0) {
                let { id, login, email } = data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        })
    }
}


export default authReducer;