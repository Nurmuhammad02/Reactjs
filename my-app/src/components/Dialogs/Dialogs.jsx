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

    let messages = [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your friend?' },
        { id: 3, message: 'Hi' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' },
    ];

    let dialogElements = dialogsData.map(d => <DialogsItem name={d.name} id={d.name} />)
    let messagesElements = messages.map(m => <Message message={m.message} messages={m.id} />)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogElements }
            </div>
            <div className={s.messages}>
                { messagesElements }
            </div>
        </div>
    );
}

export default Dialogs;