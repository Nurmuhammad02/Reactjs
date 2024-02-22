import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile-reducer';


class ProfileContainer extends React.Component {
    componentDidMount() {
        const currentPath = window.location.pathname;
        let userId = parseInt(currentPath.split('/').slice(-1)[0], 10) || 2;

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId  )
            .then(res => {
                this.props.setUserProfile(res.data);
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