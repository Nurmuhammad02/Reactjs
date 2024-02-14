let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi', likesCount: 12 },
                { id: 2, message: 'How is your friend?', likesCount: 11 },
            ],
            newPostText: 'Lorem ipsum ',
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Dimych', },
                { id: 2, name: 'Andrey', },
                { id: 3, name: 'Sveta', },
                { id: 4, name: 'Sasha', },
                { id: 5, name: 'Valera', },
            ],
            messages: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'How is your friend?' },
                { id: 3, message: 'Hi' },
                { id: 4, message: 'Yo' },
                { id: 5, message: 'Yo' },
            ],
        },
        sidebarPage: {

        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('changed');
    },
    addPost() {
        let newPost = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likesCount: 0,
        }
        this._state.profilePage.newPostText = '';
        this._state.profilePage.posts.push(newPost);
        this._callSubscriber(this._state);
    },
    updateNewPostText(newText) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    }

}

// let ignore = {
//     let rerenderEntireTree = () => {
//         console.log('changed');
//     }
//     let state = {
//         profilePage: {
//             posts: [
//                 { id: 1, message: 'Hi', likesCount: 12 },
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
//         },
//         sidebarPage: {

//         }
//     }
//     export const addPost = () => {
//         let newPost = {
//             id: 5,
//             message: state.profilePage.newPostText,
//             likesCount: 0,
//         }
//         state.profilePage.newPostText = '';
//         state.profilePage.posts.push(newPost);
//         rerenderEntireTree(state);
//     }
//     export const updateNewPostText = (newText) => {
//         state.profilePage.newPostText = newText;
//         rerenderEntireTree(state);
//     }
//     export const subscribe = (observer) => {
//         rerenderEntireTree = observer;
//     }
// }


export default store;
window._store = store;