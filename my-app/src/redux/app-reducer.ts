import {getAuthUserData} from "./auth-reducer.ts";
import { InferActionTypes} from "./redux-store.ts";

let initialState = {
    initialized: true
};

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

export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => async (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
            dispatch(actions.initializedSuccess())
        }
    )
}


export default appReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
