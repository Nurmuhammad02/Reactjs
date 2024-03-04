import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUsersProfileFromURL, getStatus, updateStatus } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


class ProfileContainer extends React.Component {
    componentDidMount() {
        const currentPath = window.location.pathname;
        let userId = parseInt(currentPath.split('/').slice(-1)[0], 10) || 30849;
        this.props.getUsersProfileFromURL(userId);
        this.props.getStatus(userId);
    }

    render() {
        return <>
            <div>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
            </div>
        </>
    }
}


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
});

export default withAuthRedirect(connect(mapStateToProps, { getUsersProfileFromURL, getStatus, updateStatus })(ProfileContainer));