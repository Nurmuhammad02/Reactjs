import React from 'react';
import s from './Header.module.css';
import {Link, NavLink} from 'react-router-dom';
import Avatar from "antd/es/avatar/avatar";

import {Button, Col, Layout, Menu, Row} from "antd";
import {Header} from "antd/es/layout/layout";
import {useDispatch, useSelector} from "react-redux";
import {getAuthUserData, logout} from "../../redux/auth-reducer.ts";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors.ts";


export type PropsType = {}

const HeaderApp: React.FC<PropsType> = (props) => {
    // let logOut = () => {
    //     props.deleteAuthUserData();
    // }

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)
    const {Header} = Layout

    const dispatch = useDispatch()

    const logOutCallback = () => {

        // @ts-ignore
        dispatch(logout())
    }
    return (
        <Header className={s.header}>
            <Row className={s.header__row}>
                <Col span={20} className={s.header__col_1}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                    >
                        <Menu.Item key={1}>
                            <Link to="/developers">Developers</Link>
                        </Menu.Item>
                    </Menu>

                </Col>
                <Col span={4} style={{color: 'white'}} className={isAuth ? s.trueLogin : s.loginBlock}>
                    {
                        isAuth ?
                            <div className={s.loginTrue__withAvatar}>
                                {login}
                                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"/>
                            </div>
                            : null
                    }
                    {
                        isAuth ? <Button onClick={() => {
                            logOutCallback()

                        }}> Logout</Button> : <Link to={'/login'}> Login</Link>
                    }
                </Col>

            </Row>
        </Header>
    )
}


export default HeaderApp;

{/*<div className={s.menu}>*/
}
{/*    <div className={s.menu__links}>*/
}
{/*        <li className={s.menu__link}>*/
}
{/*            <NavLink to="#"> Menu </NavLink>*/
}
{/*        </li>*/
}
{/*        <li className={s.menu__link}>*/
}
{/*            <NavLink to="#"> Communities </NavLink>*/
}
{/*        </li>*/
}
{/*        <li className={s.menu__link}>*/
}
{/*            <NavLink to="#"> Reference </NavLink>*/
}
{/*        </li>*/
}
{/*        <li className={s.menu__link}>*/
}
{/*            <NavLink to="#"> Support </NavLink>*/
}
{/*        </li>*/
}
{/*    </div>*/
}
{/*</div>*/
}