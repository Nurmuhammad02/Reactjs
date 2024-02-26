import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../Common/Preloader/Preloader';

const ProfileStatus = (props) => {

    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            Profile status sada
        </div>
    );
}


export default ProfileStatus;