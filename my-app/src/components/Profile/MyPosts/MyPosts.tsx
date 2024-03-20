import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post'
import {useForm} from "react-hook-form"
import {PostsType} from "../../../Types/types.ts";
import {ErrorMessage} from "@hookform/error-message";

export type MapPropsType = {
    posts: Array<PostsType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = React.memo(props => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        mode: "onBlur"
    });
    let postsElements = props.posts.map(p => <Post likesCount={p.likesCount} message={p.message} key={p.id}/>)

    const onAddPost = (data: any) => {
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
                <textarea className={
                    errors?.newPostText?.message ? s.error : s.noError
                } {...register("newPostText", {
                    required: "The field is required",
                    minLength: {value: 8, message: "At least 8 symbols"},
                    maxLength: {value: 30, message: "No more than 30 symbols"}
                })} />
                <div className={s.errorMessage}>{errors?.newPostText &&
                    <ErrorMessage
                        errors={errors}
                        name="newPostText"
                        render={({message}) => (
                            <p className={s.error}>{message}</p>
                        )}
                    />
                }
                </div>
            </div>
            <div>
                <button type="submit">Add post</button>
            </div>
        </form>
    </div>
})


export default MyPosts;