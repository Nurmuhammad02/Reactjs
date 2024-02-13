import { rerenderEntireTree } from "../render";
let state = {
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
}

export let addPost = (postMessage) => {
    let newPost = {
        id: 5,
        message: postMessage,
        likesCount: 0,
    }
    state.profilePage.posts.push(newPost);
    rerenderEntireTree(state);
}

export let updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export default state;