import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUsersProfileFromURL } from '../../redux/profile-reducer';

class ProfileContainer extends React.Component {
    componentDidMount() {
       this.props.getUsersProfileFromURL()
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

export default connect(mapStateToProps, { getUsersProfileFromURL })(ProfileContainer);