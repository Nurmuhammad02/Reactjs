import {applyMiddleware, combineReducers, createStore, compose, Action} from 'redux';

import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer.ts";
import {thunk, ThunkAction} from "redux-thunk";
import appReducer from "./app-reducer.ts";
import chatReducer from "./chat-reducer.ts";


//rootReducer for get redux-store
const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chat: chatReducer
});


// type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
// export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

//window store
//@ts-ignore
window.store = store;

export default store;
