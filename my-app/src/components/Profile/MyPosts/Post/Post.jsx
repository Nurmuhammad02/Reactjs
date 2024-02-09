import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return (<div >
        <div className={s.item}>
            <img src="https://th.wallhaven.cc/lg/l8/l8v3ey.jpg" alt="" />
            <div>
                {props.message}
            </div>

            <span>like</span>
        </div>
    </div>
    )
}


export default Post;