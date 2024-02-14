import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import state from './redux/state';
import { BrowserRouter } from 'react-router-dom';
import { addPost, updateNewPostText, subscribe } from './redux/state';


const root = ReactDOM.createRoot(document.getElementById('root'));
let rerenderEntireTree = (state) => {

    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPost={addPost} updateNewPostText={updateNewPostText} />
            </BrowserRouter>
        </React.StrictMode>
    );
}

rerenderEntireTree(state);

subscribe(rerenderEntireTree)

