import React from 'react';
import s from './ProfileInfo.module.css';
import moon from '../../../assets/moon.png'
import ava from '../../../assets/ava.png'
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
    return (
        <div className={s.profile}>
            <div className={s.profile__block}>
                <img src={moon} alt="" className={s.profile_block__img} />
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.small || ava} alt="" className={s.profile_block__ava} />
                <span>
                    {
                        props.profile.fullName ? props.profile.fullName : "Unknown Unknown"

                    }
                </span>
                <span>
                   <ProfileStatus/>
                </span>
            </div>
        </div>
    );
}


export default ProfileInfo;