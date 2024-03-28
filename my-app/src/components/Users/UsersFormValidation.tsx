import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {FilterType} from "../../redux/users-reducer.ts";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors.ts";
import {Button, Tooltip} from "antd";
import {SearchOutlined} from "@ant-design/icons";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FriendType = "false" | "true" | "null"

type FormType = {
    term: string
    friend: FriendType
}

export const UsersFormValidation: React.FC<PropsType> = React.memo((props) => {
    const filterSelector = useSelector(getUsersFilter)
    const {register, handleSubmit, reset} = useForm<FormType>({
        defaultValues: {
            term: filterSelector.term,
            friend: String(filterSelector.friend) as FriendType
        }
    })


    const onSubmit: SubmitHandler<FormType> = (values) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterChanged(filter)
        reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', alignItems: 'center' ,gap: '10px'}}>
                <div>
                    <label>First Name</label>
                    <input {...register("term")} />
                </div>
                <div>
                    <label>Select a friend</label>
                    <select {...register("friend")}>
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </select>
                </div>
                <Tooltip title="search">
                    <Button htmlType="submit" type="primary" shape="circle" icon={<SearchOutlined/>}/>
                </Tooltip>
            </form>
        </>
    )
})
