import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../Common/Preloader/Preloader';

const ProfileStatusWithHooks = (props) => {

    return (
        <>
            {
                <div className={s.profile}>
                    {props.status || "Status"}
                </div>
            }
            {
                <div className={s.profile}>
                    <input autoFocus={true}
                           type="text"/>
                </div>
            }

        </>
    );

}


export default ProfileStatusWithHooks;