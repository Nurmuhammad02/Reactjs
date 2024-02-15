import { configureStore } from '@reduxjs/toolkit';
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


const store = configureStore({
  reducer: {
    profile: profileReducer,
    dialogs: dialogsReducer,
    sidebar: sidebarReducer
  }
});

export default store;
