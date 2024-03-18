import './App.css';
import React, {Suspense} from 'react';
import Navbar from './components/Navbar/Navbar';
import {Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';

import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer.ts";
import Preloader from "./components/Common/Preloader/Preloader";
import store, {AppStateType} from './redux/redux-store';
import {withSuspense} from "./hoc/withSuspense.jsx";

const DialogsContainer = withSuspense(React.lazy(() => import("./components/Dialogs/DialogsContainer")));
const ProfileContainer = withSuspense(React.lazy(() => import("./components/Profile/ProfileContainer")));

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

    //catch all errors in project
    // catchAllUnhandleError = (e: PromiseRejectionEvent) => {
    //     alert("Some Error")
    // }

    componentDidMount() {
        this.props.initializeApp();
        // window.addEventListener("unhandledrejection", this.catchAllUnhandleError)
    }

    // delete  event
    // componentWillUnmount() {
    //     window.removeEventListener("unhandledrejection", this.catchAllUnhandleError)
    // }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        } else {
            return (
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Routes>
                            <Route path='/dialogs' element={
                                <DialogsContainer/>
                            }/>
                            <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                            <Route path='/profile' element={
                                <ProfileContainer/>
                            }/>
                            <Route path='/users' element={<UsersContainer/>}/>
                            <Route path='/' element={<Navigate to="/profile" replace/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='*' element={<div>404 NOT FOUND</div>}/>
                        </Routes>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(connect(mapStateToProps, {initializeApp}))(App);

const MainApp: React.FC = () => {
    return <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
}

export default MainApp;