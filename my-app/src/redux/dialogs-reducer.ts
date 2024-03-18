//action type
import {DialogsType, MessagesType} from "../Types/types.ts";
import {InferActionTypes} from "./redux-store.ts";

//initial data
let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Valera'},
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your friend?'},
        {id: 3, message: 'Hi'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
    ] as Array<MessagesType>,
};

//actions
const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND_MESSAGE':
            let body = action.newMessageBody;
            return {...state, messages: [...state.messages, {id: 6, message: body}],}
        default:
            return state;
    }
}

export const actions = {
        sendMessage: (newMessageBody: string) => ({type: 'SN/DIALOGS/SEND_MESSAGE', newMessageBody} as const)
}

export default dialogsReducer;

export type InitialStateType = typeof initialState
export type ActionsType = InferActionTypes<typeof actions>