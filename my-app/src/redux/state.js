const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

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
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    _callSubscriber() {
        console.log('changed');
    },
    dispatch(action) {
        if (action.type === ADD_POST) {

            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0,
            }
            this._state.profilePage.newPostText = '';
            this._state.profilePage.posts.push(newPost);
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST })

export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })



export default store;
window._store = store;