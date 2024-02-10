import { React, useState } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post'

const MyPosts = () => {
    return <div>
        <div>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <button>Add post</button>
        </div>
        <div className={s.posts}>
            <Post likesCount="0" message="Hi" />
            <Post likesCount="23" message="Hi, how are you?" />
            
        </div>
    </div>
}


export default MyPosts;