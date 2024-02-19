// import profileReducer from "./profile-reducer";
// import dialogsReducer from "./dialogs-reducer";
// import sidebarReducer from "./sidebar-reducer";


// let store = {
//     _state: {
//         profilePage: {
//             posts: [
//                 { id: 1, message: 'Hi', likesCount: 15 },
//                 { id: 2, message: 'How is your friend?', likesCount: 11 },
//             ],
//             newPostText: 'Lorem ipsum ',
//         },
//         dialogsPage: {
//             dialogs: [
//                 { id: 1, name: 'Dimych', },
//                 { id: 2, name: 'Andrey', },
//                 { id: 3, name: 'Sveta', },
//                 { id: 4, name: 'Sasha', },
//                 { id: 5, name: 'Valera', },
//             ],
//             messages: [
//                 { id: 1, message: 'Hi' },
//                 { id: 2, message: 'How is your friend?' },
//                 { id: 3, message: 'Hi' },
//                 { id: 4, message: 'Yo' },
//                 { id: 5, message: 'Yo' },
//             ],
//             newMessageBody: ""
//         },
//         sidebarPage: {

//         }
//     },

//     getState() {
//         return this._state;
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer;
//     },

//     _callSubscriber() {
//         console.log('changed');
//     },
//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action);
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//         this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action);
    
//         this._callSubscriber();
//     }
    
// }

// export default store;
// window.store = store;