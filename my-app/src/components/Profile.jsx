import React from 'react';
import s from './Profile.module.css';

const Profile = () => {
    return <div className={s.content}>
        <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_3iNRcBqFMr2fJnxIH1WfT_hx6B47IqpEzQ&usqp=CAU" alt="" />
        </div>
        <div>
            ava + description
        </div>
        <div>
            My posts
            <div>
                New posts
            </div>
            <div className={s.posts}>
                <div className={s.item}>
                    posts 1
                </div>
                <div className={s.item}>
                    posts 2
                </div>
            </div>
        </div>
    </div>
}


export default Profile;