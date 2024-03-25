import React from 'react';
import {
    follow,
    unfollow,
    requestUsers, FilterType
} from '../../redux/users-reducer';
import {connect} from 'react-redux';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect.jsx';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getPortionSize, getUsersFilter
} from "../../redux/users-selectors";
import {UserType} from "../../Types/types.ts";
import {AppStateType} from "../../redux/redux-store.ts";

type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    portionSize: number
    filter: FilterType
}
type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type OwnPropsType = {}

type PropsType = MapStateToPropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        let {currentPage, pageSize, filter} = this.props;
        this.props.getUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        let {pageSize,filter} = this.props;
        this.props.getUsers(pageNumber, pageSize, filter);
    }

    onFilterChanged = (filter: FilterType) => {
        let {pageSize} = this.props;
        this.props.getUsers(1, pageSize, filter)
    }

    render() {
        return <>
            {this.props.isFetching ?
                <Preloader/>
                : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
                portionSize={this.props.portionSize}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state),
        filter: getUsersFilter(state)
    }
}


export default withAuthRedirect(connect<MapStateToPropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    { follow,  unfollow, getUsers: requestUsers })(UsersContainer));