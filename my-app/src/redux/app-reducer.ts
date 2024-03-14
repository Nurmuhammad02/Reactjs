// import {getAuthUserData} from "./auth-reducer.ts";
import  {getAuthUserData} from "./auth-reducer.ts";
import {AppStateType} from "./redux-store.ts";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

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
const appReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state, initialized: true
            }


        default:
            return state;
    }
}

type ActionsType = InitializedSuccessActionType
//action creator
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessActionType => ({
    type: INITIALIZED_SUCCESS
})

//thunk-reducer
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsType>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const initializeApp = ():ThunkType => async (dispatch) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(() => {
                dispatch(initializedSuccess())
            }
        )
}


export default appReducer;