import React from 'react';
import Header, {DispatchToPropsType, MapStateToPropsType, PropsType} from './Header';
import {connect} from 'react-redux';
import {deleteAuthUserData} from '../../redux/auth-reducer.ts';
import {AppStateType} from "../../redux/redux-store.ts";

class HeaderContainer extends React.Component<MapStateToPropsType & DispatchToPropsType> {

    render() {
        return <Header {...this.props} />

    }
}

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect<MapStateToPropsType, DispatchToPropsType, {}, AppStateType>(mapStateToProps, {deleteAuthUserData})(HeaderContainer);