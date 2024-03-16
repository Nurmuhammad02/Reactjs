// import {getAuthUserData} from "./auth-reducer.ts";
import {getAuthUserData} from "./auth-reducer.ts";
import {AppStateType, BaseThunkType, InferActionTypes} from "./redux-store.ts";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

//action type
//initial data

let initialState = {
    initialized: true
};
export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>

//actions
const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state, initialized: true
            }
        default:
            return state;
    }
}

// type ActionsType = InitializedSuccessActionType
//action creator

export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

//thunk-reducer
type ThunkType = BaseThunkType<ActionsType>
export const initializeApp = ():ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
            dispatch(actions.initializedSuccess())
        }
    )
}


export default appReducer;