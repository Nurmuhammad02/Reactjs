import React from 'react';
import s from './../Dialogs.module.css';

type PropsType = {
    message: string
    id: number
}

const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={s.messages__block}>
            <div className={s.messages__items}>{props.message}</div>
        </div>
    );
}

export default Message;