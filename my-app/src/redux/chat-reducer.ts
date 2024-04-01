import {BaseThunkType, InferActionTypes} from "./redux-store.ts";
import {chatApi, ChatMessageApiType, StatusType} from "../components/api/chat-api.ts";
import {Dispatch} from "redux";
import {v1} from 'uuid';

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};
export type ChatMessageType = ChatMessageApiType & { id: string }

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case 'SN/AUTH/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'SN/AUTH/MESSAGES_RECEIVED',
        payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'SN/AUTH/STATUS_CHANGED',
        payload: {status}
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

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.start();
    //@ts-ignore
    chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    //@ts-ignore
    chatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatApi.stop();
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatApi.sendMessage(message)
}

export default chatReducer;

type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
