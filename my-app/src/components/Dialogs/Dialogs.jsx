import React from 'react';
import s from './Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogsItem = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink className={s.dialog} to={path}>{props.name}</NavLink>
        </div>
    );
}

const Message = (props) => {
    return (
        <div className={s.messages}>{props.message}</div>
    );
}


const Dialogs = () => {
    let dialogsData = [
        { id: 1, name: 'Dimych', },
        { id: 2, name: 'Andrey', },
        { id: 3, name: 'Sveta', },
        { id: 4, name: 'Sasha', },
        { id: 5, name: 'Valera', },
    ];
    
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsData.map(element => {
                    return (
                        <DialogsItem name={element.name} id={element.name} />
                    )
                })
                }

            </div>
            <div className={s.messages}>
                <Message message="Hi" />
                <Message message="How r u" />
                <Message message="Yo" />
            </div>
        </div>
    );
}

export default Dialogs;