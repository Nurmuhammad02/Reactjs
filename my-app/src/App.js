import './App.css';
import React, { Suspense } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';

import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store from './redux/redux-store';

//import DialogsContainer from './components/Dialogs/DialogsContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends React.Component {

    //catch all errors in project 
    // catchAllUnhandleError = () => {
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
            return <Preloader />
        } else {
            return (
                <div className='app-wrapper'>
                    <HeaderContainer />
                    <Navbar />
                    <div className='app-wrapper-content'>
                        <Routes>
                            <Route path='/dialogs' element={
                                <Suspense fallback={<Preloader />}>
                                    <DialogsContainer />
                                </Suspense>
                            } />
                            <Route path='/profile/:userId' element={<ProfileContainer />} />
                            <Route path='/profile' element={
                                <Suspense fallback={<Preloader />}>
                                    <ProfileContainer />
                                </Suspense>
                            } />
                            <Route path='/users' element={<UsersContainer />} />
                            <Route path='/' element={<Navigate to="/profile" replace />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='*' element={<div>404 NOT FOUND</div>} />
                        </Routes>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const AppContainer = compose(connect(mapStateToProps, { initializeApp }))(App);

const MainApp = (props) => {
    return <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
}

export default MainApp;