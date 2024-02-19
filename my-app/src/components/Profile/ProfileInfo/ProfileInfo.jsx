import React from 'react';
import s from './ProfileInfo.module.css';
import moon from '../../../assets/moon.png'
import ava from '../../../assets/ava.png'

const ProfileInfo = () => {
    return (
        <div className={s.profile}>
            <div className={s.profile__block}>
                <img src={moon} alt="" className={s.profile_block__img}/>
            </div>
            <div className={s.descriptionBlock}>
            <img src={ava} alt="" className={s.profile_block__ava}/>
            <span>Unknown Unknown</span>
            </div>
        </div>
    );
}


export default ProfileInfo;