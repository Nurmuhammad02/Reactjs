import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile-reducer';
import getUsers from '../api/api';

class ProfileContainer extends React.Component {
    componentDidMount() {
        const currentPath = window.location.pathname;
        let userId = parseInt(currentPath.split('/').slice(-1)[0], 10) || 30849;

        
        getUsers.getUsersProfile(userId).then(data => {
                this.props.setUserProfile(data);
            })
    }

    render() {
        return <>
            <div>
                <Profile {...this.props} profile={this.props.profile} />
            </div>
        </>
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);