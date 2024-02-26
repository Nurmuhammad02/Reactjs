import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUsersProfileFromURL } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

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
    profile: state.profilePage.profile
});

export default compose(
    connect(mapStateToProps, { getUsersProfileFromURL }),
    withAuthRedirect)
    (ProfileContainer);