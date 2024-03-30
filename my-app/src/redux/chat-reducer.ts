import {BaseThunkType, InferActionTypes} from "./redux-store.ts";
import {chatApi, ChatMessageType} from "../components/api/chat-api.ts";
import {Dispatch} from "redux";


let initialState = {
    messages: [] as ChatMessageType[],
};


const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/MESSAGES_RECEIVED':
            return {...state, messages: [...state.messages, ...action.payload.messages]}
        default:
            return state;
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'SN/AUTH/MESSAGES_RECEIVED',
        payload: {messages}
    } as const),
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
 const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}
export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.start();
    //@ts-ignore
    chatApi.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    //@ts-ignore
    chatApi.unsubscribe(newMessageHandlerCreator(dispatch) )
    chatApi.stop();
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatApi.sendMessage(message)
}

export default chatReducer;

type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
