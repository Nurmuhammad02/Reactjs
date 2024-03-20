import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';

type PropsType = {
    status: string
    updateStatus: (statis: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status)
    let activeEditMode = () => {
        setEditMode(true);
    };
    let deactiveEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };
    let onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);


    return (
        <>
            {!editMode &&
                <div className={s.profile}>
                    <span onDoubleClick={activeEditMode}>{props.status || "Status"}</span>
                </div>
            }
            {editMode &&
                <div className={s.profile}>
                    <input onChange={onStatusChange} onBlur={deactiveEditMode} autoFocus={true}
                           value={status}
                           type="text"/>
                </div>
            }

        </>
    );

}


export default ProfileStatusWithHooks;