//action type
const SEND_MESSAGE = 'SEND_MESSAGE';

//initial data
type DialogsType = {
    id: number,
    name: string
};

type MessagesType = {
    id: number,
    message: string // Добавляем поле message
};

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

export type InitialStateType = typeof initialState;


//actions
const dialogsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {...state, messages: [...state.messages, {id: 6, message: body}],}
        default:
            return state;
    }
}

//action creator
type SendMessageCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}
export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorType => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;