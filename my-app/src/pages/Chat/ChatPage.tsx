import React, {useEffect, useState} from "react";

import {Button, Col} from "antd";
import {Input} from 'antd';

const {TextArea} = Input;

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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket;
        const closeHandler = () => {
            console.log('CLOSE WS')
            setTimeout(createChannel, 3000)
        };

        function createChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
            console.log(ws)
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }

        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, []);


    return <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <Messages wsChannel={wsChannel}/>
        <AddMessageForm wsChannel={wsChannel}/>
    </div>
}
export const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data);
            //@ts-ignore
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        };
        wsChannel?.addEventListener('message', messageHandler)
        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel]);

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
export const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState<ChatMessageType>('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        };
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel]);

    const sendMessage = () => {

        if (!message) return

        wsChannel?.send(message)
        setMessage('')
    }

    return <div style={{gap: '20px'}}>
        <Col>
            <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} rows={4}
                      style={{width: '300px'}}/>
        </Col>
        <Col style={{marginBlock: '20px'}}>
            <Button disabled={wsChannel == null || readyStatus !== 'ready'} onClick={sendMessage}>Отправить</Button>
        </Col>
    </div>
}

export default ChatPage;