import { React, useState } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post'

const MyPosts = () => {
    const [likes, setLikes] = useState(0);

    const likeIncrement = () => {
        setLikes(likes + 1)
    }

    return <div>
        <div>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <button>Add post</button>
        </div>
        <div className={s.posts}>
            <Post likeIncrement={likeIncrement} message="Hi" />
            <Post likeIncrement={likeIncrement} message="Hi, how are you?" />
            Likes: {likes}
        </div>
    </div>
}


export default MyPosts;