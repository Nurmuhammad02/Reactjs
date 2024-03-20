import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {deleteAuthUserData} from '../../redux/auth-reducer.ts';

class HeaderContainer extends React.Component {

    render() {
        return <Header {...this.props} />

    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,

});

export default connect(mapStateToProps, {deleteAuthUserData})(HeaderContainer);