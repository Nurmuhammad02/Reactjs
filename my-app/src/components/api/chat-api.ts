type MessageReceivedSubscriberType = (messages: ChatMessageApiType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void


let subscribers = {
    'messages-received': [] as MessageReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null;
type EventsNamesType = 'messages-received' | 'status-changed'

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
};

let messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers['messages-received'].forEach(s => s(newMessages))
};

let openHandler = () => {
    notifySubscribersAboutStatus('ready')
};

let errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.log('RESTART PAGE')
};


const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type ChatMessageApiType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type StatusType = 'pending' | 'ready' | 'error';