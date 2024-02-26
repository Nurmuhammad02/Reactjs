import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUsersProfileFromURL } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersProfileFromURL()
    }

    render() {

        console.log({...this.props});
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

export default withAuthRedirect(connect(mapStateToProps, { getUsersProfileFromURL })(ProfileContainer));