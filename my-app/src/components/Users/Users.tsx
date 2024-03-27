import React, {useEffect} from "react";
import s from './Users.module.css';
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import {UsersFormValidation} from "./UsersFormValidation.tsx";
import {FilterType, followThunk, requestUsers, unfollowThunk} from "../../redux/users-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage, getFollowingInProgress,
    getPageSize, getPortionSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors.ts";
import {useNavigate} from "react-router-dom";

export type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)
    const portionSize = useSelector(getPortionSize)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        navigate({pathname: '/users', search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`})
    }, [filter, currentPage]);


    useEffect(() => {



        // @ts-ignore
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        // @ts-ignore
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        // @ts-ignore
        dispatch(requestUsers(1, pageSize, filter))
    }

    const follow = (userId: number) => {
        // @ts-ignore
        dispatch(followThunk(userId))
    }
    const unfollow = (userId: number) => {
        // @ts-ignore
        dispatch(unfollowThunk(userId))
    }

    return (<div className={s.users}>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount}
                       pageSize={pageSize} portionSize={portionSize}/>
            <UsersFormValidation onFilterChanged={onFilterChanged}/>
            {
                users.map(u => <User key={u.id} follow={follow} unfollow={unfollow}
                                     followingInProgress={followingInProgress}
                                     user={u}/>)
            }
        </div>
    )
}