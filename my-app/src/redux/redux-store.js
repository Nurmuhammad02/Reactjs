import { applyMiddleware, combineReducers, createStore } from 'redux';
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import { thunk } from "redux-thunk";


//reducers for get redux-store
const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer
});

//create redux-store with redux-thunk
let store = createStore(reducers, applyMiddleware(thunk))

//window store
window.store = store;

export default store;
