import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getUsersProfileFromURL, getStatus, updateStatus} from '../../redux/profile-reducer';
import {withAuthRedirect} from '../../hoc/withAuthRedirect.jsx';
import {ProfileType} from "../../Types/types.ts";
import {AppStateType} from "../../redux/redux-store.ts";

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
}
type MapDispatchPropsType = {
    getUsersProfileFromURL: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}

type OwnPropsType = {}

type PropsType = MapStateToPropsType & MapDispatchPropsType & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        const currentPath = window.location.pathname;
        let userId: number = parseInt(currentPath.split('/').slice(-1)[0], 10) || 30849;
        this.props.getUsersProfileFromURL(userId);
        this.props.getStatus(userId);
    }

    render() {
        return <>
            <div>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                         updateStatus={this.props.updateStatus}/>
            </div>
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
});

export default withAuthRedirect(connect<MapStateToPropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {
        getUsersProfileFromURL,
        getStatus,
        updateStatus
    })(ProfileContainer));