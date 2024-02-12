import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

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

    let dialogElements = dialogsData.map(d => <DialogItem name={d.name} id={d.name} />)
    let messagesElements = messages.map(m => <Message message={m.message} messages={m.id} />)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    );
}

export default Dialogs;