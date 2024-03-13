// import {getAuthUserData} from "./auth-reducer.ts";
import  {getAuthUserData} from "./auth-reducer.ts";

//action type
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

//initial data
export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: true
};


//actions
const appReducer = (state = initialState, action: any):InitialStateType => {
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
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessActionType => ({
    type: INITIALIZED_SUCCESS
})

//thunk-reducer
export const initializeApp = () => (dispatch: any) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(() => {
                dispatch(initializedSuccess())
            }
        )
}


export default appReducer;