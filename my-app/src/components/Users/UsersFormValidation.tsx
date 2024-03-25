import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FilterType } from "../../redux/users-reducer.ts";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FormType = {
    term: string
    friend: "false" | "true" | "null"
}

export const UsersFormValidation: React.FC<PropsType> = React.memo((props) => {
    const { register, handleSubmit, reset } = useForm<FormType>() // Change to FormType here
    const onSubmit: SubmitHandler<FormType> = (data) => { // Change to FormType here as well
        // Convert string to boolean
        const isFriendFollowed = data.friend === "true";
        const newData: FilterType = {
            ...data,
            friend: isFriendFollowed
        };
        props.onFilterChanged(newData)
        reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>First Name</label>
                <input {...register("term")} />
                <label>Select a friend</label>
                <select {...register("friend")}>
                    <option value="null">All</option>
                    <option value="true">Only followed</option>
                    <option value="false">Only unfollowed</option>
                </select>
                <input type="submit" />
            </form>
        </>
    )
})
