type SubscriberType = (messages: ChatMessageType) => void


const subscribers = [] as SubscriberType[]


export const chatApi = {
    subscribe(callback: SubscriberType ) {
        subscribers.push(callback)
    }


}

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}