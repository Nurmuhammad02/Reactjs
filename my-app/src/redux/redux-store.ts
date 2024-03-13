import {applyMiddleware, combineReducers, createStore, compose} from 'redux';

import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer.ts";
import {thunk} from "redux-thunk";
import appReducer from "./app-reducer.ts";


//rootReducer for get redux-store
const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
});


type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>;
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
//window store
//@ts-ignore
window.store = store;

export default store;
