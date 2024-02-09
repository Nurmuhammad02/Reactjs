import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';

const Profile = () => {
    return <div className={s.content}>
        <div>
            <img src="https://th.wallhaven.cc/small/85/8586my.jpg" alt="" />
        </div>
        <div>
            ava + description
        </div>
        <MyPosts />
    </div>
}


export default Profile;