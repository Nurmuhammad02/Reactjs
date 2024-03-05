import React from "react";
import s from './Users.module.css';
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";

let Users = ({
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
            {
                users.map(u => <User follow={follow} unfollow={unfollow} followingInProgress={followingInProgress}
                                     user={u} key={u.id}/>)
            }
        </div>
    )
}

export default Users;