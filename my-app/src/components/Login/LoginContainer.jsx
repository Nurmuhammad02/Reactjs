import React from 'react';
import Login from './Login';
import { connect } from 'react-redux';
import { postAuthData } from '../../redux/auth-reducer';

class LoginContainer extends React.Component {
    componentDidMount() {
    }


    render() {
        return <Login {...this.props} postAuthData={this.props.postAuthData}/>

    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    email: state.auth.email,
    password: state.auth.password,
});

export default connect(mapStateToProps, { postAuthData })(LoginContainer);