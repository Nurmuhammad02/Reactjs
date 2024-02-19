import React, { createRef } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post'

const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Post id={p.id} likesCount={p.likesCount} message={p.message} key={p.id} />)

    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return <div className={s.postsBlock}>
          <h3 className={s.postsBlock__title}>My posts</h3>
        <div className={s.postsBlock__posts}>
            <div className={s.posts}>
                <span>{postsElements}</span>
            </div>
        </div>
        <div className={s.postsBlock__form}>
            <div className={s.postsBlock__formElements}>
                <textarea className={s.postsBlock__textArea} ref={newPostElement} value={props.newPostText} onChange={onPostChange} />
            </div>
            <div>
                <button onClick={onAddPost}>Add post</button>
            </div>
        </div>
    </div>
}


export default MyPosts;