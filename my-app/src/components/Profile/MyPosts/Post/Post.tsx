import React from 'react';
import s from './Post.module.css';

type PropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return (<div >
        <div className={s.item}>
            <img className={s.image} src="https://th.wallhaven.cc/lg/l8/l8v3ey.jpg" alt="" />
            <div className={s.post__items}>
                {props.message}
                <span>like:</span> {props.likesCount}
                {/* <button>like</button> */}
            </div>


        </div>
    </div>
    )
}


export default Post;