import React, {useEffect, useState} from "react";

import {Button, Col} from "antd";
import {Input} from 'antd';

const {TextArea} = Input;

const ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export const ChatPage: React.FC = () => {
    return <div style={{padding: '20px'}}>
        <Chat/>
    </div>
}
export const Chat: React.FC = () => {

    return <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <Messages/>
        <AddMessageForm/>
    </div>
}
export const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType>([])

    useEffect(() => {
        ws.addEventListener('message', (e: MessageEvent) => {

            const newMessages = JSON.parse(e.data);
            //@ts-ignore
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, []);

    return <div style={{height: '500px', overflow: 'auto'}}>
        <div>Messages</div>

        {messages.map((m, index) => {
            return <Message key={index} message={m}/>
        })}
    </div>
}
export const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
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
}
export const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState<ChatMessageType>('')
    const sendMessage = () => {

        if (!message) return

        ws.send(message)
        setMessage('')
    }

    return <div style={{gap: '20px'}}>
        <Col>
            <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} rows={4}
                      style={{width: '300px'}}/>
        </Col>
        <Col style={{marginBlock: '20px'}}>
            <Button onClick={sendMessage}>Отправить</Button>
        </Col>
    </div>
}

export default ChatPage;