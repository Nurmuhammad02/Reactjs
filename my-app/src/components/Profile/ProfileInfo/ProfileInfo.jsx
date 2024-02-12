import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src="https://th.wallhaven.cc/small/85/8586my.jpg" alt="" />
            </div>
            <div className={s.descriptionBlock}>
                ava
            </div>
        </div>
    );
}


export default ProfileInfo;