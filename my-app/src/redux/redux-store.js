import {applyMiddleware, combineReducers, createStore, compose} from 'redux';

import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer.ts";
import {thunk} from "redux-thunk";
import appReducer from "./app-reducer.ts";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//reducers for get redux-store
const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
});

//create redux-store with redux-thunk
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

//window store
window.store = store;

export default store;
