import React from 'react';
import s from "./Login.module.css";
import {useForm} from "react-hook-form"
import {connect} from "react-redux";
import {logIn} from '../../redux/auth-reducer.ts';
import {Navigate} from 'react-router-dom';
import {ErrorMessage} from "@hookform/error-message";
import {AppStateType} from "../../redux/redux-store.ts";

type MapStateToPropsType = {
    errorMessage: string[]
    isAuth: boolean
    captchaURL: string | null
}
type MapDispatchToPropsType = {
    logIn: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type OwnType = {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnType

const Login: React.FC<PropsType> = ({errorMessage, logIn, isAuth, captchaURL}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        mode: "onBlur"
    });

    const onLogIn = (data: any) => {
        logIn(data.email, data.password, data.rememberMe, data.captcha);
        reset()
    }
    if (isAuth) {
        return <Navigate to="/profile"/>
    }

    return (
        <div className={s.main}>
            <h1 className={s.title}>Login</h1>
            <div className={s.background}>
                <form className={s.form} onSubmit={handleSubmit(onLogIn)}>
                    <label className={s.name}>Email:</label>
                    <input className={s.nameInput} {...register("email", {
                        required: "This field is required", pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Invalid email format"
                        }, minLength: {value: 5, message: "At least 5 symbols"}
                    })} />
                    <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({message}) => (
                            <p className={s.error}>{message}</p>
                        )}
                    />
                    <div className={s.error}>

                    </div>
                    <label className={s.name}>Password:</label>
                    <input type="password" className={s.nameInput}  {...register("password", {
                        required: "This field is required",
                        minLength: {value: 8, message: "At least 8 symbols"}
                    })} />
                    <ErrorMessage errors={errors} name="password"
                                  render={({message}) => <p className={s.error}>{message}</p>}/>
                    <input className={s.checkbox} type="checkbox" {...register("checkbox", {required: false})} />
                    {errorMessage[errorMessage.length - 1]}
                    {/* <div className={s.error}>{errors?.email && <span>{errors?.email?.message || props.errorMessage[props.errorMessage.length - 1]}</span>}</div> */}
                    {captchaURL && <img src={captchaURL} alt="Captcha"/>}
                    {captchaURL && <input type='text' {...register("captcha", {
                        required: true
                    })} />
                    }

                    <div>
                        <input className={s.button} type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    errorMessage: state.auth.errorMessage,
    captchaURL: state.auth.captchaURL
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnType, AppStateType>(mapStateToProps, {logIn})(Login);