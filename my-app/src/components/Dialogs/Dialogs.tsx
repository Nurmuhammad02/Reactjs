import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {useForm} from "react-hook-form"
import {InitialStateType} from "../../redux/dialogs-reducer.ts";


type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (newMessage: string) => void
    // isAuth: boolean
}

const Dialogs: React.FC<PropsType> = (props) => {
    const {
        register,
        handleSubmit,
        // watch,
        // formState: {errors, isValid},
        reset
    } = useForm({
        mode: "onBlur"
    });


    //с помощью хука useNavigate можно использовать в функциональном компоненте для навигации
    // let navigate = useNavigate();

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>)
    let messagesElements = state.messages.map(m => <Message message={m.message} id={m.id}  key={m.id}/>)

    // let onNewMessageChange = (e) => {
    //     let body = e.target.value;
    //     props.updateNewMessageBody(body);
    // }
    const addNewMessage = (values: any) => {
        props.sendMessage(values.textarea)
        reset();
    }
    //с помщью хука useEffect можно использовать в функциональном компоненте useNavigate
    // useEffect(() => {
    //     if (!props.isAuth) {
    //         return navigate("/login");
    //     }
    // });
    // if (!this.props.isAuth) {
    //     return <Navigate to="/profile" />;
    // }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <form className={s.form} onSubmit={handleSubmit(addNewMessage)}>
                    <div>
                        <textarea
                            {...register("textarea", {required: false})}
                            placeholder='Enter your message'/>
                    </div>
                    <div>
                        <input className={s.button} type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Dialogs;