import { React } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post'

const MyPosts = (props) => {
  

    let postsElements = props.posts.map(p => <Post id={p.id} likesCount={p.likesCount} message={p.message} />)

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
            {postsElements}
        </div>
    </div>
}


export default MyPosts;