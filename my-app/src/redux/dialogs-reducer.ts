//action type
import {DialogsType, MessagesType} from "../Types/types.ts";

const SEND_MESSAGE = 'SEND_MESSAGE';

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

 type InitialStateType = typeof initialState


//actions
const dialogsReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {...state, messages: [...state.messages, {id: 6, message: body}],}
        default:
            return state;
    }
}

type ActionsType = SendMessageCreatorType
//action creator
type SendMessageCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}
export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorType => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;