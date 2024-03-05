import React from 'react';
import s from "./Login.module.css";
import {useForm} from "react-hook-form"
import {connect} from "react-redux";
import {logIn} from '../../redux/auth-reducer';
import {Navigate} from 'react-router-dom';
import {ErrorMessage} from "@hookform/error-message";

const Login = ({errorMessage, logIn, isAuth}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        mode: "onBlur"
    });

    const onLogIn = (data) => {
        logIn(data.email, data.password, data.rememberMe);
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
                    <ErrorMessage className={s.error} errors={errors} name="password"
                                  render={({message}) => <p className={s.error}>{message}</p>}/>
                    <input className={s.checkbox} type="checkbox" {...register("checkbox", {required: false})} />
                    {errorMessage[errorMessage.length - 1]}
                    {/* <div className={s.error}>{errors?.email && <span>{errors?.email?.message || props.errorMessage[props.errorMessage.length - 1]}</span>}</div> */}
                    <div>
                        <input className={s.button} type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    errorMessage: state.auth.errorMessage,
})

export default connect(mapStateToProps, {logIn})(Login);