import React, { createRef } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post'
import { useForm, SubmitHandler } from "react-hook-form"

const MyPosts = (props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        reset
    } = useForm({
        mode: "onBlur"
    });
    let postsElements = props.posts.map(p => <Post id={p.id} likesCount={p.likesCount} message={p.message} key={p.id} />)

    const onAddPost = (data) => {
        props.addPost(data.newPostText);
        reset();
    }
    return <div className={s.postsBlock}>
        <h3 className={s.postsBlock__title}>My posts</h3>
        <div className={s.postsBlock__posts}>
            <div className={s.posts}>
                <span>{postsElements}</span>
            </div>
        </div>
        <form className={s.postsBlock__form} onSubmit={handleSubmit(onAddPost)}>
            <div className={s.postsBlock__formElements}>
                <textArea className={
                    errors?.newPostText?.message ? s.error : s.noError
                } {...register("newPostText", { required: "The field is required", minLength: { value: 8, message: "At least 8 symbols" }, maxLength: { value: 30, message: "No more than 30 symbols" } })} />
                <div  className={s.errorMessage}>{errors?.newPostText && <span>{errors?.newPostText?.message || "Error!"}</span>}</div>
            </div>
            <div>
                <button type="submit" >Add post</button>
            </div>
        </form>
    </div>
}

const textArea = (props) => {
    return (
        <textarea className={s.postsBlock__textArea} placeholder='Post message' />
    )
}


export default MyPosts;