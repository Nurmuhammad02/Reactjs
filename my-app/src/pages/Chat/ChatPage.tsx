import React, {useEffect, useRef, useState, UIEvent} from "react";

import {Button, Col} from "antd";
import {Input} from 'antd';
import {ChatMessageType} from "../../redux/chat-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer.ts";
import {AppStateType} from "../../redux/redux-store.ts";

const {TextArea} = Input;


export const ChatPage: React.FC = () => {
    return <div style={{padding: '20px'}}>
        <Chat/>
    </div>
}
export const Chat: React.FC = () => {

    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening() as any)
        return () => {
            dispatch(stopMessagesListening() as any)
        }
    }, []);


    return <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
        {status === 'error' && <div>Some error occurred. Please refresh your page.</div>}
        <>
            <Messages/>
            <AddMessageForm/>
        </>

    </div>
}
export const Messages: React.FC = (props) => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages]);

    return <div style={{height: '500px', overflow: 'auto'}} onScroll={scrollHandler}>
        <div>Messages</div>
        {
            messages.map((m, index) => {
                return <Message key={m.id} message={m}/>
            })}
        <div ref={messagesAnchorRef}></div>
    </div>
}
export const Message: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    // const message: ChatMessageType = null;
    return <div style={{margin: '20px 0 20px 0'}}>
        <div style={{fontWeight: 'bold', display: 'flex', alignItems: 'flex-start'}}>
            <img src={message.photo} style={{maxWidth: '100px', maxHeight: '100px'}}/>
            <span>{message.userName}</span>
        </div>
        <div>
            {message.message}
        </div>
    </div>
})
export const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const status = useSelector((state: AppStateType) => state.chat.status)

    const dispatch = useDispatch()

    const sendMessageHandler = () => {

        if (!message) return
        dispatch(sendMessage(message) as any)
        setMessage('')
    }

    return <div style={{gap: '20px'}}>
        <Col>
            <TextArea onChange={(e) => setMessage(//@ts-ignore
                e.currentTarget.value)} value={message} rows={4}
                      style={{width: '300px'}}/>
        </Col>
        <Col style={{marginBlock: '20px'}}>
            <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>Отправить</Button>
        </Col>
    </div>
}

export default ChatPage;