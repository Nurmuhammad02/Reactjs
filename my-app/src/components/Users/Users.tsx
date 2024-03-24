import React from "react";
import s from './Users.module.css';
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import { UsersValidation} from "./UsersValidation.tsx";
import {UserType} from "../../Types/types.ts";
import {FilterType} from "../../redux/users-reducer.ts";

export type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    pageSize: number
    totalUsersCount: number
    users: Array<UserType>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: Array<number>
    portionSize: number
}

let Users: React.FC<PropsType> = ({
                                      currentPage,
                                      onPageChanged,
                                      pageSize,
                                      totalUsersCount,
                                      users,
                                      unfollow,
                                      follow,
                                      followingInProgress,
                                      portionSize,
                                      ...props
                                  }) => {
    return (<div className={s.users}>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount}
                       pageSize={pageSize} portionSize={portionSize}/>
            <UsersValidation  onFilterChanged={props.onFilterChanged} />
            {
                users.map(u => <User key={u.id} follow={follow} unfollow={unfollow}
                                     followingInProgress={followingInProgress}
                                     user={u}/>)
            }
        </div>
    )
}

export default Users;