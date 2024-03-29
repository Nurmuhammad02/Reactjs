import './App.css';
import React from 'react';
import {Route, Routes, Navigate, BrowserRouter, Link} from 'react-router-dom';

import {Login} from './components/Login/Login';
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer.ts";
import store, {AppStateType} from './redux/redux-store';
import {withSuspense} from "./hoc/withSuspense.tsx";
import {UsersPage} from "./components/Users/UsersContainer.tsx";
import {Breadcrumb, Layout, Menu} from 'antd';
import {Content, Footer} from 'antd/es/layout/layout';
import Sider from "antd/es/layout/Sider";
import SubMenu from "antd/es/menu/SubMenu";
import {TeamOutlined, UserOutlined} from "@ant-design/icons";
import HeaderApp from "./components/Header/Header.tsx";
import Preloader from "./components/Common/Preloader/Preloader.tsx";


const DialogsContainer = withSuspense(React.lazy(() => import("./components/Dialogs/DialogsContainer")));
const ProfileContainer = withSuspense(React.lazy(() => import("./components/Profile/ProfileContainer")));
const ChatPage = withSuspense(React.lazy(() => import("./pages/Chat/ChatPage")));

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    initializeApp: () => void
}


class App extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

    // catch all errors in project
    catchAllUnhandledError = (e: PromiseRejectionEvent) => {
        alert("Some Error")
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledError)
    }

    // delete  event
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledError)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        } else {
            return (

                <div>
                    <Layout>
                        <HeaderApp/>
                        <Content
                            style={{
                                padding: '0 48px',
                            }}
                        >
                            <Breadcrumb
                                style={{
                                    margin: '16px 0',
                                }}
                            >
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Layout style={{}}>
                                <Sider style={{borderRadius: '8px', overflow: 'hidden'}}>
                                    <Menu
                                        defaultSelectedKeys={['1']}
                                        defaultOpenKeys={['sub1']}
                                        mode="inline"
                                        theme="dark"
                                    >
                                        <SubMenu title={<span><UserOutlined/><span>Profile</span></span>}>
                                            <Menu.Item key={1}>
                                                <Link to='/profile'>Profile</Link>
                                            </Menu.Item>
                                            <Menu.Item key={2}>
                                                <Link to='/dialogs'>Messages</Link>
                                            </Menu.Item>
                                        </SubMenu>
                                        <SubMenu title={<span><TeamOutlined/><span>Developers</span></span>}>
                                            <Menu.Item key={3}>
                                                <Link to='/developers'>Developers</Link>
                                            </Menu.Item>
                                        </SubMenu>
                                        <SubMenu title={<span><TeamOutlined/><span>Chat</span></span>}>
                                            <Menu.Item key={4}>
                                                <Link to='/chat'>Chat</Link>
                                            </Menu.Item>
                                        </SubMenu>
                                    </Menu>
                                </Sider>
                                <Content
                                    style={{
                                        margin: '0 48px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        background: 'white'
                                    }}>
                                    <Routes>
                                        <Route path='/dialogs' element={
                                            <DialogsContainer/>
                                        }/>
                                        <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                                        <Route path='/profile' element={
                                            <ProfileContainer/>
                                        }/>
                                        <Route path='/developers' element={<UsersPage/>}/>
                                        <Route path='/' element={<Navigate to="/profile" replace/>}/>
                                        <Route path='/login' element={<Login/>}/>
                                        <Route path='/chat' element={<ChatPage/>}/>
                                        <Route path='*' element={<div>404 NOT FOUND</div>}/>
                                    </Routes>
                                </Content>
                            </Layout>
                        </Content>
                        <Footer
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            Ant Design ©{new Date().getFullYear()} Created by Ant UED
                        </Footer>
                    </Layout>
                </div>
            )
        }


        // if (!this.props.initialized) {
        //     return <Preloader/>
        // } else {
        //     return (
        //         <div className='app-wrapper'>
        //             <HeaderContainer/>
        //             <Navbar/>
        //             <div className='app-wrapper-content'>
        //                 <Routes>
        //                     <Route path='/dialogs' element={
        //                         <DialogsContainer/>
        //                     }/>
        //                     <Route path='/profile/:userId' element={<ProfileContainer/>}/>
        //                     <Route path='/profile' element={
        //                         <ProfileContainer/>
        //                     }/>
        //                     <Route path='/users' element={<UsersPage/>}/>
        //                     <Route path='/' element={<Navigate to="/profile" replace/>}/>
        //                     <Route path='/login' element={<Login/>}/>
        //                     <Route path='*' element={<div>404 NOT FOUND</div>}/>
        //                 </Routes>
        //             </div>
        //         </div>
        //     );
        // }
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