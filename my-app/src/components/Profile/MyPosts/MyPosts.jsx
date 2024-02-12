import { React } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post'

const MyPosts = () => {

    let posts = [
        { id: 1, message: 'Hi', likesCount: 12 },
        { id: 2, message: 'How is your friend?', likesCount: 11 },
    ];

    let postElements = posts.map(p => <Post id={p.id} likesCount={p.likesCount} message={p.message} />)

    return <div className={s.postsBlock}>
        <h3>My posts</h3>
        <div>
            <div>
                <textarea name="" id="" cols="30" rows="10" />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </div>
        <div className={s.posts}>
            {postElements}
        </div>
    </div>
}


export default MyPosts;