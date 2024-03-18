// import React from 'react';
// import {Navigate} from "react-router-dom";
// import {connect} from 'react-redux';
// import {AppStateType} from "../redux/redux-store.ts";
//
// type MapStateToPropsForRedirectType = {
//     isAuth: any
// }
//
// type DispatchToPropsType = {
// }
// let mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsForRedirectType => ({
//     isAuth: state.auth.isAuth
// });
//
// export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
//     const RedirectComponent: React.FC<WCP & MapStateToPropsForRedirectType> = (props) =>  {
//         let {isAuth,...restProps} = props
//
//         if (!isAuth) return <Navigate to="/login"/>
//
//
//         return <Component {...restProps  as WCP} />
//     }
//
//     let ConnectedAuthRedirectComponent = connect<MapStateToPropsForRedirectType, DispatchToPropsType, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent)
//
//     return ConnectedAuthRedirectComponent
// }

import React from 'react';
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to="/login" />


            return <Component {...this.props} />
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}