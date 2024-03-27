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
import {useLocation, useNavigate} from "react-router-dom";
import queryString from 'query-string';

export type PropsType = {}
type QueryParamsType = { term?: string; friend?: string; page?: string }

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
    const location = useLocation()

    useEffect(() => {
        const parsed = queryString.parse(location.search.substring(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = +(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        switch (parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
            default:
        }
        // @ts-ignore
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend == null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        navigate({pathname: '/users', search: queryString.stringify(query)})
    }, [filter, currentPage]);

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