import {authAPI} from "../components/api/api";
import {getAuthUserData} from "./auth-reducer";

//action type
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

//initial data
let initialState = {
    initialized: true
};


//actions
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state, initialized: true
            }


        default:
            return state;
    }
}
//action creator
export const initializedSuccess = (initialized) => ({
    type: INITIALIZED_SUCCESS, initialized
})

//thunk-reducer
export const initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(() => {
                dispatch(initializedSuccess())
            }
        )
    }

}


export default appReducer;