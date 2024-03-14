import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';



const ProfileStatusWithHooks = (props: any) => {
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