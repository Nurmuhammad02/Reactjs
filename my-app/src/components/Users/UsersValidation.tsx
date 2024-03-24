import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {FilterType} from "../../redux/users-reducer.ts";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export let UsersValidation: React.FC<PropsType> = (props) => {
    const {register, handleSubmit, reset} = useForm<FilterType>()
    const onSubmit: SubmitHandler<FilterType> = (data: FilterType) => {
        props.onFilterChanged(data)
        reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>First Name</label>
                <input {...register("term")} />
                <label>Gender Selection</label>
                <input type="submit"/>
            </form>
        </>
    )
}