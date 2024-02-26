import React, { useEffect } from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { useNavigate } from "react-router-dom";


const Dialogs = (props) => {
    //с помощью хука useNavigate можно использовать в функциональном компоненте для навигации
    let navigate = useNavigate();

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.name} key={d.id} />)
    let messagesElements = state.messages.map(m => <Message message={m.message} messages={m.id} key={m.id} />)
    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMessage();
    }

    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
    }

    //с помщью хука useEffect можно использовать в функциональном компоненте useNavigate
    useEffect(() => {
        if (!props.isAuth) {
            return navigate("/login");
        }
    });
    // if (!this.props.isAuth) {
    //     return <Navigate to="/profile" />;
    // }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea
                        value={newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder='Enter your message' />
                    </div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;