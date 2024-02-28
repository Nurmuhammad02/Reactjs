import React from 'react';
import s from "./Login.module.css";
import { useForm, SubmitHandler } from "react-hook-form"

const Login = (props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        reset
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (data) => {
        props.postAuthData(data.email, data.password);
        reset();
    }

    return (
        <div className={s.main}>
            <h1 className={s.title}>Login</h1>
            <div className={s.background}>
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <label className={s.name}>Email:</label>
                    <input className={s.nameInput} {...register("email", {
                        required: "This field is required", pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Invalid email format"
                        }, minLength: { value: 5, message: "At least 5 symbols" }
                    })} />

                    <div className={s.error}>
                        {errors?.email && <span>{errors?.email?.message || "Error!"}</span>}
                    </div>
                    <label className={s.name}>Password:</label>
                    <input type="password" className={s.nameInput} {...register("password", { required: "This field is required", minLength: { value: 8, message: "At least 8 symbols" } })} />
                    <div className={s.error}>{errors?.password && <span>{errors?.password?.message || "Error!"}</span>}</div>
                    <input className={s.checkbox} type="checkbox" {...register("checkbox", { required: false })} />
                    <div>
                        <input className={s.button} type="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Login;