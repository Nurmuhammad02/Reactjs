import React from 'react';
import s from './ProfileInfo.module.css';
import moon from '../../../assets/moon.png'
import ava from '../../../assets/ava.png'
import Preloader from '../../Common/Preloader/Preloader';
// import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {ContactsType, PhotosType, ProfileType} from "../../../Types/types.ts";

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: () => void
}
const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className={s.profile}>
            <div className={s.profile__block}>
                <img src={moon} alt="" className={s.profile_block__img}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.small || ava} alt="" className={s.profile_block__ava}/>
                <span>
                    {
                        profile.fullName ? profile.fullName : "Unknown Unknown"
                    }
                </span>
                <span>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </span>
            </div>
        </div>
    );
}


export default ProfileInfo;