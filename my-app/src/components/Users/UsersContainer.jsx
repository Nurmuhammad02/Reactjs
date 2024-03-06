import React from 'react';
import {
    succesFollow,
    succesUnfollow,
    setCurrentPage,
    toggleFollowingProgress,
    follow,
    unfollow,
    requestUsers
} from '../../redux/users-reducer';
import {connect} from 'react-redux';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getPortionSize
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {

    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        let {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
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
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                followingInProgress={this.props.followingInProgress}
                portionSize={this.props.portionSize}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state),
    }
}


export default withAuthRedirect(connect(mapStateToProps,
    {
        succesFollow,
        succesUnfollow,
        setCurrentPage,
        toggleFollowingProgress,
        requestUsers,
        follow,
        unfollow,
        getPortionSize,
        getUsers: requestUsers
    })
(UsersContainer));