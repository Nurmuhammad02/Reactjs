import React from "react";
import s from './Users.module.css';
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import { UsersFormValidation} from "./UsersFormValidation.tsx";
import {UserType} from "../../Types/types.ts";
import {FilterType} from "../../redux/users-reducer.ts";
import {useSelector} from "react-redux";
import {getCurrentPage, getPageSize, getTotalUsersCount} from "../../redux/users-selectors.ts";

export type PropsType = {
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    users: Array<UserType>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: Array<number>
    portionSize: number
}

let Users: React.FC<PropsType> = ({
                                      onPageChanged,
                                      users,
                                      unfollow,
                                      follow,
                                      followingInProgress,
                                      portionSize,
                                      ...props
                                  }) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)

    return (<div className={s.users}>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount}
                       pageSize={pageSize} portionSize={portionSize}/>
            <UsersFormValidation onFilterChanged={props.onFilterChanged} />
            {
                users.map(u => <User key={u.id} follow={follow} unfollow={unfollow}
                                     followingInProgress={followingInProgress}
                                     user={u}/>)
            }
        </div>
    )
}

export default Users;